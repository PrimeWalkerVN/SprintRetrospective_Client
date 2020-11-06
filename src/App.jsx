import React, { useEffect } from 'react';
import { createBrowserHistory } from 'history';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NotFound from './components/GlobalComponents/Notfound';
import DashBoard from './components/Dashboard';
import Login from './components/Auth/Login';
import Loading from './components/GlobalComponents/Loading';
import PrivateRoute from './components/Auth/privateRoute';
import usersApi from './api/usersApi';
import { setUser, setLogged } from './redux/reducers/userReducer';
import PrivateRouteAuth from './components/Auth/privateRouteAuth';
import Register from './components/Auth/Register';
import queryString from 'query-string';
import { setIsLoading } from './redux/reducers/loadingReducer';
const history = createBrowserHistory();
function App() {
  const isLoading = useSelector(state => state.loading.isLoading);
  const dispatch = useDispatch();

  const token = localStorage.getItem('access_token');
  useEffect(() => {
    const query = queryString.parse(history.location.search);
    if (query.token) {
      localStorage.setItem('access_token', query.token);
    }
    if (token) {
      const checkLogged = async () => {
        dispatch(setIsLoading(true));
        try {
          const user = await usersApi.getMe();

          if (user) {
            await dispatch(setUser(user));
            await dispatch(setLogged(true));
          }
        } catch (e) {
          await dispatch(setLogged(false));
          await dispatch(setUser(null));
        }
        dispatch(setIsLoading(false));
      };
      checkLogged();
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
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
