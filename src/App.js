import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import OrderReview from './components/OrderReview/OrderReview';
import LogIn from './components/LogIn/LogIn';
import Shop from './components/Shop/Shop';
import Shipment from './components/Shipment/Shipment';
import { UseContext } from './components/LogIn/Context';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


function App() {
  const [logInUser, setLogInUser] = useState({})

  return (
    <UseContext.Provider value={[logInUser, setLogInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <OrderReview></OrderReview>
          </Route>
          <Route path="/inventory">
            <Inventory></Inventory>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/LogIn">
            <LogIn></LogIn>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>

    </UseContext.Provider>
  );
}

export default App;
