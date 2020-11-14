import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const logged = useSelector(state => state.user.logged);
  const user = useSelector(state => state.user.user);
  const isUser = logged && user;
  return (
    <Route
      {...rest}
      render={props => {
        return isUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              search: `?next=${rest.location.pathname}`
            }}
          ></Redirect>
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;
