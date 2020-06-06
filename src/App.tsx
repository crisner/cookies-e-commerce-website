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
import BuildABox from './BuildABox';

const App = (): JSX.Element => (
  <Router>
    <Header />
    <Switch>
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