import React from 'react';

const Button = ({ label, onClick, color, width, height }) => {
  const buttonStyle = {
    backgroundColor: color || 'blue', // You can specify a default color or pass a color prop
    color: 'white',
    padding: '4px 8px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: width || 'auto',
    height: height || 'auto'
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
