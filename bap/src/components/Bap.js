import React, { Component } from 'react';
import { Container, Paper, Grid, Input, Typography } from '@material-ui/core';

//BAP SDK
const bitcoinfiles = require('bitcoinfiles-sdk');

//BSV SDK
const BSV = require('bsv');
const bsvMessage = require('bsv/message');
BSV.Message = bsvMessage;

//Moneybutton JS client
let MoneyButton = require('@moneybutton/react-money-button').default

class Bap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address1: '',
            address2: '',
            privatekey1: '5KLpZB2Sfn4S7QXh6rRynXrVZXXT8zTdQBaj7Ngs3ZHpip5zd8r',
            privatekey2: '',
            newPrivKey: '',
            newHdPrivKey: '',
            newHdPrivKeyDerived: '',
            bapBitCom: '1BAPSuaPnfGnSBM3GLV9yhxUdYe4vGbdMT',
            aipBitCom: '15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva',
            aipAlgorithm: 'BITCOIN_ECDSA',
            selectedOption: "ID / ATTEST / REVOKE",
            data1: '',
            data2: '',
            data3: '',
            data4: '',
            data5: '',
            data6: '',
            data7: '',
            data8: '',
            data9: '',
            data9DER: '',

            hexData1: '',
            hexData2: '',
            hexData3: '',
            hexData4: '',
            hexData5: '',
            hexData6: '',
            hexData7: '',
            hexData8: '',
            hexData9: '',
            sigVerified: 'false',
            dataHexArray: [],
            opReturnHexArray: [],
            signingProtocol: 'AIP - Author Identity Protocol',
            now: '',
            value: 'Wian',
            //urnIdentity: 'urn:bap:id:name:wian koch:\nurn:bap:id:birthday:1981-12-15:\nurn:bap:id:idnumber:8112155111080:\nurn:bap:id:idexpirydate:2022-01-01:',
            urnIdentity: 'urn:bap:id:name:wian koch:',
            urnIdentityHash: "",
            urnAttestation: 'urn:bap:attest:',
            urnAttestationHash: "",
            urnAttestationSignature: '',
            secretKey: '',
            identityKey: '03fd0fa093a51166aa767b7f45e3bd45b44d184ab2c505c1aa2001550f345cb095',

            verifyAuthorIdentity: '',
            verifyAuthorIdentityHex: '',
            verifyAuthorIdentityOutput: '',
            signArguments: '',
            signArgumentsHex: '',
            signArgumentsOutput: '',
            buildAuthorIdentity: '',
            buildAuthorIdentityHex: '',
            buildAuthorIdentityOutput: '',
            detectAndVerifyAuthorIdentities: '',
            detectAndVerifyAuthorIdentitiesHex: '',
            detectAndVerifyAuthorIdentitiesOutput: '',

            toValue: '7107',
            labelValue: 'Swipe to continue',
            amountValue: '0.03',
            currencyValue: 'ZAR',
            successMessageValue: 'Success!',
            opReturn: 'Initial OpReturn message...',
            opReturnHex: 'Initial OpReturn Hex message...',
            clientIdentifierValue: '58556f8075944af8708f58de0c2b8868',
            buttonIdValue: '93434523234',
            buttonDataValue: JSON.stringify({ website: 'www.veribit.io', category: 'Playing around...', owner: 'Wian Koch - $xoltrix' }),
            typeValue: 'tip',
            editableValue: false,
            disabledValue: false,
            outputs: [{
                script: 'OP_FALSE OP_RETURN ',
                amount: '0',
                currency: 'ZAR'
            }],

            outputsValue: '',
            showButton: true,


            tpAddress1: '',
            tpAddress2: '',
            newTpHdPrivKey: '',
            newTpHdPrivKeyDerived: '',
            tpIdentityKey: '04fd0fa093a51166aa767b7f85e3bd45b44d184ab2c505c1aa2001550f345cb765',
            example: "1BAPSuaPnfGnSBM3GLV9yhxUdYe4vGbdMT\n[ID]\n[IdentityKey]\n[Address|0]\n|\n[AIP protocol address]\n[AIP Signing Algorithm]\n[AIP Signing Address]\n[AIP Signature]",
            example1: "1BAPSuaPnfGnSBM3GLV9yhxUdYe4vGbdMT\n[ATTEST]\n[URN Attestation Hash]\n[Sequence|Address]\n|\n[AIP protocol address]\n[AIP Signing Algorithm]\n[AIP Signing Address]\n[AIP Signature]",
            example2: "1BAPSuaPnfGnSBM3GLV9yhxUdYe4vGbdMT\n[REVOKE]\n[IdentityKey]\n[Sequence]\n|\n[AIP protocol address]\n[AIP Signing Algorithm]\n[AIP Signing Address]\n[AIP Signature]"
        };

    }

    loadIdDefaultValues() {

        this.setState({
            data1: this.state.bapBitCom,
            data2: 'ID',
            data3: this.state.tpIdentityKey,
            data4: this.state.tpAddress2,
            data5: '|',
            data6: this.state.aipBitCom,
            data7: this.state.aipAlgorithm,
            data8: this.state.tpAddress1
        });

        const hex1 = '0x' + this.hexEncode(this.state.bapBitCom);
        const hex2 = '0x' + this.hexEncode('ID');
        const hex3 = '0x' + this.hexEncode(this.state.tpIdentityKey);
        const hex4 = '0x' + this.hexEncode(this.state.tpAddress2.toString());
        const hex5 = '0x' + this.hexEncode('|');
        const hex6 = '0x' + this.hexEncode(this.state.aipBitCom);
        const hex7 = '0x' + this.hexEncode(this.state.aipAlgorithm);
        const hex8 = '0x' + this.hexEncode(this.state.tpAddress1.toString());

        this.setState({
            hexData1: hex1,
            hexData2: hex2,
            hexData3: hex3,
            hexData4: hex4,
            hexData5: hex5,
            hexData6: hex6,
            hexData7: hex7,
            hexData8: hex8
        });
    }

    loadAttestDefaultValues() {
        this.setState({
            data1: this.state.bapBitCom,
            data2: 'ATTEST',
            data3: this.state.urnAttestationHash,
            data4: this.state.tpAddress2,
            data5: '|',
            data6: this.state.aipBitCom,
            data7: this.state.aipAlgorithm,
            data8: this.state.tpAddress1
        });

        //Convert data to HEX
        const hex4 = '0x' + this.hexEncode(this.state.data4);
        const hex8 = '0x' + this.hexEncode(this.state.data8);
        this.setState({ hexData4: hex4, hexData8: hex8 });
    }

    loadRevokeDefaultValues() {
        this.setState({
            data1: this.state.bapBitCom,
            data2: 'REVOKE',
            data3: this.state.tpIdentityKey,
            data4: this.state.tpAddress2,
            data5: '|',
            data6: this.state.aipBitCom,
            data7: this.state.aipAlgorithm,
            data8: this.state.tpAddress1
        });

        //Convert data to HEX
        const hex4 = '0x' + this.hexEncode(this.state.data4);
        const hex8 = '0x' + this.hexEncode(this.state.data8);
        this.setState({ hexData4: hex4, hexData8: hex8 });
    }

    hexEncode(str) {
        let arr1 = [];
        let hex = '';
        for (let n = 0, l = str.length; n < l; n++) {
            hex = Number(str.charCodeAt(n)).toString(16);
            arr1.push(hex);
        }
        return arr1.join('');
    }

    randomSecret() {
        let randSecret = Math.random().toString(36).substring(2, 32) +
            Math.random().toString(36).substring(2, 32) +
            Math.random().toString(36).substring(2, 32) +
            Math.random().toString(36).substring(2, 32) +
            Math.random().toString(36).substring(2, 32) +
            Math.random().toString(36).substring(2, 32) +
            Math.random().toString(36).substring(2, 32);

        randSecret = randSecret.substring(1, 64);

        this.setState({ secretKey: randSecret });
    }

    getDate() {
        const date = { currentTime: new Date().toLocaleString() };
        this.setState({ now: date });
    }

    getNewPrivateKey() {
        const privkey = BSV.PrivateKey.fromRandom();
        console.log('privkey:', privkey);
        console.log('privkey.toWif():', privkey.toWIF());

        const address = BSV.Address.fromPublicKey(privkey.publicKey);
        console.log('address:', address);
        console.log('address.toString():', address.toString());

        this.setState({ newPrivKey: privkey.toWIF(), privatekey1: privkey.toWIF() });

    }

    getNewHDPrivateKey() {
        const hdPrivkey = BSV.HDPrivateKey.fromString('xprv9s21ZrQH143K3FrcsTdXbMj6cP1nwvWJqw5ojQA6Mxic5KxW7rjD5mjGBtF7mBrc3LgDTxqxQfE55fXUDDvSmW1VqqxpQkD2QVhP4wip1K6');
        //const hdPrivkey = BSV.HDPrivateKey.fromRandom();
        console.log('hdPrivkey:', hdPrivkey);
        console.log('hdPrivkey.toString():', hdPrivkey.toString());
        console.log('hdPrivkey.privatekey.toString():', hdPrivkey.privateKey.toString());
        console.log('hdPrivkey.publickey.toString():', hdPrivkey.publicKey.toString());

        const address = BSV.Address.fromPublicKey(hdPrivkey.publicKey);
        console.log('address:', address);
        console.log('address.toString():', address.toString());

        this.setState({ newHdPrivKey: hdPrivkey.toString(), address1: address, data8: address.toString() })
    }

    getDerivedHdPrivateKey() {
        const parentHdPrivKey = BSV.HDPrivateKey.fromString(this.state.newHdPrivKey)
        console.log('parentHdPrivKey:', parentHdPrivKey);
        console.log('parentHdPrivKey.toString():', parentHdPrivKey.toString());

        const derivedHdPrivkey = parentHdPrivKey.deriveChild("m/1/1")
        console.log('derivedHdPrivkey:', derivedHdPrivkey);
        console.log('derivedHdPrivkey.toString():', derivedHdPrivkey.toString());
        console.log('derivedHdPrivkey.private.toString():', derivedHdPrivkey.privateKey.toString());
        console.log('derivedHdPrivkey.publicKey.toString():', derivedHdPrivkey.publicKey.toString());

        const address = BSV.Address.fromPublicKey(derivedHdPrivkey.publicKey);
        console.log('address:', address);
        console.log('address.toString():', address.toString());

        this.setState({ newHdPrivKeyDerived: derivedHdPrivkey.toString(), address2: address, data4: address.toString() })
    }

    getNewTpHDPrivateKey() {
        const TpHdPrivkey = BSV.HDPrivateKey.fromString('xprv9s21ZrQH143K2CcSfE87RsHhnF7H9X6K6BsMUv6KBr62HZWHSMX8fgMJRyuLB5Dt8JhWa1VUxjLDPBfeN71jUSsBTZPvhkeHRGPnQPqRSZa');
        //const TpHdPrivkey = BSV.HDPrivateKey.fromRandom();
        console.log('TpHdPrivkey:', TpHdPrivkey);
        console.log('TpHdPrivkey.toString():', TpHdPrivkey.toString());
        console.log('TpHdPrivkey.privateKey.toString():', TpHdPrivkey.privateKey.toString());
        console.log('TpHdPrivkey.publicKey.toString():', TpHdPrivkey.publicKey.toString());
        console.log('TpHdPrivkey.privateKey.publicKey.toString():', TpHdPrivkey.privateKey.publicKey.toString());

        const a = BSV.PublicKey.fromPrivateKey(TpHdPrivkey.privateKey).toAddress();
        console.log('address (BSV.PublicKey.fromPrivateKey(TpHdPrivkey.privateKey).toAddress()):', a);

        console.log('address (TpHdPrivkey.privateKey.publicKey.toAddress().toString()):', TpHdPrivkey.privateKey.publicKey.toAddress().toString());
        const address = BSV.Address.fromPublicKey(TpHdPrivkey.publicKey);

        console.log('address:', address);
        console.log('address.toString():', address.toString());

        this.setState({ newTpHdPrivKey: TpHdPrivkey.toString(), tpAddress1: address })
    }

    getDerivedTpHdPrivateKey() {
        const parentTpHdPrivKey = BSV.HDPrivateKey.fromString(this.state.newTpHdPrivKey)
        console.log('parentTpHdPrivKey:', parentTpHdPrivKey);
        console.log('parentTpHdPrivKeytoString():', parentTpHdPrivKey.toString());

        const derivedTpHdPrivkey = parentTpHdPrivKey.deriveChild("m/2/1")
        console.log('derivedTpHdPrivkey:', derivedTpHdPrivkey);
        console.log('derivedTpHdPrivkey.toString():', derivedTpHdPrivkey.toString());
        console.log('derivedTpHdPrivkey.privateKey.toString():', derivedTpHdPrivkey.privateKey.toString());
        console.log('derivedTpHdPrivkey.public.toString():', derivedTpHdPrivkey.publicKey.toString());

        const address = BSV.Address.fromPublicKey(derivedTpHdPrivkey.publicKey);
        console.log('address:', address);
        console.log('address.toString():', address.toString());

        this.setState({ newTpHdPrivKeyDerived: derivedTpHdPrivkey.toString(), tpAddress2: address })
    }

    generateOpReturn() {

        let data = "1JSvPd2Y6EsNv4YXabeego3tt87pEAP3mr \n | \n";
        let output = "OP_FALSE OP_RETURN ";

        if (this.state.data1.length >= 1) {
            data += this.state.data1;
            output += Buffer.from(this.state.data1).toString('hex');
        }
        if (this.state.data2.length >= 1) {
            data += ' \n' + this.state.data2;
            output += ' ' + Buffer.from(this.state.data2).toString('hex');
        }
        if (this.state.data3.length >= 1) {
            data += ' \n' + this.state.data3;
            output += ' ' + Buffer.from(this.state.data3).toString('hex');
        }
        if (this.state.data4.length >= 1) {
            data += ' \n' + this.state.data4.toString();
            output += ' ' + Buffer.from(this.state.data4).toString('hex');
        }
        if (this.state.data5.length >= 1) {
            data += ' \n' + this.state.data5;
            output += ' ' + Buffer.from(this.state.data5).toString('hex');
        }
        if (this.state.data6.length >= 1) {
            data += ' \n' + this.state.data6;
            output += ' ' + Buffer.from(this.state.data6).toString('hex');
        }
        if (this.state.data7.length >= 1) {
            data += ' \n' + this.state.data7;
            output += ' ' + Buffer.from(this.state.data7).toString('hex');
        }
        if (this.state.data8.length >= 1) {
            data += ' \n' + this.state.data8.toString();
            output += ' ' + Buffer.from(this.state.data8).toString('hex');
        }
        if (this.state.data9.length >= 1) {
            data += ' \n' + this.state.data9;
            output += ' ' + Buffer.from(this.state.data9).toString('hex');
        }


        console.log('OP_RETURN data:', data);
        console.log("outputs (Script):", output)

        const outputs = [{
            script: output,
            amount: "0",
            currency: "ZAR"
        }]

        console.log("outputs:", outputs)

        this.setState({ opReturn: data, outputs: outputs });

    }

    generateOpReturnHex = async () => {


        const dataHex = '0x' + this.hexEncode(this.state.data1) + ' \n' +
            '0x' + this.hexEncode(this.state.data2) + ' \n' +
            '0x' + this.hexEncode(this.state.data3) + ' \n' +
            '0x' + this.hexEncode(this.state.data4.toString()) + ' \n' +
            '0x' + this.hexEncode(this.state.data5) + ' \n' +
            '0x' + this.hexEncode(this.state.data6) + ' \n' +
            '0x' + this.hexEncode(this.state.data7) + ' \n' +
            '0x' + this.hexEncode(this.state.data8.toString()) + ' \n' +
            '0x' + this.hexEncode(this.state.data9)


        const dataHexArray = ['0x' + this.hexEncode(this.state.data1)];
        dataHexArray.push('0x' + this.hexEncode(this.state.data2));
        dataHexArray.push('0x' + this.hexEncode(this.state.data3));
        dataHexArray.push('0x' + this.hexEncode(this.state.data4.toString()));
        dataHexArray.push('0x' + this.hexEncode(this.state.data5));
        dataHexArray.push('0x' + this.hexEncode(this.state.data6));
        dataHexArray.push('0x' + this.hexEncode(this.state.data7));
        dataHexArray.push('0x' + this.hexEncode(this.state.data8.toString()));
        dataHexArray.push('0x' + this.hexEncode(this.state.data9));

        /* console.log('data3:', this.state.data3);
        console.log('data4:', this.state.data4.toString());
        console.log('data5:', this.state.data5);

        console.log('data7:', this.state.data7);
        console.log('data8:', this.state.data8.toString());
        console.log('data9:', this.state.data9); */

        console.log('dataHex:', dataHex);
        console.log('dataHexArray:', dataHexArray);

        this.setState({ opReturnHex: dataHex, dataHexArray: dataHexArray });
    }


    address1change = (event) => {
        this.setState({ address1: event.target.value });
    }

    address2change = (event) => {
        this.setState({ address2: event.target.value });
    }

    tpAddress1change = (event) => {
        this.setState({ tpAddress1: event.target.value });
    }

    tpAddress2change = (event) => {
        this.setState({ tpAddress2: event.target.value });
    }

    privatekey1change = (event) => {
        this.setState({ privatekey1: event.target.value });
    }

    privatekey2change = (event) => {
        this.setState({ privatekey2: event.target.value });
    }

    newHdPrivateKeyChange = (event) => {
        this.setState({ newHdPrivKey: event.target.value });
    }

    newHdPrivateKeyDerivedChange = (event) => {
        this.setState({ newHdPrivKeyDerived: event.target.value });
    }

    newTpHdPrivateKeyChange = (event) => {
        this.setState({ newTpHdPrivKey: event.target.value });
    }

    newTpHdPrivateKeyDerivedChange = (event) => {
        this.setState({ newTpHdPrivKeyDerived: event.target.value });
    }

    handleOptionChange = (changeEvent) => {
        this.setState({ selectedOption: changeEvent.target.value });
    };

    handleData1Change = (event) => {
        this.setState({ data1: event.target.value });

        //Convert data to HEX
        const hex = '0x' + this.hexEncode(event.target.value);
        this.setState({ hexData1: hex, opReturn: event.target.value });

    }

    handleData2Change = (event) => {
        this.setState({ data2: event.target.value });

        //Convert data to HEX
        const hex = '0x' + this.hexEncode(event.target.value);
        this.setState({ hexData2: hex, opReturn: event.target.value });

    }

    handleData3Change = (event) => {
        this.setState({ data3: event.target.value });

        //Convert data to HEX
        const hex = '0x' + this.hexEncode(event.target.value);
        this.setState({ hexData3: hex, opReturn: event.target.value });

    }

    handleData4Change = (event) => {
        this.setState({ data4: event.target.value });

        //Convert data to HEX
        const hex = '0x' + this.hexEncode(event.target.value);
        this.setState({ hexData4: hex, opReturn: event.target.value });

    }

    handleData5Change = (event) => {
        this.setState({ data5: event.target.value });

        //Convert data to HEX
        const hex = '0x' + this.hexEncode(event.target.value);
        this.setState({ hexData5: hex, opReturn: event.target.value });

    }

    handleData6Change = (event) => {
        this.setState({ data6: event.target.value });

        //Convert data to HEX
        const hex = '0x' + this.hexEncode(event.target.value);
        this.setState({ hexData6: hex, opReturn: event.target.value });

    }

    handleData7Change = (event) => {
        this.setState({ data7: event.target.value });

        //Convert data to HEX
        const hex = '0x' + this.hexEncode(event.target.value);
        this.setState({ hexData7: hex, opReturn: event.target.value });

    }

    handleData8Change = (event) => {
        this.setState({ data8: event.target.value });

        //Convert data to HEX
        const hex = '0x' + this.hexEncode(event.target.value);
        this.setState({ hexData8: hex, opReturn: event.target.value });

    }

    handleData9Change = (event) => {
        this.setState({ data9: event.target.value });

        //Convert data to HEX
        const hex = '0x' + this.hexEncode(event.target.value);
        this.setState({ hexData9: hex });
    }

    handleUrnIdentityChange = (event) => {
        const hash = BSV.crypto.Hash.sha256(Buffer.from(event.target.value)).toString('hex');
        //const hash = BSV.crypto.Hash.sha256(Buffer.from(event.target.value));
        this.setState({ urnIdentity: event.target.value, urnIdentityHash: hash });
    };

    handleUrnAttestationChange = (event) => {
        const hash = BSV.crypto.Hash.sha256(Buffer.from(event.target.value)).toString('hex');
        //const hash = BSV.crypto.Hash.sha256(Buffer.from(event.target.value));
        this.setState({ urnAttestation: event.target.value, urnAttestationHash: hash });
        //this.signAttestationUrn(hash);
    };

    signArgs() {
        const TpHdPrivkey = BSV.HDPrivateKey.fromString(this.state.newTpHdPrivKey);
        console.log('TpHdPrivkey:', TpHdPrivkey);

        console.log('data1 toString():', Buffer.from(this.state.data1).toString());
        console.log('data1 toString(utf8):', Buffer.from(this.state.data1).toString('utf8'));
        console.log('data1 toString(base64):', Buffer.from(this.state.data1).toString('base64'));
        console.log('data1 toString(hex):', Buffer.from(this.state.data1).toString('hex'));
        console.log('hexData1:', Buffer.from(this.state.hexData1).toString());
        console.log('data1:', Buffer.from(this.state.data1));
        console.log('hexData1:', Buffer.from(this.state.hexData1));


        const bufs = [];
        try {
            bufs.push(Buffer.from(this.state.hexData1));
            bufs.push(Buffer.from(this.state.hexData2));
            bufs.push(Buffer.from(this.state.hexData3));
            bufs.push(Buffer.from(this.state.hexData4));
            bufs.push(Buffer.from(this.state.hexData5));
        }
        catch (error) {
            console.log(error);
        }
        console.log('bufs:', bufs);


        const bufferWriter = new BSV.encoding.BufferWriter();
        for (const field of bufs) {

            let bf = field;
            if (!Buffer.isBuffer(field)) {
                bf = new BSV.encoding.BufferReader(field);
                bf = bf.buf;
            }
            //console.log('bf', bf);
            bufferWriter.write(bf);
        }

        const appData = bufferWriter.toBuffer();
        console.log('appData:', appData);

        try {
            //const sig = BSV.Message.sign(appData, TpHdPrivkey.privateKey)
            //const verified = BSV.Message.verfy(appData, address, sig)

            //const sigC = BSV.crypto.ECDSA.sign(appData, TpHdPrivkey.privateKey);
            //console.log('sigC:', sigC);
            //console.log('sigC64:', sigC.toCompact().toString('base64'));
            //console.log('sigCHEX:', sigC.toDER().toString('hex'));

            //const sigD = BSV.crypto.ECDSA.signWIthCalcI(appData, TpHdPrivkey.privateKey);
            //console.log('sigD:', sigD);
            //console.log('sigD64:', sigD.toCompact().toString('base64'));
            //console.log('sigCHEX:', sigD.toDER().toString('hex'));


            const sigCompact = BSV.Message(appData).sign(BSV.PrivateKey(TpHdPrivkey.privateKey))
            console.log('sigCompact:', sigCompact);

            //const sigDER = BSV.Message(appData).signWithCalcI(BSV.PrivateKey(TpHdPrivkey.privateKey))
            //const sigDER = sigCompact.toDER().toString('hex');
            //console.log('sigDER:', sigDER);

            const address = TpHdPrivkey.privateKey.toAddress();

            const verified = BSV.Message(appData).verify(address, sigCompact);
            console.log('verified:', verified);

            if (verified) {
                this.setState({
                    data9: sigCompact,
                    //data9DER: sigDER,
                    hexData9: '0x' + this.hexEncode(sigCompact),
                    sigVerified: 'true'
                });
            }

        } catch (error) {
            console.log(error);
        }



        /* const bufs = [Buffer.from(this.state.hexData1)];
        bufs.push(Buffer.from(this.state.hexData2));
        bufs.push(Buffer.from(this.state.hexData3));
        bufs.push(Buffer.from(this.state.hexData4));
        bufs.push(Buffer.from(this.state.hexData5));
        console.log(bufs); */

        /* const bufferWriter = new BSV.encoding.BufferWriter();

        for (const field of bufs) {

            let bf = field;
            if (!Buffer.isBuffer(field)) {
                bf = new BSV.encoding.BufferReader(field);
                bf = bf.buf;
            }
            console.log('bf', bf);
            bufferWriter.write(bf);
        }

        const appData = bufferWriter.toBuffer();


        try {
            const sig = BSV.Message(appData).sign(BSV.PrivateKey(TpHdPrivkey.privateKey))
            this.setState({ data9: sig });
        } catch (error) {
            console.log(error);
        } */
    }

    signAttestationUrn() {
        //console.log();
        const TpHdPrivkey = BSV.HDPrivateKey.fromString(this.state.newTpHdPrivKey);
        console.log('TpHdPrivkey:', TpHdPrivkey);

        const hash = BSV.crypto.Hash.sha256(Buffer.from(this.state.urnAttestation));
        console.log('Attestation Hash:', hash);

        try {
            const sig = BSV.crypto.ECDSA.sign(hash, TpHdPrivkey.privateKey)
            this.setState({ urnAttestationSignature: sig });
        } catch (error) {
            console.log(error);
        }
    }

    signArguments = async () => {
        const transaction = [this.state.data1];
        transaction.push(this.state.data2);
        transaction.push(this.state.data3);
        transaction.push(this.state.data4.toString());
        transaction.push(this.state.data5);

        const TpHdPrivkey = BSV.HDPrivateKey.fromString(this.state.newTpHdPrivKey);

        console.log('transaction:', transaction);
        console.log('Address::', this.state.tpAddress1);
        console.log('Address:.toString():', this.state.tpAddress1.toString());
        console.log('PrivateKey:', TpHdPrivkey);
        console.log('PrivateKey.privateKey.toWIF():', TpHdPrivkey.privateKey.toWIF());


        const opReturnHexArray = await bitcoinfiles.signArguments({
            args: transaction,
            address: this.state.tpAddress1.toString(),
            key: TpHdPrivkey.privateKey.toWIF()
        });
        console.log('transactionArray:', transaction.concat(opReturnHexArray));

        this.setState({ signArgumentsOutput: transaction.concat(opReturnHexArray) });

    }

    signArgumentsDisplay() {
        /* const transaction = ['00\n'];
        transaction.push('01\n');
        transaction.push('This is the message to sign\n');
        transaction.push('00\n');
        transaction.push('00\n'); */

        const transaction = [this.state.data1 + '\n'];
        transaction.push(this.state.data2 + '\n');
        transaction.push(this.state.data3 + '\n');
        transaction.push(this.state.data4 + '\n');
        transaction.push(this.state.data5 + '\n');

        console.log('transaction:', transaction);

        /* const transactionHex = ['0x' + this.hexEncode('00') + '\n'];
        transactionHex.push('0x' + this.hexEncode('01') + '\n');
        transactionHex.push('0x' + this.hexEncode('This is the message to sign') + '\n');
        transactionHex.push('0x' + this.hexEncode('00') + '\n');
        transactionHex.push('0x' + this.hexEncode('00') + '\n'); */

        const transactionHex = ['0x' + this.state.hexData1 + '\n'];
        transactionHex.push('0x' + this.state.hexData2 + '\n');
        transactionHex.push('0x' + this.state.hexData3 + '\n');
        transactionHex.push('0x' + this.state.hexData4 + '\n');
        transactionHex.push('0x' + this.state.hexData5 + '\n');

        console.log('transactionHex:', transactionHex);
        console.log('Address.toString():', this.state.tpAddress1.toString());
        console.log('PrivateKey:', this.state.newTpHdPrivKey);

        this.setState({ signArguments: '[' + transaction + ']', signArgumentsHex: '[' + transactionHex + ']' });

    }

    buildAuthorIdentity = async () => {
        const transaction = [this.state.hexData1];
        transaction.push(this.state.hexData2);
        transaction.push(this.state.hexData3);
        transaction.push(this.state.hexData4);
        transaction.push(this.state.hexData5);

        const TpHdPrivkey = BSV.HDPrivateKey.fromString(this.state.newTpHdPrivKey);

        console.log('transaction:', transaction);
        console.log('Address:', this.state.tpAddress1);
        console.log('Address.toString():', this.state.tpAddress1.toString());
        console.log("PrivateKey:");
        console.log('TpHdPrivkey:', TpHdPrivkey);
        console.log('TpHdPrivkey.privatekey.toWIF()', TpHdPrivkey.privateKey.toWIF());


        const opReturnHexArray = await bitcoinfiles.buildAuthorIdentity({
            args: transaction,
            address: this.state.tpAddress1.toString(),
            key: TpHdPrivkey.privateKey.toWIF()
        });
        console.log('transactionArray:', transaction.concat(opReturnHexArray));

        this.setState({ buildAuthorIdentityOutput: transaction.concat(opReturnHexArray) });


        //0x31424150537561506e66476e53424d33474c56397968785564596534764762644d54,
        //0x4944,
        //0x303466643066613039336135313136366161373637623766383565336264343562343464313834616232633530356331616132303031353530663334356362373635,
        //0x314146506d595871376148317a6a7963486258676a62536a4d513853505754797847,
        //0x7c,
        //0x313550636948473232534e4c514a584d6f5355615756693757537163376843667661,
        //0x424954434f494e5f4543445341,
        //0x313444464d756f6f743375796a6a656156584c4568454d7656657a7063504b364136,
        //0x1f95b0dc853a33e47a3183489c91fa229d28894f3512312021f8e64a3563aa72bf62112d0816605ee57172832cf5597e1ebcc32bbbf99fe7997c89257e104e6d3b
    }

    buildAuthorIdentityDisplay() {

        const transactionArray = [this.state.data1 + '\n'];
        transactionArray.push(this.state.data2 + '\n');
        transactionArray.push(this.state.data3 + '\n');
        transactionArray.push(this.state.data4.toString() + '\n');
        transactionArray.push(this.state.data5 + '\n');

        console.log('transactionArray:', transactionArray);

        const transactionHexArray = [this.state.hexData1 + '\n'];
        transactionHexArray.push(this.state.hexData2 + '\n');
        transactionHexArray.push(this.state.hexData3 + '\n');
        transactionHexArray.push(this.state.hexData4 + '\n');
        transactionHexArray.push(this.state.hexData5 + '\n');

        console.log('transactionHexArray:', transactionHexArray);
        console.log('Address.toString():', this.state.tpAddress1.toString());
        console.log('PrivateKey:', this.state.newTpHdPrivKey);

        this.setState({ buildAuthorIdentity: '[' + transactionArray + ']', buildAuthorIdentityHex: '[' + transactionHexArray + ']' });
    }

    verifyAuthorIdentity = async () => {
        const transaction = [this.state.hexData1];
        transaction.push(this.state.hexData2);
        transaction.push(this.state.hexData3);
        transaction.push(this.state.hexData4);
        transaction.push(this.state.hexData5);
        transaction.push(this.state.hexData6);
        transaction.push(this.state.hexData7);
        transaction.push(this.state.hexData8);
        transaction.push(this.state.hexData9);

        const addresses = [this.state.tpAddress1.toString()];

        //const TpHdPrivkey = BSV.HDPrivateKey.fromString(this.state.newTpHdPrivKey);

        console.log('transaction:', transaction);
        console.log('Address:', this.state.tpAddress1);
        console.log('Address.toString():', this.state.tpAddress1.toString());
        console.log('Addresses:', addresses);
        //console.log("PrivateKey:");
        //console.log('TpHdPrivkey:', TpHdPrivkey);
        //console.log('TpHdPrivkey.privatekey.toWIF()', TpHdPrivkey.privateKey.toWIF());


        const opReturnHexArray = await bitcoinfiles.verifyAuthorIdentity(
            {
                args: transaction,
                expectedAuthorAddresses: addresses
                //transaction, [this.state.tpAddress1.toString()]
                //transaction, addresses
            }
        );
        console.log('transactionArray:', transaction.concat(opReturnHexArray));

        this.setState({ verifyAuthorIdentityOutput: transaction.concat(opReturnHexArray) });

        // For testing purpose
        /* var opReturnFields = [
            '0x6a',         /// OP_RETURN                                                              //j
            '0x31394878696756345179427633744870515663554551797131707a5a56646f417574',                  //19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut
            '0x7b20226d657373616765223a202248656c6c6f20776f726c6421227d',                              //{ "message": "Hello world!"}
            '0x6170706c69636174696f6e2f6a736f6e',                                                      //application/json
            '0x7574662d38',                                                                            //utf-8
            '0x00',                                                                                    //
            '0x7c',                                                                                    //|
            '0x313550636948473232534e4c514a584d6f5355615756693757537163376843667661',                  //15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva
            '0x424954434f494e5f4543445341',                                                            //BITCOIN_ECDSA
            '0x31455868536247466945415a4345356565427655785436634256486872705057587a',                  //1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz
            '0x1b3ffcb62a3bce00c9b4d2d66196d123803e31fa88d0a276c125f3d2524858f4d16bf05479fb1f988b852fe407f39e680a1d6d954afa0051cc34b9d444ee6cb0af'
        ];
        var verifySigResult = await bitcoinfiles.verifyAuthorIdentity(opReturnFields, ['1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz']);
        console.log(verifySigResult); */

        /* var opReturnFields = [
            '0x31394878696756345179427633744870515663554551797131707a5a56646f417574',
            '0x7b20226d657373616765223a202248656c6c6f20776f726c6421227d',
            '0x6170706c69636174696f6e2f6a736f6e',
            '0x7574662d38',
            '0x00',
            '0x7c',
            '0x313550636948473232534e4c514a584d6f5355615756693757537163376843667661',
            '0x424954434f494e5f4543445341',
            '0x31455868536247466945415a4345356565427655785436634256486872705057587a',
            '0x1b3ffcb62a3bce00c9b4d2d66196d123803e31fa88d0a276c125f3d2524858f4d16bf05479fb1f988b852fe407f39e680a1d6d954afa0051cc34b9d444ee6cb0af',
            '0x01',
            '0x02',
            '0x03',
            '0x04',
            '0x05',
            '0x06'
        ];
        var verifySigResult = await bitcoinfiles.verifyAuthorIdentity(opReturnFields, ['1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz']);
        console.log(verifySigResult); */


    }

    verifyAuthorIdentityDisplay() {

        const transactionArray = [this.state.data1 + '\n'];
        transactionArray.push(this.state.data2 + '\n');
        transactionArray.push(this.state.data3 + '\n');
        transactionArray.push(this.state.data4.toString() + '\n');
        transactionArray.push(this.state.data5 + '\n');
        transactionArray.push(this.state.data6 + '\n');
        transactionArray.push(this.state.data7 + '\n');
        transactionArray.push(this.state.data8.toString() + '\n');
        transactionArray.push(this.state.data9 + '\n');

        console.log('transactionArray:', transactionArray);

        const transactionHexArray = [this.state.hexData1 + '\n'];
        transactionHexArray.push(this.state.hexData2 + '\n');
        transactionHexArray.push(this.state.hexData3 + '\n');
        transactionHexArray.push(this.state.hexData4 + '\n');
        transactionHexArray.push(this.state.hexData5 + '\n');
        transactionHexArray.push(this.state.hexData6 + '\n');
        transactionHexArray.push(this.state.hexData7 + '\n');
        transactionHexArray.push(this.state.hexData8 + '\n');
        transactionHexArray.push(this.state.hexData9 + '\n');


        console.log('transactionHexArray:', transactionHexArray);
        console.log('Address.toString():', this.state.tpAddress1.toString());
        console.log('PrivateKey:', this.state.newTpHdPrivKey);

        this.setState({ verifyAuthorIdentity: '[' + transactionArray + ']', verifyAuthorIdentityHex: '[' + transactionHexArray + ']' });
    }

    detectAndVerifyAuthorIdentities() {

    }

    detectAndVerifyAuthorIdentitiesDisplay() {

    }

    onPayment = (payment) => {
        console.log('Processing payment.....;')
        console.log("successMessageValue:", this.state.successMessageValue)
        console.log("toValue:", this.state.toValue)
        console.log("currencyValue:", this.state.currencyValue)
        console.log("editableValue:", this.state.editableValue)
        console.log("labelValue:", this.state.labelValue)
        console.log("opReturn:", this.state.opReturn)
        console.log("clientIdentifierValue:", this.state.clientIdentifierValue)
        console.log("buttonIdValue:", this.state.buttonIdValue)
        console.log("buttonDataValue:", this.state.buttonDataValue)
        console.log("typeValue:", this.state.typeValue)

        if (payment.status === "RECEIVED") {
            console.log('Payment Successful!!')
            console.log(payment)
            //do something
            this.handleSubmit();
        }
    }

    onError = (err) => {
        console.log('Error', err)
    }


    handleOutputsChange = async (event) => {
        console.log(event)
        return this.setState({ outputsValue: event.target.value })
    }

    forceReloadButton = () => {
        this.setState({ showButton: false }, () => {
            setTimeout(() => this.setState({ showButton: true }), 10)
        })
    }

    onLoad = () => {
        console.log('Moneybutton onLoad callback is working')
        this.getDate();
        this.randomSecret();
    }

    handleSubmit = async () => {
        alert('A name was submitted: ' + this.state.value);
        //event.preventDefault();

        console.log("me called check")
    }

    render() {
        return (
            //xs, sm, md, lg, and xl.

            <Container maxWidth="xl">
                <form onSubmit={event => this.handleSubmit(event)}>
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <Paper variant="h4">
                                <h3>Please enter Third party (Veribit) details:</h3>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>TP HDPrivatekey1:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <input type="button" value="generate" onClick={this.getNewTpHDPrivateKey.bind(this)} size='sm' />
                        </Grid>
                        <Grid item lg={7}>
                            <Input fullWidth={true} type="text" value={this.state.newTpHdPrivKey} onChange={event => this.newTpHdPrivateKeyChange(event)} placeholder="Hierarchical Deterministic Privatekey"></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>This is the identity control key for the Third party</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>TP Derived HDPrivatekey1:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <input type="button" value="generate" onClick={this.getDerivedTpHdPrivateKey.bind(this)} size='sm' />
                        </Grid>
                        <Grid item lg={7}>
                            <Input fullWidth={true} type="text" value={this.state.newTpHdPrivKeyDerived} onChange={event => this.newTpHdPrivateKeyDerivedChange(event)} placeholder="Derived Hierarchical Deterministic Privatekey"></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>This is the first Signing key for the Third party</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>TP Address1:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input fullWidth={true} type="text" value={this.state.tpAddress1} onChange={event => this.tpAddress1change(event)} placeholder="Controling key address"></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>This is the address linked to the controling Identity key</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>TP Address2:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input fullWidth={true} type="text" value={this.state.tpAddress2} onChange={event => this.tpAddress2change(event)} placeholder="Signing address (ID - Only), this will be the Identity control/destroy address"></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>This is the address linked to the signing key</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Random TP IdentityKey (64 char/256 bits):</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input disabled={true} fullWidth={true} type="text" value={this.state.tpIdentityKey} style={{ backgroundColor: "#f3f3f3" }}></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>This is the random Identity Key linked to the Third Party</Typography>
                        </Grid>
                    </Grid>








                    <Grid container spacing={1}>
                        <Grid item xs>
                            <Paper variant="h4">
                                <h3>Please enter Veribit User details:</h3>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <Typography>Privatekey1:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <input type="button" value="generate" onClick={this.getNewPrivateKey.bind(this)} size='sm' />
                        </Grid>
                        <Grid item lg={9}>
                            <Input fullWidth={true} type="text" value={this.state.privatekey1} onChange={event => this.privatekey1change(event)} placeholder="Privatekey"></Input>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <Typography>Privatekey2:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item lg={9}>
                            <Input fullWidth={true} type="text" value={this.state.privatekey2} onChange={event => this.privatekey2change(event)} placeholder="Privatekey"></Input>
                        </Grid>
                    </Grid> */}


                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>HDPrivatekey1:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <input type="button" value="generate" onClick={this.getNewHDPrivateKey.bind(this)} size='sm' />
                        </Grid>
                        <Grid item xs={7}>
                            <Input fullWidth={true} type="text" value={this.state.newHdPrivKey} onChange={event => this.newHdPrivateKeyChange(event)} placeholder="Hierarchical Deterministic Privatekey"></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>This is the identity control key for the user</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Derived HDPrivatekey1:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <input type="button" value="generate" onClick={this.getDerivedHdPrivateKey.bind(this)} size='sm' />
                        </Grid>
                        <Grid item xs={7}>
                            <Input fullWidth={true} type="text" value={this.state.newHdPrivKeyDerived} onChange={event => this.newHdPrivateKeyDerivedChange(event)} placeholder="Derived Hierarchical Deterministic Privatekey"></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>This is the signing key for the user</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Address1:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input fullWidth={true} type="text" value={this.state.address1} onChange={event => this.address1change(event)} placeholder="Controlling key address"></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>This is the address linked to the controling Identity key</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Address2:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input fullWidth={true} type="text" value={this.state.address2} onChange={event => this.address2change(event)} placeholder="Signing address (ID - Only), this will be the Identity control/destroy address"></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>This is the address linked to the signing key</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Random IdentityKey (64 char/256 bits):</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input disabled={true} fullWidth={true} type="text" value={this.state.identityKey} style={{ backgroundColor: "#f3f3f3" }} ></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>This is the random Identity Key linked to the user</Typography>
                        </Grid>
                    </Grid>






                    <Grid container spacing={1}>
                        <Grid item xs>
                            <Paper variant="h4">
                                <h3>Now lets build the Identity and Attestation URN's if you want to do an ATTEST tx:</h3>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Random SecretKey (64 char/256 bits):</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <input type="button" value="re-generate" onClick={this.randomSecret.bind(this)} size='sm' />
                        </Grid>
                        <Grid item xs={7}>
                            <Input disabled={true} multiline={true} fullWidth={true} type="text" value={this.state.secretKey} style={{ backgroundColor: "#f3f3f3" }}></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>This is the random Secret Key added to the end of an Identity Attestation for entropy</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Identity URN:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input fullWidth={true} type="text" value={this.state.urnIdentity} onChange={event => this.handleUrnIdentityChange(event)} ></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>This field is where you will build the Identity URN string</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Identity URN sha256 hash:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input disabled={true} multiline={true} fullWidth={true} type="text" value={this.state.urnIdentityHash} style={{ backgroundColor: "#f3f3f3" }}></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>This field will display the hex value of the Identity URN string</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Attestation URN:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input fullWidth={true} type="text" value={this.state.urnAttestation} onChange={event => this.handleUrnAttestationChange(event)} ></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>This field is where you will build the Attestation URN string. Hash(identityHash : identityKey)</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Attestation-URN sha255 hash:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input disabled={true} multiline={true} fullWidth={true} type="text" value={this.state.urnAttestationHash} style={{ backgroundColor: "#f3f3f3" }}></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>This field will display the hex value of the Attestation URN string</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Attestation signature addr2:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <input type="button" value="generate" onClick={this.signAttestationUrn.bind(this)} size='sm' />
                        </Grid>
                        <Grid item xs={7}>
                            <Input disabled={true} multiline={true} fullWidth={true} type="text" value={this.state.urnAttestationSignature} style={{ backgroundColor: "#f3f3f3" }}></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>This field will display a generated signature of the privatekey and attestation URN hash. Sign(Attestation URN Hash, PrivateKey)</Typography>
                        </Grid>
                    </Grid>









                    <Grid container spacing={1}>
                        <Grid item xs>
                            <Paper variant="h4">
                                <h3>Now lets build the Transaction (ID/ATTEST/REVOKE):</h3>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid container spacing={7}>
                        <Grid item xs={2}>
                            <Typography>Important information to understand:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>There are two types of ID tx's, the first is a tx that will link an identityKey to an master address
                                and set up a different signing address. The second is a "Destroy" tx, where you destroy the master identity link
                                and all linked attestations that was create using the spesific identityKey:</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>The ATTEST tx type allows you to create a single line identity URN, hash the identity URN, then add the
                                hash and the identityKey to the attestation URN, hash that URN and add that to a transaction on the blockchain for a spesific identtyKey</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>The REVOKE tx type allows you to break the link to a created attestation for a spesif identityKey</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>These are important notes you have to grasp to fully understand BAP</Typography>
                        </Grid>
                    </Grid>


                    <Grid container spacing={7}>
                        <Grid item xs={2}>
                            <Typography>Examples:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={2}>
                            <textarea disabled={true} value={this.state.example} cols={35} rows={9} />
                        </Grid>
                        <Grid item xs={2}>
                            <textarea disabled={true} value={this.state.example1} cols={35} rows={9} />
                        </Grid>
                        <Grid item xs={2}>
                            <textarea disabled={true} value={this.state.example2} cols={35} rows={9} />
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>Thesse examples show you the different kind of transaction you can do with BAP (ID/ATTEST/REVOKE)</Typography>
                        </Grid>
                    </Grid>


                    <Grid container spacing={7}>
                        <Grid item xs={2}>
                            <Typography>PreLoad TX data:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={2}>
                            <input type="button" value="Load ID tx data blow" onClick={this.loadIdDefaultValues.bind(this)} size='sm' />
                        </Grid>
                        <Grid item xs={2}>
                            <input type="button" value="Load ATTEST tx data below" onClick={this.loadAttestDefaultValues.bind(this)} size='sm' />
                        </Grid>
                        <Grid item xs={2}>
                            <input type="button" value="Load REVOKE tx data below" onClick={this.loadRevokeDefaultValues.bind(this)} size='sm' />
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>These Button will populate the fields listed below based on the TX type (ID/ATTEST/REVOKE) you choose:</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Data1:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input fullWidth={true} type="text" value={this.state.data1} onChange={event => this.handleData1Change(event)} placeholder="Enter OP_RETURN data1 here.."></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>1BAPSuaPnfGnSBM3GLV9yhxUdYe4vGbdMT</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Hex Data1:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input disabled={true} fullWidth={true} type="text" value={this.state.hexData1} placeholder="Hex data1 convertion" style={{ backgroundColor: "#f3f3f3" }}></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>Hex of Data1</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Data2:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input fullWidth={true} type="text" value={this.state.data2} onChange={event => this.handleData2Change(event)} placeholder="Enter OP_RETURN data2 here.."></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>[ID|ATTEST|REVOKE]</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Hex Data2:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input disabled={true} fullWidth={true} type="text" value={this.state.hexData2} placeholder="Hex data2 convertion" style={{ backgroundColor: "#f3f3f3" }}></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>Hex of Data2</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Data3:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input fullWidth={true} type="text" value={this.state.data3} onChange={event => this.handleData3Change(event)} placeholder="Enter OP_RETURN data3 here.."></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>[IdentityKey | UrnAttestation hash]</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Hex Data3:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input disabled={true} fullWidth={true} type="text" value={this.state.hexData3} placeholder="Hex data3 convertion" style={{ backgroundColor: "#f3f3f3" }}></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>Hex of Data3</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Data4:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input fullWidth={true} type="text" value={this.state.data4} onChange={event => this.handleData4Change(event)} placeholder="Enter OP_RETURN data4 here.."></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>[Address]</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Hex Data4:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input disabled={true} fullWidth={true} type="text" value={this.state.hexData4} placeholder="Hex data4 convertion" style={{ backgroundColor: "#f3f3f3" }}></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>Hex of Data4</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Data5:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input fullWidth={true} type="text" value={this.state.data5} onChange={event => this.handleData5Change(event)} placeholder="Enter OP_RETURN data5 here.."></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>[|]</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Hex Data5:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input disabled={true} fullWidth={true} type="text" value={this.state.hexData5} placeholder="Hex data5 convertion" style={{ backgroundColor: "#f3f3f3" }}></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>Hex of Data5</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Data6:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input fullWidth={true} type="text" value={this.state.data6} onChange={event => this.handleData6Change(event)} placeholder="Enter OP_RETURN data6 here.."></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Hex Data6:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input disabled={true} fullWidth={true} type="text" value={this.state.hexData6} placeholder="Hex data6 convertion" style={{ backgroundColor: "#f3f3f3" }}></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>Hex of Data6</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Data7:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input fullWidth={true} type="text" value={this.state.data7} onChange={event => this.handleData7Change(event)} placeholder="Enter OP_RETURN data7 here.."></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>BITCOIN_ECDSA</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Hex Data7:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input disabled={true} fullWidth={true} type="text" value={this.state.hexData7} placeholder="Hex data7 convertion" style={{ backgroundColor: "#f3f3f3" }}></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>Hex of Data7</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Data8:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input fullWidth={true} type="text" value={this.state.data8} onChange={event => this.handleData8Change(event)} placeholder="Enter OP_RETURN data8 here.."></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>[AIP Signing Address]</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Hex Data8:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input disabled={true} fullWidth={true} type="text" value={this.state.hexData8} placeholder="Hex data8 convertion" style={{ backgroundColor: "#f3f3f3" }}></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>Hex of Data8</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Data9 Compact:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <input type="button" value="generate" onClick={this.signArgs.bind(this)} size='sm' />
                        </Grid>
                        <Grid item xs={7}>
                            <Input fullWidth={true} type="text" value={this.state.data9} onChange={event => this.handleData9Change(event)} placeholder="Display signature in Compact format.."></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>[AIP Signature Compact version]</Typography>
                        </Grid>
                    </Grid>

                    {/* <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Data9 DER:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input fullWidth={true} type="text" value={this.state.data9DER} placeholder="Display signature in DER format.."></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>[AIP Signature DER version]</Typography>
                        </Grid>
                    </Grid> */}

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Hex Data9:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input disabled={true} fullWidth={true} type="text" value={this.state.hexData9} placeholder="Hex data9 convertion" style={{ backgroundColor: "#f3f3f3" }}></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>Hex of Data9</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Signature Verified:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input disabled={true} fullWidth={true} type="text" value={this.state.sigVerified} placeholder="Hex data9 convertion" style={{ backgroundColor: "#f3f3f3" }}></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>Here we verify the signature against the address and the data that supplied</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>The complete OP_RETURN:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <input type="button" value="generate" onClick={this.generateOpReturn.bind(this)} size='sm' />
                        </Grid>
                        <Grid item xs={7}>
                            <Input disabled={true} multiline={true} fullWidth={true} type="text" value={this.state.opReturn} placeholder="OP_RETURN..." style={{ backgroundColor: "#f3f3f3" }}></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>This field will combine all the data fields separated by spaces into a single op_return</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>The complete OP_RETURN in Hex:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <input type="button" value="generate" onClick={this.generateOpReturnHex.bind(this)} size='sm' />
                        </Grid>
                        <Grid item xs={7}>
                            <Input disabled={true} multiline={true} fullWidth={true} type="text" value={this.state.opReturnHex} placeholder="OP_RETURN HEX..." style={{ backgroundColor: "#f3f3f3" }}></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>This field will combine all the data fields separated by spaces into a single op_return</Typography>
                        </Grid>
                    </Grid>







                    <Grid container spacing={1}>
                        <Grid item xs>
                            <Paper >
                                <h3>Some important information to take note of and some helper functions you can use in BitcoinFiles-sdk:</h3>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Current BAP Transaction:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input disabled={true} multiline={true} fullWidth={true} type="text" value={this.state.data2} style={{ backgroundColor: "#f3f3f3" }} placeholder='ID / ATTEST / REVOKE...'></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>This field will display the BAP transaction that you are currently performing (ID/ATTEST/REVOKE)</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Address Linked to Identity Key:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input disabled={true} multiline={true} fullWidth={true} type="text" value={this.state.tpAddress2} style={{ backgroundColor: "#f3f3f3" }} placeholder='Address used for signing/attesting...'></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>This field will display the address of the third party that is linked to the indentity in the above TX type</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <Typography>Identity Key:</Typography>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={7}>
                            <Input disabled={true} multiline={true} fullWidth={true} type="text" value={this.state.tpIdentityKey} style={{ backgroundColor: "#f3f3f3" }} placeholder='Identity Key used for signing/attesting...'></Input>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography>This field will display the indentity key of the third party in the above TX type</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={3}>
                            <input type="button" value="signArguments Display" onClick={this.signArgumentsDisplay.bind(this)} size='sm' />
                        </Grid>
                        <Grid item xs={3}>
                            <input type="button" value="buildAuthorIdentity Display" onClick={this.buildAuthorIdentityDisplay.bind(this)} size='sm' />
                        </Grid>
                        <Grid item xs={3}>
                            <input type="button" value="verifyAuthorIdentity Display" onClick={this.verifyAuthorIdentityDisplay.bind(this)} size='sm' />
                        </Grid>
                        <Grid item xs={3}>
                            <input type="button" value="detectAndVerifyAuthorIdentities Display" onClick={this.detectAndVerifyAuthorIdentitiesDisplay.bind(this)} size='sm' />
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={3}>
                            <Input disabled={true} multiline={true} fullWidth={true} type="text" value={this.state.signArguments} style={{ backgroundColor: "#f3f3f3" }} placeholder='Click the button above to generate the signArg...'></Input>
                        </Grid>
                        <Grid item xs={3}>
                            <Input disabled={true} multiline={true} fullWidth={true} type="text" value={this.state.buildAuthorIdentity} style={{ backgroundColor: "#f3f3f3" }} placeholder='Click the button above to generate the buildAuthorIdentity...'></Input>
                        </Grid>
                        <Grid item xs={3}>
                            <Input disabled={true} multiline={true} fullWidth={true} type="text" value={this.state.verifyAuthorIdentity} style={{ backgroundColor: "#f3f3f3" }} placeholder='Click the button above to generate the verifyAuthorIdentity...'></Input>
                        </Grid>
                        <Grid item xs={3}>
                            <Input disabled={true} multiline={true} fullWidth={true} type="text" value={this.state.detectAndVerifyAuthorIdentities} style={{ backgroundColor: "#f3f3f3" }} placeholder='Click the button above to generate the detectAndVerifyAuthorIdentities...'></Input>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={3}>
                            <Input disabled={true} multiline={true} fullWidth={true} type="text" value={this.state.signArgumentsHex} style={{ backgroundColor: "#f3f3f3" }} placeholder='Click the button above to generate the signArg in Hex...'></Input>
                        </Grid>
                        <Grid item xs={3}>
                            <Input disabled={true} multiline={true} fullWidth={true} type="text" value={this.state.buildAuthorIdentityHex} style={{ backgroundColor: "#f3f3f3" }} placeholder='Click the button above to generate the buildAuthorIdentity in Hex...'></Input>
                        </Grid>
                        <Grid item xs={3}>
                            <Input disabled={true} multiline={true} fullWidth={true} type="text" value={this.state.verifyAuthorIdentityHex} style={{ backgroundColor: "#f3f3f3" }} placeholder='Click the button above to generate the verifyAuthorIdentity in Hex...'></Input>
                        </Grid>
                        <Grid item xs={3}>
                            <Input disabled={true} multiline={true} fullWidth={true} type="text" value={this.state.detectAndVerifyAuthorIdentitiesHex} style={{ backgroundColor: "#f3f3f3" }} placeholder='Click the button above to generate the verifyAuthorIdentity in Hex...'></Input>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={3}>
                            <input type="button" value="Call signArguments" onClick={this.signArguments.bind(this)} size='sm' />
                        </Grid>
                        <Grid item xs={3}>
                            <input type="button" value="Call buildAuthorIdentity" onClick={this.buildAuthorIdentity.bind(this)} size='sm' />
                        </Grid>
                        <Grid item xs={3}>
                            <input type="button" value="call verifyAuthorIdentity" onClick={this.verifyAuthorIdentity.bind(this)} size='sm' />
                        </Grid>
                        <Grid item xs={3}>
                            <input type="button" value="call detectAndVerifyAuthorIdentities" onClick={this.detectAndVerifyAuthorIdentities.bind(this)} size='sm' />
                        </Grid>
                    </Grid>

                    <Grid container spacing={4}>
                        <Grid item xs={3}>
                            <Input disabled={true} multiline={true} fullWidth={true} type="text" value={this.state.signArgumentsOutput} style={{ backgroundColor: "#f3f3f3" }} placeholder='Click the button above to generate the signArguments Output...'></Input>
                        </Grid>
                        <Grid item xs={3}>
                            <Input disabled={true} multiline={true} fullWidth={true} type="text" value={this.state.buildAuthorIdentityOutput} style={{ backgroundColor: "#f3f3f3" }} placeholder='Click the button above to generate the buildAuthorIdentity Output...'></Input>
                        </Grid>
                        <Grid item xs={3}>
                            <Input disabled={true} multiline={true} fullWidth={true} type="text" value={this.state.verifyAuthorIdentityOutput} style={{ backgroundColor: "#f3f3f3" }} placeholder='Click the button above to generate the verifyAuthorIdentity Output...'></Input>
                        </Grid>
                        <Grid item xs={3}>
                            <Input disabled={true} multiline={true} fullWidth={true} type="text" value={this.state.detectAndVerifyAuthorIdentitiesOutput} style={{ backgroundColor: "#f3f3f3" }} placeholder='Click the button above to generate the verifyAuthorIdentity Output...'></Input>
                        </Grid>
                    </Grid>










                    <br />
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <Paper >
                                <h3>Bitcom BAP Protocol Settings:</h3>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs>
                            <Typography align="right">BAP Bitcom:</Typography>
                            <Typography align="right">AIP Bitcom:</Typography>
                            <Typography align="right">Algorithm:</Typography>
                            <Typography align="right">Signing Protocol:</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography align="left">{this.state.bapBitCom}</Typography>
                            <Typography align="left">{this.state.aipBitCom}</Typography>
                            <Typography align="left"> {this.state.aipAlgorithm}</Typography>
                            <Typography align="left"> {this.state.signingProtocol}</Typography>
                        </Grid>
                    </Grid>
                    <br />



                    {/* <Grid container spacing={1}>
                        <Grid item xs>
                            <Paper >
                                <h3>You can use these test values:</h3>
                            </Paper>
                        </Grid>
                    </Grid>


                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Typography align="right">Address1:</Typography>
                            <Typography align="right">Address2:</Typography>
                            <Typography align="right">Privatekey1:</Typography>
                            <Typography align="right">Privatekey2:</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography align="left">x1EXhSbGFiEAZCE5eeBvUxT6cBVHhrpPWXz</Typography>
                            <Typography align="left">19nknLhRnGKRR3hobeFuuqmHUMiNTKZHsR</Typography>
                            <Typography align="left">5KLpZB2Sfn4S7QXh6rRynXrVZXXT8zTdQBaj7Ngs3ZHpip5zd8r</Typography>
                            <Typography align="left">5Hy9zVymDHhavj55sRdQ5nWTYYeJ2BsJdFDpfPutcc7RZUJg59H</Typography>
                        </Grid>
                    </Grid> */}


                    <br />
                    {/* <div margin="5%" >
                                <input type="submit" value="Submit" />

                            </div> */}
                    <div>
                        <MoneyButton
                            successMessage={this.state.successMessageValue}

                            //to={this.state.toValue}
                            //amount={this.state.amountValue}
                            //currency={this.state.currencyValue}

                            editable={this.state.editableValue}
                            label={this.state.labelValue}
                            //opReturn={this.state.opReturn}
                            clientIdentifier={this.state.clientIdentifierValue}
                            buttonId={this.state.buttonIdValue}
                            buttonData={this.state.buttonDataValue}
                            type={this.state.typeValue}
                            outputs={this.state.outputs}

                            //output

                            onPayment={this.onPayment.bind(this)}
                            onError={this.onError.bind(this)}
                            onLoad={this.onLoad.bind(this)}
                            disabled={this.state.disabledValue}
                        />
                    </div>
                </form>
            </Container >

        );
    }
}

export default Bap;
