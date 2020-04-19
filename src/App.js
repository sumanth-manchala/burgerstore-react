import React, { useEffect, Suspense} from 'react';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
})

const App = props => {

  useEffect(() => {
    props.authCheckState();
  }, []);

  let routes = (
    <Switch>
        <Route path="/auth" render={() => <Auth />}/>
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
    </Switch>
  );
  if(props.isAuth) {
    routes = (
      <Switch>
          <Route path="/checkout" render={() => <Checkout/>} />
          <Route path="/orders" render={() => <Orders/>} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" render={() => <Auth/> } />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" /> 
      </Switch>
    );
  }
  return(
    <div>
        <Layout>
          <Suspense fallback={<p>Loading.....</p>}>{routes}</Suspense>
        </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token != null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    authCheckState: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);