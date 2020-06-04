import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Products from './Products';

const App = (): JSX.Element => (
  <Router>
    <Header />
    <Switch>
      <Route path="/build-a-box">
        <Products box={true} />
      </Route>
      <Route path="/cookies">
        <Products box={false} />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
    <Footer />
  </Router>
)

export default App;