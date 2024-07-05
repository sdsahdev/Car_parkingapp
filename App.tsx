import React from 'react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';

import AppNavigator from './src/Routes/AppNavigator';
import store, {persistor} from './src/Redux/Store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {allColors} from './src/Utils/AllColors';

const App = () => {
  return (
    <SafeAreaProvider>
      {/* <StatusBar
        barStyle="dark-content"
        backgroundColor={allColors.statusBarColor}
      /> */}
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
