import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import NotFound from './components/Notfound';
import DashBoard from './components/Dashboard';
import Login from './components/Auth/Login';
import Teams from './components/Teams';
const history = createBrowserHistory();
function App() {
  return (
    <div className="container max-w-full">
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} exact />
          <Redirect exact from="/" to="/dashboard" />
          <Route path="/dashboard" component={DashBoard} />
          <Route path="/teams" component={Teams} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
