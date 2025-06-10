import React from 'react';

/**
 * 입력 필드를 위한 라벨 컴포넌트
 * @param {string} text - 라벨에 표시할 텍스트
 * @param {boolean} required - 필수 입력 여부 (true일 경우 * 표시)
 */
function InputLabel({ text, required }) {
  return (
    <div
      className="
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
      {/* 필수 입력 필드 표시 */}
      {required && <span className="text-danger me-1">*</span>}
      {text}
    </div>
  );
}

export default InputLabel;
