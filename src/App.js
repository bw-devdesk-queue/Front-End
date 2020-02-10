import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import MasterRouter from './components/MasterRouter';

import { devDeskReducer } from './reducers/DevDeskReducer';
import Header from "./components/Header"

const store  = createStore(devDeskReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        
        <Header />
        <MasterRouter />
      </div>
    </Provider>
  );
}

export default App;
