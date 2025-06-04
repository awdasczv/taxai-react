import React from 'react';

function InputLabel({text, required}) {
  return (
    <div className="
      d-flex 
      align-items-center 
      justify-content-center 
      px-3 
      py-2 
      bg-primary-subtle 
      text-primary 
      fw-bold 
      rounded-start 
      rounded-end"
      style={{
        fontSize: '0.9rem',
        width: '200px',
        minWidth: '200px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}
    >
      {required && <span className="text-danger me-1">*</span>}
      {text}
    </div>
  );
}
export default InputLabel;
