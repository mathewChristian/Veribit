# Project Description

This project is to process KYC requests via a 'User' token exchange

Users can upload their passport and ID card image from their local PC or by taking a photo using web camera so that Admin can check it. The front-end is built in React and uses a Redux Saga design pattern. The 'components' folder contain the Actions and the 'containers' folder contain the UI elements. The Redux Saga design pattern is designed for very lightwieght logical expression, rapid prototyping and deployment of microservices.

Standard expressions look something like this:

    * ```{service_name}_{microservice}_{status}```  

So let’s say:

    * ```fetchSomeData_events```  This will start the saga.
    * ```fetchSomeData_events_start```  This action is dispatched by the service as soon as it starts.
    * ```fetchSomeData_events_success```  This action is dispatched by the service when it finishes.
    * ```fetchSomeData_events_error```  This action is dispatched if there is an error during the process.

Users recieve the KYC status from the admin service

# How to run a project
It's quite simple to run a project

First, You should install NodeJS on your local environment

1. Install dependencies

    * ```npm install```

2. Run project

    * ```npm start```

3. You will also need to create a configuration file for the environment you are using. You can either create a development.js file manually in the config directory, or copy config/example.js to config/development.js and edit it appropriately.    

# Project Structure

### src
*   assets
    * img
    * styles
*   components
    * DocumentSelect
    * DropdownSelect
    * List
    * PrivateRoute
    * UploadDocument
*   containers
    * MatchContainer
    * RoutesContainer
    * SigninContainer
    * TakePhotoContainer
    * UploadDocContainer
    * UploadSelfieContainer
    * ValidationContainer
*   core
    * modules
    * store
    * index.js
*   services
    * common.js
    * constant.js
    * index.js
    * localStorage.js
    * restService.js
*   utilities
    * index.js
    * promisify.js
*   App.test.js
*   config.js
*   index.js
*   registerServiceWorker.js

Core includes redux structure(redux store, redux saga)

# Configuration
### How to config .env file

```
    REACT_APP_NODE_PTH=src/
    NODE_PATH=src/
```
### API Endpoint
you can change api endpoint in services/constants.js
```
    export const apiEndpoint = 'YOUR API ENDPOINT';
```
