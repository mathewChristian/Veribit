import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Icon, Row, Col, Button, Input, Layout } from "antd";
import { connectAuth, authActionCreators } from "core";
import { promisify } from "../../utilities";
import { validateEmail } from "../../services/common";
import logo from "assets/img/logo.png";
import { store } from 'core';

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
      isEmailValidate: true,
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

  moneyButtonLoginGrant = () => {
    client.requestAuthorization(
      "auth.user_identity:read users.profiles:read",
      "http://localhost:3006/mbOauth"
    );
  };

  async componentDidMount() {
    this.unsubscribeStore = store.subscribe(this.updateStateFromStore);

    let token = this.props.match.params.token;
    if (token) {
      promisify(this.props.login, { token: token })
        .then(user => {
          this.setState(...this.state, { user: user });
        })
        .catch(e => console.log(e));
    }

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
    console.log(!this.state.user.approvalStatus)

    if (this.state.email.length !== 0 && validateEmail(this.state.email) && !this.state.user.approvalStatus) {
      this.setState(...this.state, { isEmailValidate: true });
      promisify(this.props.genToken, {
        email: this.state.email
      })
        .then(user => {
          if (user.token) {
            promisify(this.props.login, { token: user.token })
              .then(user => {
                promisify(this.props.clearMbUser, { userId: this.state.userId, email: this.state.email })
                this.setState(...this.state, { user: user });
                if (user.approvalStatus === "NO_SUBMISSION_YET") {

                  this.props.history.push("/validation");
                }
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

  async showValidationPage() {
    await this.login();
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
  const { login, genToken, clearMbUser } = authActionCreators;


  return bindActionCreators(
    {
      login,
      genToken,
      clearMbUser
    },
    dispatch
  );
};

export default connectAuth(mapStateToProps, mapDisptachToProps)(
  SignInContainer
);