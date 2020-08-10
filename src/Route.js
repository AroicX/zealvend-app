import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import Login from './Pages/auth/Login';
import Register from './Pages/auth/Register';
import Blank from './Pages/Blank';
import Home from './Pages/Home';
import Wallet from './Pages/Wallet';
import Transaction from './Pages/Transaction';
import Profile from './Pages/Profile';
import Analysis from './Pages/Analysis';

const Routes = () => (
  <Router>
    <Scene key="root">
      <Scene key="blank" component={Blank} hideNavBar={true} initial={true} />

      <Scene key="login" component={Login} hideNavBar={true} />
      <Scene key="register" component={Register} hideNavBar={true} />
      <Scene key="home" component={Home} hideNavBar={true} />
      <Scene
        key="analysis"
        title="Analysis"
        component={Analysis}
        hideNavBar={false}
        back={true}
      />
      <Scene key="wallet" component={Wallet} hideNavBar={true} />
      <Scene key="transaction" component={Transaction} hideNavBar={true} />
      <Scene key="profile" component={Profile} hideNavBar={true} />
    </Scene>
  </Router>
);
export default Routes;
