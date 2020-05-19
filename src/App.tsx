import React, {Fragment} from 'react';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Products from './Products';

const App = (): JSX.Element => (
  <Fragment>
    <Header />
    {/* <Home /> */}
    <Products />

    <Footer />
  </Fragment>
)

export default App;