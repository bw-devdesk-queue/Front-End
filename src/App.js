import React from "react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import MasterRouter from "./components/MasterRouter";

<<<<<<< HEAD
import { devDeskReducer } from "./reducers/DevDeskReducer";
=======
import { devDeskReducer } from './reducers/DevDeskReducer';
import Header from "./components/Header"
>>>>>>> 8be61df268efc3e62eb372545879436528be4e02

const store = createStore(devDeskReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        
        <Header/>
        <MasterRouter />
      </div>
    </Provider>
  );
}

export default App;
