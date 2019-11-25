import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connectAuth, authActionCreators } from "core";
import { promisify } from "../../utilities";
import { validateEmail } from "../../services/common";
import queryString from "query-string";
import Loader from '../../components/Loader/Loader';

const { MoneyButtonClient } = require("@moneybutton/api-client");
const client = new MoneyButtonClient("58556f8075944af8708f58de0c2b8868");

class mbOauthContainer extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isEmailValidate: true,
            haveGrant: false,
            userId: "",
            email: ""
        };
    }

    async componentDidMount() {
        const { code } = queryString.parse(this.props.location.search);
        if (code) {
            try {
                this.setState(...this.state, { haveGrant: true });
                await this.handleMoneyButtonResponse();
                await this.ShowSignIn();
            } catch (error) {
                this.setState(...this.state, { msg: error });
            }
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

    async ShowSignIn() {
        if (this.state.userId && this.state.email && this.state.haveGrant && this.state.isEmailValidate) {
            //set the state for userid and email 
            let mbUser = {
                userId: this.state.userId,
                email: this.state.email
            };

            promisify(this.props.getMbUser, {
                //mbUser: mbUser
                userId: this.state.userId,
                email: this.state.email
            })
                //.then(localStorage.setItem())
                .then(this.props.history.push("/signin"))
        }
    }

    moneyButtonLoginGrant = () => {
        client.requestAuthorization(
            "auth.user_identity:read users.profiles:read",
            "http://localhost:3006/mbOauth"
        );
    };

    render() {
        return (<Loader />);
    }
}

const mapDisptachToProps = (dispatch) => {
    const {
        getMbUser
    } = authActionCreators;

    return bindActionCreators({
        getMbUser
    }, dispatch);
}

export default connectAuth(undefined, mapDisptachToProps)(mbOauthContainer);