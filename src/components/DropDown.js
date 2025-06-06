import { Form } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setAnswers } from '../store';

/**
 * 드롭다운 선택 컴포넌트
 * @param {string} label - 라벨 텍스트 (현재 사용되지 않음)
 * @param {string} dropdownOptions - 드롭다운 옵션들 (JSON 문자열 형태)
 * @param {string} placeholder - 플레이스홀더 텍스트
 * @param {string} qid - 질문 ID
 * @param {string} answer - 기본 선택값
 */
function DropDown({ label, dropdownOptions, placeholder, qid, answer }) {
  const [selectedOption, setSelectedOption] = useState('');
  const dispatch = useDispatch();

  // 드롭다운 옵션 문자열을 배열로 파싱
  const parsedOptions = parseStringToList(dropdownOptions);

  // 선택 변경 핸들러
  const handleSelectionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    dispatch(setAnswers({ qid: qid, value: selectedValue }));
  };

  return (
    <Form.Select
      value={answer ? answer : selectedOption}
      style={{ fontSize: '0.9rem' }}
      onChange={handleSelectionChange}
    >
      <option value="" disabled>{placeholder}</option>
      {parsedOptions.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </Form.Select>
  );
}

/**
 * 문자열을 배열로 파싱하는 유틸리티 함수
 * JSON 형태의 문자열을 JavaScript 배열로 변환
 * @param {string} string - 파싱할 문자열
 * @returns {Array} 파싱된 배열, 실패시 빈 배열
 */
function parseStringToList(string) {
  try {
    if (!string) return [];

    // 작은따옴표를 큰따옴표로 변경하고 마지막 쉼표 제거
    const cleaned = string
      .replace(/'/g, '"')      // 작은따옴표 → 큰따옴표
      .replace(/,\s*]$/, ']'); // 마지막 쉼표 제거

    return JSON.parse(cleaned);
  } catch (e) {
    console.error('파싱 실패:', e);
    return [];
  }
}

export default DropDown;