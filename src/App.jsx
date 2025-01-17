import React, { useEffect, useState } from 'react';
import { createBrowserHistory } from 'history';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NotFound from './components/GlobalComponents/Notfound';
import DashBoard from './components/Dashboard';
import Login from './components/Auth/Login';
import Loading from './components/GlobalComponents/Loading';
import PublicBoardDetail from './components/PublicBoardDetail';
import PrivateRoute from './components/Auth/privateRoute';
import usersApi from './api/usersApi';
import { setUser, setLogged } from './redux/reducers/userReducer';
import PrivateRouteAuth from './components/Auth/privateRouteAuth';
import Register from './components/Auth/Register';
import queryString from 'query-string';

const history = createBrowserHistory();
function App() {
  const isLoading = useSelector(state => state.loading.isLoading);
  const dispatch = useDispatch();
  const query = queryString.parse(history.location.search);
  const [loading, setLoading] = useState(true);
  if (query.token) {
    localStorage.setItem('access_token', query.token);
  }

  const token = localStorage.getItem('access_token');
  useEffect(() => {
    setLoading(true);
    if (token) {
      const checkLogged = async () => {
        try {
          const user = await usersApi.getMe();

          if (user) {
            dispatch(setUser(user));
            dispatch(setLogged(true));
          }
        } catch (e) {
          dispatch(setLogged(false));
        }
        setLoading(false);
      };
      checkLogged();
    } else {
      setLoading(false);
    }
  }, [token, dispatch]);
  return (
    <div className="container max-w-full">
      {loading ? (
        <Loading />
      ) : (
        <Router history={history}>
          <Switch>
            <PrivateRouteAuth path="/login" component={Login} />
            <PrivateRouteAuth path="/register" component={Register} />
            <PrivateRoute path="/public-board/detail/:id" component={PublicBoardDetail} />
            <PrivateRoute path="/dashboard" component={DashBoard} />
            <Redirect exact from="/" to="/dashboard" />
            <Route component={NotFound} />
          </Switch>
        </Router>
      )}
      {isLoading && <Loading />}
    </div>
  );
}

export default App;
