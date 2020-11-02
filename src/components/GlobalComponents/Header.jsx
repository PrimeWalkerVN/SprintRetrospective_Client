import { Dropdown, Menu } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';

const Header = props => {
  const { name, username, logoutHandler } = props;
  const menu = (
    <Menu>
      <Menu.Item>Profile</Menu.Item>
      <Menu.Item onClick={logoutHandler}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <header className="flex justify-between items-center bg-blue-600 py-4 px-10">
      <div className="text-white text-lg font-serif">{name}</div>
      <Dropdown className="cursor-pointer" overlay={menu} placement="bottomCenter">
        <div className="flex items-center">
          <span className="text-xl font-bold text-white mr-4">{username}</span>
          <Avatar size="default">ABC</Avatar>
        </div>
      </Dropdown>
    </header>
  );
};

export default Header;
