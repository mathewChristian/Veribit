import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { store } from 'core';
import RoutesContainer from 'containers/RoutesContainer/RoutesContainer';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import PageNotFound from 'components/PageNotFound/PageNotFound';
import SignInContainer from 'containers/SignInContainer/SignInContainer';
import SignUpContainer from 'containers/SignUpContainer/SignUpContainer';

import 'assets/styles/App.less';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="content">
              <Switch>
                <Route path="/signin" exact component={SignInContainer} />
                <Route exact path="/signup" component={SignUpContainer} />
                <Route exact path="/404" component={PageNotFound} />
                <PrivateRoute path="/" component={RoutesContainer} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
