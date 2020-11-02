import React, { useEffect } from 'react';
import { createBrowserHistory } from 'history';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NotFound from './components/Notfound';
import DashBoard from './components/Dashboard';
import Login from './components/Auth/Login';
import Teams from './components/Teams';
import Loading from './components/Loading';
import PrivateRoute from './components/Auth/privateRoute';
import usersApi from './api/usersApi';
import { setUserLogged } from './redux/reducers/userReducer';
import Notification from './components/Notification';
import PrivateRouteAuth from './components/Auth/privateRouteAuth';
import Register from './components/Auth/Register';
import queryString from 'query-string';
const history = createBrowserHistory();
function App() {
  const isLoading = useSelector(state => state.loading.isLoading);
  const dispatch = useDispatch();
  const query = queryString.parse(history.location.search);
  if (query.token) {
    localStorage.setItem('access_token', query.token);
  }
  const token = localStorage.getItem('access_token');
  useEffect(() => {
    if (token) {
      try {
        const checkLogged = async () => {
          const user = await usersApi.getMe();
          if (user) dispatch(setUserLogged(user));
        };
        checkLogged();
      } catch (e) {
        Notification('error', 'Error', e.message);
      }
    }
  }, [token, dispatch]);
  return (
    <div className="container max-w-full">
      {isLoading && <Loading />}
      <Router history={history}>
        <Switch>
          <PrivateRouteAuth path="/login" component={Login} exact />
          <PrivateRouteAuth path="/register" component={Register} exact />
          <Redirect exact from="/" to="/dashboard" />
          <PrivateRoute path="/dashboard" component={DashBoard} />
          <PrivateRoute path="/teams" component={Teams} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
