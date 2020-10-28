import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NotFound from './components/Notfound';
import DashBoard from './components/Dashboard';
import Login from './components/Auth/Login';
import Teams from './components/Teams';
import Loading from './components/Loading';
import PrivateRoute from './components/Auth/privateRoute';
const history = createBrowserHistory();
function App() {
  const isLoading = useSelector(state => state.loading.isLoading);
  return (
    <div className="container max-w-full">
      {isLoading && <Loading />}
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} exact />
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
