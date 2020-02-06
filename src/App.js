import React from "react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import MasterRouter from "./components/MasterRouter";

import { devDeskReducer } from "./reducers/DevDeskReducer";

const store = createStore(devDeskReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>This is our app</h1>
        <MasterRouter />
      </div>
    </Provider>
  );
}

export default App;
