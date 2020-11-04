import React from 'react';
import Header from '../GlobalComponents/Header';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/reducers/userReducer';
import BoardsPage from '../BoardsPage';
import { Switch, useHistory } from 'react-router-dom';
import PrivateRoute from '../Auth/privateRoute';
import BoardDetail from '../BoardDetail';
import ProfilePage from './ProfilePage';
const DashBoard = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const history = useHistory();
  const logoutHandler = () => {
    dispatch(logout(user));
  };
  const profileHandler = () => {
    history.push('/dashboard/profile');
  };
  return (
    <div className="w-full">
      <Header name="Sprint Retrospective" username={user.fullName} logoutHandler={logoutHandler} profileHandler={profileHandler} />
      <Switch>
        <PrivateRoute exact path="/dashboard/detail" component={BoardDetail} />
        <PrivateRoute exact path="/dashboard/profile" component={ProfilePage} />
        <PrivateRoute path="/" component={BoardsPage} />
      </Switch>
    </div>
  );
};

export default DashBoard;
