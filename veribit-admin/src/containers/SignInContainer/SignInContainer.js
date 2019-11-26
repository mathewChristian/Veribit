import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Row, Col, Button, Input, Layout } from "antd";
import { connectAuth, authActionCreators } from "core";
import { promisify } from "../../utilities";
import { validateEmail } from "../../services/common";
import logo from "assets/img/logo.png";
import { store } from 'core';

const { Content, Header } = Layout;
const { MoneyButtonClient } = require("@moneybutton/api-client");
const client = new MoneyButtonClient("58556f8075944af8708f58de0c2b8868");

class SignInContainer extends PureComponent {
  static propTypes = {
    login: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      userId: "",
      email: "",
      isMbUserStored: false
    };
  }

  //get values from redux store
  reduxstore = this.getCurrentStateFromStore();

  getCurrentStateFromStore() {
    return {
      userId: store.getState().auth.userId,
      email: store.getState().auth.email
    }
  }

  updateStateFromStore = () => {
    const currentState = this.getCurrentStateFromStore();

    if (this.state !== currentState) {
      this.setState(currentState);
    }
  }

  componentDidMount() {
    this.unsubscribeStore = store.subscribe(this.updateStateFromStore);

    //check if mbUser is set in the state
    console.log(this.reduxstore)
    if (validateEmail(this.reduxstore.email)) {
      this.setState(...this.state, { email: this.reduxstore.email, userId: this.reduxstore.userId, isMbUserStored: true });
    }
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  async login() {
    console.log(this.state.email.length)
    console.log(this.state.email)
    console.log(this.state.userId)
    if (this.state.email.length !== 0 && validateEmail(this.state.email)) {

      promisify(this.props.login, {
        userId: this.state.userId,
        email: this.state.email,
        password: this.state.userId
      })
        .then(res => {
          promisify(this.props.clearMbUser, { userId: this.state.userId, email: this.state.email })
          if (res.status === 200) {
            this.props.history.push("/dashboard");
          }
        })
        .catch(error => this.setState(...this.state, { msg: error }));
    }
  }

  async moneyButtonSignUp(provider) {
    if (this.state.email.length !== 0 && validateEmail(this.state.email)) {
      promisify(this.props.signUp, {
        userId: this.state.userId,
        email: this.state.email,
        provider: provider
      })
        .then(res => {
          if (res.status === 200) {
            this.props.history.push("signin");
          } else {
            this.setState(...this.state, { msg: res.msg || "Error occurred!" });
          }
        })
        .catch(e => {
          this.setState(...this.state, { msg: e.msg || "Error occurred!" });
        });
    }
  }

  //async relayOneSignUp() { }

  moneyButtonLoginGrant = () => {
    client.requestAuthorization(
      "auth.user_identity:read users.profiles:read",
      "http://localhost:3006/mbOauth"
    );
  };

  render() {
    console.log(this.state.isMbUserStored)
    if (this.state.isMbUserStored) {
      return (
        <div className="block">
          <Layout>
            <Header className="header"></Header>
            <Layout>
              <Content className="main">
                <Row className="sign_logo_area">
                  <Col span={14} offset={5}>
                    <img alt="true" src={logo} className="logo" />
                  </Col>
                </Row>
                <Row className="msg_area">
                  <Col offset={5} span={16}>
                    {this.state.msg ? this.state.msg : ''}
                  </Col>
                </Row>
                <Row>
                  <Col offset={4} span={16}>
                    <Button
                      className="continue_btn signin_btn"
                      onClick={this.login.bind(this, "moneybutton")}
                    >
                      Sign In
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col offset={4} span={16}>
                    <Button
                      className="continue_btn signup_btn"
                      onClick={this.moneyButtonSignUp.bind(this, "moneybutton")}
                    >
                      Sign Up
                    </Button>
                  </Col>
                </Row>
              </Content>
            </Layout>
          </Layout>
        </div>
      );
    } else {
      return (
        <div className="block">
          <Layout>
            <Header className="header"></Header>
            <Layout>
              <Content className="main">
                <Row className="sign_logo_area">
                  <Col span={14} offset={5}>
                    <img alt="true" src={logo} className="logo" />
                  </Col>
                </Row>
                <Row>
                  <Col offset={4} span={16}>
                    <Button
                      className="continue_btn"
                      onClick={this.moneyButtonLoginGrant}
                    >
                      Continue with M-Button
                    </Button>
                  </Col>
                </Row>
              </Content>
            </Layout>
          </Layout>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user
});
const mapDisptachToProps = dispatch => {
  const { login, signUp, clearMbUser } = authActionCreators;

  return bindActionCreators(
    {
      login,
      signUp,
      clearMbUser
    },
    dispatch
  );
};

export default connectAuth(mapStateToProps, mapDisptachToProps)(
  SignInContainer
);