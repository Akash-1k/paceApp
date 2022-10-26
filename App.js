import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import LoadingView from './src/common/CLoader';

import {StripeProvider} from '@stripe/stripe-react-native';
import Config from './src/constants/Config';
import Navigation from './src/Navigation';
import configureStore from './src/redux/configureStore';

const {store, persistor} = configureStore();

class App extends Component {
  constructor() {
    super();
  }

  // componentDidMount() {
  //   initStripe({
  //     publishableKey: Config.Strip_PK,
  //     merchantIdentifier: 'merchant.com.stripe.react.native.paceapp1'
  //   })
  // }

  render() {
    return (
      <StripeProvider
        publishableKey={Config.Strip_PK}
        merchantIdentifier="merchant.com.stripe.react.native.app.pace"
        threeDSecureParams={{
          backgroundColor: '#FFF',
          timeout: 5,
        }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navigation />
            <LoadingView />
          </PersistGate>
        </Provider>
      </StripeProvider>
    );
  }
}

export default App;
