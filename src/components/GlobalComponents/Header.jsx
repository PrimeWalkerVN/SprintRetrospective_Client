import { Dropdown, Menu } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';

const menu = (
  <Menu>
    <Menu.Item>Profile</Menu.Item>
    <Menu.Item>Logout</Menu.Item>
  </Menu>
);

const Header = props => {
  const { name } = props;
  return (
    <header className="flex justify-between items-center bg-blue-600 py-4 px-10">
      <div className="text-white text-lg font-serif">{name}</div>
      <Dropdown
        className="cursor-pointer"
        overlay={menu}
        placement="bottomCenter"
      >
        <Avatar size="default">ABC</Avatar>
      </Dropdown>
    </header>
  );
};

export default Header;
