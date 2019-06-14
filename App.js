import React, { Component } from "react"
import { Provider } from "react-redux"
import Navigation from "./src/config/routes"
import { store, persistor} from "./src/config/store"
import { Root } from "native-base"
import { PersistGate } from 'redux-persist/integration/react'

const App = () =>
  <Root>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  </Root>; 

export default App;