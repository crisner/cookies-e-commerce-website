import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from './store';
import { isAuthenticated } from './store/auth/actions';
import Header from './Header';
import Footer from './Footer';
import Home from './main/Home';
import Products from './products/Products';
import BuildABox from './buildABox/BuildABox';
import Contact from './Contact';
import SignIn from './user-authentication/SignIn';
import SignUp from './user-authentication/SignUp';
import UserProfile from './user/Profile';
import UserProfileEdit from './user/EditProfile';
import Cart from './cart/Cart';
import NotFound from './NotFound';
import './stylesheet/main.css';

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const authenticationStatus = useSelector((state: AppState) => state.auth.isAuthenticated);
  
  useEffect(() => {
    dispatch(isAuthenticated());
  }, [])

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/editprofile">
          <UserProfileEdit />
        </Route>
        <Route path="/profile">
          <UserProfile />
        </Route>
        <Route path="/auth/signup">
          <SignUp />
        </Route>
        <Route path="/auth/login">
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
        <Route path="/" exact>
          <Home />
        </Route>
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  )
}


export default App;