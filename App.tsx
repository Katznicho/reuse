import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store/dev';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppContent from './src/AppContext';


const App = () => {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
           <AppContent/>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>

  )
}

export default App

