import React from 'react';

const NavBar = props => {
  const { name } = props;
  return (
    <div className="w-full mb-4 bg-gray-100 flex items-center justify-center">
      <div className="text-2xl font-bold">{name}</div>
    </div>
  );
};

export default NavBar;
