import React from 'react';

function InputLabel({text}) {
  return (
    <div className="d-flex align-items-center justify-content-start px-3 py-2 bg-primary-subtle text-primary fw-bold rounded-start rounded-end">
      {<span className="text-danger me-1">*</span>}
      {text}
    </div>
  );
}
export default InputLabel;
