import React from 'react';

const Button = ({ label, onClick, color, width, height, disabled }) => {
  const buttonStyle = {
    backgroundColor: color || 'blue',
    color: 'white',
    padding: '4px 8px',
    border: 'none',
    borderRadius: '5px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    width: width || 'auto',
    height: height || 'auto'
  };

  return (
    <button style={buttonStyle} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
