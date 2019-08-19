# Veribit
A Bitcoin SV verification service

*This is currently an early Alpha pre-build and is not production ready.

### Description
This project is a pre-alpha software solution that helps with user verification such as logins, IDs and KYC. Many regulations that bind financial companies in a KYC ("Know Your Customer" / "Know Your Client") process also apply to crytocurrency projects. We have a simple utility that can be plugged into any Bitcoin SV service application or dashboard, subject to those regulations that will help collect the necessary user info for compliance.

### What does it do?
Currently, it's a user registration and login system which allows uploading of face images using the webcam api. There is an admin interface side which can control the submissions. The codebase is in javascript, react and node.js. It uses MongoDB for the database and can be installed quickly using [Docker](https://docker.com/).


### Do I Want This?

While it is an open source, pre-alpha software collaborative project and great learning experience, this early release is targeted only for user ID verification and KYC service to be immutably stored on the Bitcoin SV blockchain. An initial release version will be entirely hosted on-chain in a serverless environment, so this very early code is publically available for collaboration purposes, many with bounty projects attached. To reiterate, this codebase is not production ready. 

### Project Structure

Consists of three components:
* User registration web interface
* Backend server application
* Admin interface


**You will need to clone these 3 repos individually and follow the instructions within each one.**

1. **User registration web interface - **
(https://github.com/Veribit/veribit-fe)   This is a react application that serves as the frontend for user registration. Registration is initiated by a user email and an authentication key sent from the backend of whichever service is connected, then a token to begin registration is returned. A user is then redirected and may upload an identity document, selfie with the identity document, and fill out fields with any required information for an admin to review.

2. **Backend server application - **
(https://github.com/RoyMurphy/veribit-be)   This is the backend, based in nodejs and mongodb. It serves both the admin and end user APIs. It can be customized to fit your application needs, and with a webhook going to the application you are trying to KYC. You can integrate an email provider by registering an account, making the appropriate DNS entries, and pasting in the keys to the application if you would like to send email notifications through this component as well.

3. **Admin interface - **
(https://github.com/RoyMurphy/veribit-admin)  This is the admin panel. It should be configured to aim at the backend, and with an application owner email specified in the configuration.

### Documentation

[**API Docs**](https://github.com/RoyMurphy/Veribit/wiki) - You can view the API documentation in the wiki. Click through the bar on the right to page through the different APIs.

### Contributing

If you see a change, bugfix or other edit to make, please file an issue and open a PR. I'll be happy to review it and get it merged in. Keep an eye out for specific bounty requests that will be listed in the [Issues](https://github.com/RoyMurphy/Veribit/issues) section.

### Usage

Feel free to fork this repo if you intend on helping out with code improvements. The current MIT license maybe subject to change as we move towards a production ready environment to be hosted completely on-chain.