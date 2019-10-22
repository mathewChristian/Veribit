import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Row, Col, Button, Input, Layout } from "antd";
import { connectAuth, authActionCreators } from "core";
import { promisify } from "../../utilities";
import { validateEmail } from "../../services/common";
import logo from "assets/img/logo.png";
import queryString from "query-string";

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
      haveGrant: false,
      userId: "",
      email: ""
    };
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    if (values.code) {
      this.setState(...this.state, { haveGrant: true });
    }
  }

  async handleMoneyButtonResponse() {
    try {
      await client.handleAuthorizationResponse();
      const { id: userId } = await client.getIdentity();
      const { primaryPaymail: email } = await client.getUserProfile(userId);
      if (validateEmail(email)) {
        this.setState(...this.state, { email: email, userId: userId, isEmailValidate: true });
      }
    } catch (error) {
      this.setState(...this.state, { msg: error });
    }
  }

  async login() {
    if (this.state.haveGrant == true) {
      try {
        await this.handleMoneyButtonResponse();
      } catch (error) {
        this.setState(...this.state, { msg: error });
      }

      promisify(this.props.login, {
        userId: this.state.userId,
        email: this.state.email,
        password: this.state.userId
      })
        .then(res => {
          if (res.status === 200) {
            this.props.history.push("/dashboard");
          }
        })
        .catch(error => this.setState(...this.state, { msg: error }));
    }
  }

  async moneyButtonSignUp(provider) {
    if (this.state.haveGrant == true) {
      try {
        await this.handleMoneyButtonResponse();
      } catch (error) {
        this.setState(...this.state, { msg: error });
      }

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

  async relayOneSignUp() { }

  moneyButtonLoginGrant = () => {
    client.requestAuthorization(
      "auth.user_identity:read users.profiles:read",
      "http://localhost:3006/signin"
    );
  };

  render() {
    if (this.state.haveGrant) {
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
  const { login, signUp } = authActionCreators;

  return bindActionCreators(
    {
      login,
      signUp
    },
    dispatch
  );
};

export default connectAuth(mapStateToProps, mapDisptachToProps)(
  SignInContainer
);