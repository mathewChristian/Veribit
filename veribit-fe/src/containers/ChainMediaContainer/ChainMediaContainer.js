import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { Button, Row, Col, Layout } from 'antd';
import { connectAuth, authActionCreators } from 'core';
import { promisify } from '../../utilities';
import logo from 'assets/img/logo.png';
const { Content } = Layout;

class ChainMediaContainer extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      privateKey: '',
      address: '',
      utxos: [],
      readyUtxos: [],
      uncomfirmedUtxos: [],
      spendUtxos: [],
      chunkSize: 90e3,
      splitValue: 90.5e3,
      splitCount: 0,
      chunks: '',
      txns: {},
      confirmed: 0,
      unconfirmed: 0,
      unsplit: 0,
      requiredTxns: 0,
      cost: 0,
      file: null,
      queue: null,
      wif: null,
      show: false,
      refundAddress: null
    }
  }

  componentDidMount() {
    this.initialize();
  }

  back = () => {
    this.props.history.goBack();
  }

  initialize = () => {
    let bsv = require('bsv')
    let privateKey;
    let wif = localStorage.getItem('privateKey');
    this.setState({ wif: wif })

    if (wif) {
      privateKey = bsv.PrivateKey.fromWIF(wif);
      this.setState({ privateKey: privateKey })
    }

    if (!privateKey) {
      privateKey = bsv.PrivateKey.fromRandom('testnet')
      this.setState({ privateKey: privateKey })
      localStorage.setItem('privateKey', privateKey.toWIF());
    }
    let address = privateKey.toAddress();
    promisify(this.props.fundWalletInitiate, { address: address })
      .then((data) => {
        // this.setState(...this.state, { data: data });
        let utxos = data;
        let readyUtxos = utxos.filter((utxo) => {
          return utxo.satoshis == this.state.splitValue && utxo.height > 0
        });
        let uncomfirmedUtxos = utxos.filter((utxo) => {
          return utxo.satoshis == this.state.splitValue && !(utxo.height > 0)
        });
        let spendUtxos = utxos.filter((utxo) => utxo.satoshis != this.state.splitValue);
        this.setState({ spendUtxos: spendUtxos })
        let balance = spendUtxos.reduce((balance, utxo) => {
          return balance + utxo.satoshis;
        }, 0);
        let splitCount = Math.min(Math.floor(balance / this.state.splitValue), 500);
        this.setState({
          confirmed: readyUtxos.length,
          unconfirmed: uncomfirmedUtxos.length,
          unsplit: spendUtxos.length,
          balance: (
            utxos.reduce((balance, utxo) => {
              return balance + utxo.satoshis;
            }, 0) / 100000000
          ).toFixed(4) + '🐉',
          splitCount: splitCount
        })
      })
      .catch(e => console.log(e));
  }

  split = () => {
    let bsv = require('bsv')
    let transaction = new bsv.Transaction().from(this.state.spendUtxos);
    for (let i = 0; i < this.state.splitCount; i++) {
      transaction.to(this.state.address, this.state.splitValue);
    }
    transaction.change(this.state.address);
    transaction.sign(this.state.privateKey);
    promisify(this.props.prepareUTXOs, { address: this.state.address })
      .then((data) => {
        if (data) {
          this.initialize();
        }
      })
      .catch(e => console.log(e));
  }

  analyzeFile = (e) => {
    this.setState({ file: e.target.files[0] })
    let chunks = Math.ceil(this.state.file.size / this.state.chunkSize);
    let requiredTxns = chunks + (chunks > 1 ? 1 : 0);
    this.setState({
      requiredTxns: requiredTxns,
      cost: (requiredTxns * this.state.splitValue) / 100000000,
      uploadButton: requiredTxns > this.state.readyUtxos.length
    })
  }

  upload = () => {
    let bsv = require('bsv')
    const file = this.state.file
    const reader = new FileReader();
    let txns = {};
    reader.onload = async (e) => {
      console.log(file);
      let buffer = reader.result;
      console.log(buffer);
      console.log(`${this.state.chunks} chunks`);
      await this.initialize();
      let i = 0;
      let bTxn;
      if (this.state.chunks > 1) {
        let chunkTxns = [];
        for (i = 0; i < this.state.chunks; i++) {
          let chunk = bsv.deps.Buffer.from(buffer.slice(i * this.state.chunkSize, (i + 1) * this.state.chunkSize));
          let txn = new bsv.Transaction()
            .from(this.state.readyUtxos[i])
            .addData(['1ChDHzdd1H4wSjgGMHyndZm6qxEDGjqpJL', chunk]);
          if (chunk.byteLength < this.state.chunkSize - 546) {
            txn.change(this.state.address);
          }
          txn.sign(this.state.privateKey);
          chunkTxns.push(txn.hash);
          txns[txn.hash] = {
            hex: txn.toString(),
            status: 0
          };
        }

        bTxn = new bsv.Transaction()
          .from(this.state.readyUtxos[i++])
          .addData([
            '15DHFxWZJT58f9nhyGnsRBqrgwK4W6h4Up',
            'Dynamic upload',
            file.type,
            bsv.deps.Buffer.from('20', 'hex'),
            file.name,
            bsv.deps.Buffer.from('20', 'hex'),
            ...chunkTxns.map((txnId) => bsv.deps.Buffer.from(txnId, 'hex')),
          ])
          .change(this.state.address)
          .sign(this.state.privateKey);
        txns[bTxn.hash] = {
          hex: bTxn.toString(),
          status: 0
        };
      } else {
        bTxn = new bsv.Transaction()
          .from(this.state.readyUtxos[i++])
          .addData([
            '19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut',
            bsv.deps.Buffer.from(buffer),
            file.type,
            bsv.deps.Buffer.from('20', 'hex'),
            file.name
          ]);
        if (buffer.byteLength < this.state.chunkSize - 546) {
          bTxn.change(this.state.address);
        }
        bTxn.sign(this.state.privateKey);
        txns[bTxn.hash] = {
          hex: bTxn.toString(),
          status: 0
        };
      }
    }
  }

  broadcast = (txnId) => {
    let txn = this.state.txns[txnId];
    if (!txn) {
      console.error(`Missing Txn: ${txnId}`);
      return;
    }
    promisify(this.props.broadCastTXN, { address: JSON.stringify({ rawtx: txn.hex }) })
      .then((data) => {
        if (data.ok) {
          txn.status = 1;
          txnId = `<a href="https://whatsonchain.com/tx/${txnId}" target="_blank">Success</a>`;
        } else {
          let error = data;
          txn.status = error.message.message;
          txnId = `Error: ${txn.status} - <a href="javascript:void()" onclick={this.broadcast('${txnId}')}>Retry</a>`;
        }
      })
      .catch(e => console.log(e));
  }

  renderQueue = () => {
    let txnList = [];
    for (let [hash, txn] of Object.entries(this.state.txns)) {
      let status;
      if (txn.status == 0) {
        status = 'Pending';
      }
      else if (txn.status == 1) {
        status = `<a href="https://whatsonchain.com/tx/${hash}">Success</a>`;
      }
      else {
        status = `Error: ${txn.status} - <a href="javascript:void()" onclick={this.broadcast('${hash}')}>Retry</a>`;
      }
      txnList.push(`<li><strong>${hash}</strong> - <span id="${hash}">${status}</span></li>`);
    }
    this.setState({ queue: txnList.join('\n') })
  }

  processQueue = () => {
    let i = 0;
    for (let [hash, txn] of Object.entries(this.state.txns)) {
      if (txn.status == 1) continue;
      console.log(`Broadcasting: ${hash}`);
      this.broadcast(hash);
    }
  }

  refund() {
    console.log("me called")
    let bsv = require('bsv')
    console.log(this.state.refundAddress)
    let refundAddress = bsv.Address.fromString(this.state.refundAddress);
    let total = this.state.utxos.reduce((acc, utxo) => {
      return acc + utxo.satoshis;
    }, 0);
    let txn = new bsv.Transaction()
      .from(this.state.utxos)
      .change(refundAddress)
      .sign(this.privateKey);
    promisify(this.props.refund, { hex: txn.toString() })
      .then((data) => {
        if (data) {
          this.setState({ refund: txn.hash })
          this.initialize();
        }
      })
      .catch(e => console.log(e));
  }

  toggle = (e) => {
    this.setState({ show: !e.target.value })
  }

  render() {
    return (
      <div className="block">
        <Layout>
          <Content className="main">
            <Row className="validation_logo_area">
              <Col span={14} offset={5}>
                <img alt="true" src={logo} className="logo" />
              </Col>
            </Row>
            <Row className="validation_title_area">
              <Col>
                <span className="validation_choose_title">Dynamic files on the blockchain</span>
              </Col>
            </Row>
            <hr />
            <Row>
              <div id="qrcode" />
              <h2>1. Fund Wallet</h2>
              <h4>Current address</h4>
              <p><span id="address" /></p>
              <p>
                Total Balance: <span id="balance" />
                <a href="#" onClick={this.initialize}>🔄</a>
              </p>
              <hr />
            </Row>
            <Row>
              <h2>2. Prepare UTXOs</h2>
              In order to bypass a limitation in the number of chained transactions allowed, split transactions and let
              them
              confirm before you upload.
              <a href="#" onClick={this.initialize}>🔄</a>
              <p>
                Ready: <span>{this.state.confirmed}</span><br />
                Unconfirmed: <span>{this.state.unconfirmed}</span><br />
                Unsplit: <span>{this.state.unsplit}</span>
                {/* <button onClick={this.split}>Split <span>{this.state.splitCount}</span> Txns</button> */}
                <Button className="continue_btn" onClick={this.split}>Split <span>{this.state.splitCount}</span> Txns</Button>
              </p>
              <hr />
            </Row>
            <Row>
              <h2>3. Upload</h2>
              <p>
                <input type="file" name="file" onChange={this.analyzeFile} /><br />
                Required Txns: <span id="requiredTxns">{this.state.cost}</span><br />
                Cost: ~<span id="cost">{this.state.cost}</span>
              </p>
              {/* <button onClick={this.upload} id="uploadButton" disabled="true">Upload</button> */}
              <Button className="continue_btn" onClick={this.upload} id="uploadButton" disabled="true">Upload</Button>
              <p>
                B Txn: <span id="btxn" />
              </p>
              <p>
                Upload Queue: <span id="status" /><br />
              </p>
              <ul>{this.state.queue}</ul>
              <p />
              <hr />
            </Row>
            <Row>
              <h4>Cash Out</h4>
              <p>
                <input type="text" value={this.state.refundAddress} onChange={(e) => this.setState({ refundAddress: e.target.value })} placeholder="Refund Address" />
              </p>
              {/* <button onClick={() => this.refund()}>Refund</button> */}
              <Button className="continue_btn" onClick={() => this.refund()}>Refund</Button>
              <br />
              <span id="refund" />
              <h4>Private Key</h4>
              {/* <button value={this.state.show} onClick={(e) => this.toggle(e)}>Show/Hide WIF</button> */}
              <Button className="continue_btn" value={this.state.show} onClick={(e) => this.toggle(e)}>Show/Hide WIF</Button>
              <p>{this.state.show ? <span>{this.state.wif}</span> : ''}</p>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user
});

const mapDisptachToProps = (dispatch) => {
  const {
    fundWalletInitiate,
    prepareUTXOs,
    broadCastTXN
  } = authActionCreators

  return bindActionCreators({
    fundWalletInitiate,
    prepareUTXOs,
    broadCastTXN
  }, dispatch);
}

export default compose(
  connectAuth(mapStateToProps, mapDisptachToProps),
)(ChainMediaContainer);
