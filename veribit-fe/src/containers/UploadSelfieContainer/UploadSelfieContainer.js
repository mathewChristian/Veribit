import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { Icon, Row, Col, Button, Layout } from 'antd';
import logo from 'assets/img/logo.png';
import { connectAuth, authActionCreators } from 'core';
import { promisify } from '../../utilities';
import UploadDocument from '../../components/UploadDocument/UploadDocument';
import imageCompression from 'browser-image-compression';

const { Content, Header } = Layout;

class UploadSelfieContainer extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      imgSrc: '',
      imgSrcCompressed: '',
    }
  }

  async CompressImage(imgSrcbase64) {
    try {
      const imagefile = await imageCompression.getFilefromDataUrl(imgSrcbase64)

      const options = {
        maxSizeMB: 0.09,
        maxWidthOrHeight: 2000,
        useWebWorker: false
      }

      const compressedFile = await imageCompression(imagefile, options);
      const compressedFilebase64 = await imageCompression.getDataUrlFromFile(compressedFile);
      this.setState({ imgSrcCompressed: compressedFilebase64 })
    } catch (error) {
      console.log(error);
    }
  }

  showTakePhotoPage = () => {
    this.props.history.push('take_photo', { uploadType: 'selfie' });
  }

  onChooseImage = (imgSrc) => {
    this.setState(...this.state, { imgSrc: imgSrc });
  }

  async uploadDocument() {
    const imgSrcbase64 = this.state.imgSrc;
    try {
      await this.CompressImage(imgSrcbase64);
    }
    catch (error) {
      console.log(error);
    }
    if (this.state.imgSrc !== '' && this.state.imgSrcCompressed !== '' && this.props.user) {
      promisify(this.props.updateSelfie, {
        token: this.props.user.token,
        selfie: this.state.imgSrcCompressed
      })
        .then((userInfo) => {
          this.props.history.push(`/signin/${this.props.user.token}`);
        })
        .catch(e => console.log(e));
    }
  }

  back = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="block">
        <Layout>
          <Header className="header">
            <div onClick={this.back}>
              <Icon style={{ fontSize: 16 }} type="arrow-left" /> <span>BACK</span>
            </div>
          </Header>
          <Layout>
            <Content className="main">
              <Row className="validation_logo_area">
                <Col span={14} offset={5}>
                  <img alt="true" src={logo} className="logo" />
                </Col>
              </Row>
              <Row className="validation_title_area">
                <Col span={12} offset={6}>
                  <span className="validation_choose_title">&ensp;Upload&ensp;Selfie</span>
                </Col>
              </Row>
              <Row className="upload_area">
                <Col offset={4} span={16}>
                  <UploadDocument onChooseImage={(imgSrc) => this.onChooseImage(imgSrc)} />
                </Col>
              </Row>
              <Row className="upload_btn_area">
                <Col className="take_area" offset={4} span={8}>
                  <Button className="take_btn" onClick={this.showTakePhotoPage}>Take a Picture<Icon style={{ fontSize: 16, color: '#ffffff' }} type="camera" /></Button>
                </Col>
                <Col className="preview_area" span={8}>
                  <Button className="preview_btn">Preview<Icon style={{ fontSize: 16, color: '#ffffff' }} type="eye" /></Button>
                </Col>
              </Row>
              <Row>
                <Col offset={4} span={16}>
                  <Button className={this.state.imgSrc === '' ? "continue_btn" : "continue_enable_btn"} disabled={this.state.imgSrc === '' ? true : false} onClick={this.uploadDocument.bind(this)}>NEXT</Button>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

const mapDisptachToProps = (dispatch) => {
  const {
    updateSelfie
  } = authActionCreators

  return bindActionCreators({
    updateSelfie
  }, dispatch);
}

export default compose(
  connectAuth(mapStateToProps, mapDisptachToProps),
)(UploadSelfieContainer);