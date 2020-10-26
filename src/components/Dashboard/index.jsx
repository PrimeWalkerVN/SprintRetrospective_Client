import React from 'react';
import Header from '../GlobalComponents/Header';
import AddBoard from './AddBoard';
import ListBoard from './ListBoard';

const DashBoard = () => {
  return (
    <header className="w-full">
      <Header name="Sprint Retrospective" />
      <div className="w-full pt-12 flex flex-col">
        <div className="text-center text-4xl text-purple-800">MY BOARDS</div>
        <div className="flex flex-row w-full justify-between px-10 pt-10">
          <div style={{ flex: 0.2 }}>
            <AddBoard color="purple" />
          </div>
          <div style={{ flex: 0.8 }} className="flex flex-wrap px-10 w-full">
            <ListBoard />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashBoard;
