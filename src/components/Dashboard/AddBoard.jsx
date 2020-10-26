import React from 'react';

const AddBoard = props => {
  const { color } = props;
  const colorBorder = `border-${color}-700 `;
  const colorBg = `bg-${color}-700 `;
  const colorText = `text-${color}-700 `;
  return (
    <div
      className={
        colorBorder +
        'w-64 border-dashed border-2 flex flex-col items-center justify-center h-48'
      }
    >
      <button
        className={
          colorBg + 'rounded-full text-white text-2xl h-16 w-16 cursor-pointer'
        }
      >
        +
      </button>
      <div className={colorText + 'text-lg'}>Add board</div>
    </div>
  );
};

export default AddBoard;
