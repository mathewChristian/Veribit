import { ConnectedRouter } from 'connected-react-router';
import {
  configureStore,
  getHistory,
} from 'src/modules/store';
import React from 'react';
import { Provider, useSelector } from 'react-redux';
import RoutesComponent from 'src/view/shared/routes/RoutesComponent';
import layoutSelectors from 'src/modules/layout/layoutSelectors';

const store = configureStore();

const App = (props) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={getHistory()}>
        <AppInnerComponent />
      </ConnectedRouter>
    </Provider>
  );
};

const AppInnerComponent = (props) => {
  const isDarkMode = useSelector(
    layoutSelectors.selectDarkMode,
  );
  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <RoutesComponent />
    </div>
  );
};

export default App;
