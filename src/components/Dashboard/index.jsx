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
  const redirectHomeHandler = () => {
    history.push('/dashboard');
  };
  return (
    <div className="w-full">
      <Header
        redirectHomeHandler={redirectHomeHandler}
        name="Sprint Retrospective"
        username={user.fullName}
        logoutHandler={logoutHandler}
        profileHandler={profileHandler}
      />
      <Switch>
        <PrivateRoute path="/dashboard/detail" component={BoardDetail} />
        <PrivateRoute path="/dashboard/profile" component={ProfilePage} />
        <PrivateRoute path="/" component={BoardsPage} />
      </Switch>
    </div>
  );
};

export default DashBoard;
