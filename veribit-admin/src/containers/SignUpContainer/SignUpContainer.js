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
//const client = new MoneyButtonClient(process.env.MONEY_BUTTON_API);
const client = new MoneyButtonClient("58556f8075944af8708f58de0c2b8868");
//const client = new MoneyButtonClient("43b9dd4006833459fcc530c211170add", "932033233cacba1e737ac650e4ed822a");

const { Content, Header } = Layout;

class SignUpContainer extends PureComponent {
  static propTypes = {
    login: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isFocus: false,
      msg: "",
      mbGrant: "",
      haveGrant: false
    };
  }

  async componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    console.log(values);
    client.handleAuthorizationResponse();
    console.log(client);
    const refreshToken = client.getRefreshToken();
    console.log(refreshToken);

    //client.authorizeWithAuthFlowResponse(values, values.state);

    try {
      const { id, name } = await client.getUserIdentity();
      if (!id) {
        throw Error("Error Id is empty!!");
      }
      console.log(`The id is ${id} and the name is ${name}`);
      const profile = await client.getUserProfile(id);
      console.log(profile);
    } catch (error) {
      console.log(error);
    }
  }

  handleEmail = () => {
    this.setState(...this.state, { isFocus: true });
  };

  updateEmailValue = evt => {
    this.setState(
      ...this.state,
      {
        email: evt.target.value
      },
      () => {
        if (validateEmail(this.state.email)) {
          this.setState(...this.state, { isEmailValidate: true });
        } else {
          this.setState(...this.state, { isEmailValidate: false });
        }
      }
    );
  };

  updatePasswordValue = evt => {
    this.setState(...this.state, { password: evt.target.value });
  };

  /* showAdminDashboard = () => {
    if (this.state.email.length !== 0 && validateEmail(this.state.email)) {
      this.setState(...this.state, { isEmailValidate: true });
      promisify(this.props.signUp, {
        email: this.state.email,
        password: this.state.password
      })
        .then(res => {
          if (res.status === 200) this.props.history.push("signin");
          else {
            this.setState(...this.state, { msg: res.msg || "Error occurred!" });
          }
        })
        .catch(e => {
          this.setState(...this.state, { msg: e.msg || "Error occurred!" });
        });
    } else {
      this.setState(...this.state, { isEmailValidate: false });
    }
  };

  back = () => {
    this.props.history.push("signin");
  }; */

  showAdminDashboard = () => {
    promisify(this.props.signUp, {
      mbGrant: this.state.mbGrant
    })
      .then(res => {
        if (res.status === 200) this.props.history.push("signin");
        else {
          this.setState(...this.state, { msg: res.msg || "Error occurred!" });
        }
      })
      .catch(e => {
        this.setState(...this.state, { msg: e.msg || "Error occurred!" });
      });
  };

  back = () => {
    this.props.history.push("signin");
  };

  render() {
    return (
      <div className="block">
        <Layout>
          <Header className="header">
            <div onClick={this.back}>
              <Icon style={{ fontSize: 16 }} type="arrow-left" />{" "}
              <span>BACK</span>
            </div>
          </Header>
          <Layout>
            <Content className="main">
              <Row className="sign_logo_area">
                <Col span={14} offset={5}>
                  <img alt="true" src={logo} className="logo" />
                </Col>
              </Row>
              {/*  <Row className="email_area">
                <Col offset={4} span={16}>
                  {this.state.isFocus ? (
                    <span className="label_name">
                      {this.state.isEmailValidate
                        ? "Email Address"
                        : "Invalid Email"}
                    </span>
                  ) : null}
                  <Input
                    type="email"
                    value={this.state.email}
                    placeholder="Email Address"
                    onClick={this.handleEmail}
                    onChange={this.updateEmailValue}
                  />
                </Col>
              </Row>
              <Row className="password_area">
                <Col offset={4} span={16}>
                  <Input
                    type="password"
                    value={this.state.password}
                    placeholder="Password"
                    onChange={this.updatePasswordValue}
                  />
                </Col>
              </Row>
              <Row className="msg_area">
                <Col offset={5} span={16}>
                  {this.state.msg || ""}
                </Col>
              </Row> */}
              <Row>
                <Col offset={4} span={16}>
                  <Button
                    className="continue_btn signup_btn"
                    onClick={this.showAdminDashboard}
                  >
                    Log In
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

const mapDisptachToProps = dispatch => {
  const { signUp } = authActionCreators;

  return bindActionCreators(
    {
      signUp
    },
    dispatch
  );
};

export default connectAuth(undefined, mapDisptachToProps)(SignUpContainer);
