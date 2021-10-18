import './wdyr';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import MainPromo from './containers/MainPromo/MainPromo';
import Spinner from './components/UI/Spinner/Spinner';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';
import { AsyncArticle, AsyncMenSection, AsyncWomenSection, AsyncSearchResults, AsyncFavorite, AsyncMyBasket } from './store/asyncComponents/asyncComponents';

const App = (props) => {
  const { checkAuthState } = props;
  useEffect(() => {
    checkAuthState();
  }, [checkAuthState]);

  let routes = (
    <Switch>
      <Route path='/men' render={props => <AsyncMenSection {...props} />} />
      <Route path='/women' render={props => <AsyncWomenSection {...props} />} />
      <Route path='/spinner' component={Spinner} />
      <Route path='/article/:id' render={props => <AsyncArticle {...props} />} />
      <Route path='/search/:query' render={props => <AsyncSearchResults {...props} />} />
      <Route path='/favorites' render={props => <AsyncFavorite {...props} />} />
      <Route path='/basket' render={props => <AsyncMyBasket {...props} />} />
      <Route path='/' component={MainPromo} />
      <Redirect to='/'></Redirect>
    </Switch>
  )
  return (
    <BrowserRouter>
      <Layout />
      {routes}
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuthState: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
