import React from 'react';
import Header from '../GlobalComponents/Header';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/reducers/userReducer';
import BoardsPage from '../BoardsPage';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../Auth/privateRoute';
import BoardDetail from '../BoardDetail';
const DashBoard = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  const logoutHandler = () => {
    dispatch(logout(user));
  };
  return (
    <div className="w-full">
      <Header name="Sprint Retrospective" username={user.fullName} logoutHandler={logoutHandler} />
      <Switch>
        <PrivateRoute exact path="/dashboard/detail" component={BoardDetail} />
        <PrivateRoute path="/" component={BoardsPage} />
      </Switch>
    </div>
  );
};

export default DashBoard;
