import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'

import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';
import SignInWithGoogle from './components/SignInWithGoogle'
import { Provider } from 'react-redux';
import store from './Store/Store'

import * as ROUTES from './constants/routes';

const App = () => (
  <Router>
    <Provider store={store}>
      <div>

        <Switch>
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
        </Switch>
      </div>
    </Provider>
  </Router>
);

export default App;
