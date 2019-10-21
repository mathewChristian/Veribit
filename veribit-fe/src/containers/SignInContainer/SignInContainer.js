import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Icon, Row, Col, Button, Input, Layout } from "antd";
import { connectAuth, authActionCreators } from "core";
import { promisify } from "../../utilities";
import { validateEmail } from "../../services/common";
import logo from "assets/img/logo.png";
import queryString from "query-string";

const { MoneyButtonClient } = require("@moneybutton/api-client");
const client = new MoneyButtonClient("58556f8075944af8708f58de0c2b8868");

const { Content, Header } = Layout;

class SignInContainer extends PureComponent {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        token: PropTypes.string
      })
    }).isRequired,
    login: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isFocus: false,
      user: "",
      email: "",
      isEmailValidate: true,

      haveGrant: false,
      userId: "",
      email: ""
    };
  }

  async componentDidMount() {
    let token = this.props.match.params.token;
    console.log(token)
    if (token) {
      promisify(this.props.login, { token: token })
        .then(user => {
          this.setState(...this.state, { user: user });
        })
        .catch(e => console.log(e));
    }

    const { code } = queryString.parse(this.props.location.search);
    if (code) {
      try {
        this.setState(...this.state, { haveGrant: true });
        await this.login();
      } catch (error) {
        this.setState(...this.state, { msg: error });
      }
    }
  }

  async handleMoneyButtonResonse() {
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
    const { code } = queryString.parse(this.props.location.search);
    if (code) {
      try {
        console.log("access token")
        await this.handleMoneyButtonResonse();
      } catch (error) {
        this.setState(...this.state, { msg: error });
      }

      if (this.state.email.length !== 0 && validateEmail(this.state.email) && !this.state.user.approvalStatus) {
        this.setState(...this.state, {
          isEmailValidate: true
        });
        promisify(this.props.genToken, {
          email: this.state.email
        })
          .then(user => {
            if (user.token) {
              promisify(this.props.login, { token: user.token })
                .then(user => {
                  this.setState(...this.state, { user: user });
                  if (user.approvalStatus === "NO_SUBMISSION_YET")
                    this.props.history.push("/validation");
                })
                .catch(e => console.log(e));
            }
          })
          .catch(e => console.log(e));
      } else {
        this.setState(...this.state, { isEmailValidate: false });
      }

      if (
        this.state.user.approvalStatus &&
        this.state.user.approvalStatus === "ACTION_REQUESTED"
      ) {
        this.props.history.push("/validation");
      }
    }
  }

  async showValidationPage() {
    await this.login();
  };

  moneyButtonLoginGrant = () => {
    client.requestAuthorization(
      "auth.user_identity:read users.profiles:read",
      "http://localhost:3006/signin"
    );
  };

  render() {
    var continueButton,
      msg = "";
    continueButton = (
      <Button className="continue_btn" onClick={this.showValidationPage.bind(this)}>
        CONTINUE
      </Button>
    );

    if (this.state.user !== "") {
      switch (this.state.user.approvalStatus) {
        case "NO_SUBMISSION_YET":
          continueButton = (
            <Button className="continue_btn" onClick={this.showValidationPage}>
              CONTINUE
            </Button>
          );
          break;
        case "PENDING":
          continueButton = (
            <Button disabled="true" className="continue_btn">
              PENDING
            </Button>
          );
          msg = (
            <span className="kyc_complete_msg">
              User has had a succssful submission awaiting approval
            </span>
          );
          break;
        case "APPROVED":
          continueButton = (
            <Button className="continue_btn kyc_complete_btn">
              KYC COMPLETE
            </Button>
          );
          msg = (
            <span className="kyc_complete_msg">
              User has had a succssful review
            </span>
          );
          break;
        case "ACTION_REQUESTED":
          continueButton = (
            <Button
              className="continue_btn kyc_error"
              onClick={this.showValidationPage}
            >
              KYC ERROR
            </Button>
          );
          msg = (
            <span className="kyc_error_msg">
              {this.state.user.approvalDescription
                ? this.state.user.approvalDescription
                : "Insufficent information"}
            </span>
          );
          break;
        case "BLOCKED":
          continueButton = (
            <Button disabled="true" className="continue_btn">
              BLOCKED
            </Button>
          );
          break;
      }
    }

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
                    {msg}
                  </Col>
                </Row>
                <Row>
                  <Col offset={4} span={16}>
                    {continueButton}
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
                      className="continue_btn signup_btn"
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
  const { login, genToken } = authActionCreators;

  return bindActionCreators(
    {
      login,
      genToken
    },
    dispatch
  );
};

export default connectAuth(mapStateToProps, mapDisptachToProps)(
  SignInContainer
);
