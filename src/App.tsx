import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Home from './main/Home';
import Products from './products/Products';
import BuildABox from './buildABox/BuildABox';
import Contact from './Contact';
import SignIn from './user-authentication/SignIn';
import SignUp from './user-authentication/SignUp';
import Cart from './cart/Cart'

const App = (): JSX.Element => (
  <Router>
    <Header />
    <Switch>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route path="/cart">
        <Cart />
      </Route>
      <Route path="/contact">
        <Contact/> 
      </Route>
      <Route path="/build-a-box">
        <div className="build-a-box-page">
          <Products box={false} />
          <BuildABox />
        </div>
      </Route>
      <Route path="/cookies">
        <Products box={true} />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
    <Footer />
  </Router>
)

export default App;