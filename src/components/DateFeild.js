import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAnswers } from '../store';

/**
 * 날짜 입력 컴포넌트
 * @param {string} label - 라벨 텍스트 (현재 사용되지 않음)
 * @param {string} qid - 질문 ID
 * @param {string} answer - 기본 날짜값
 */
function DateFeild({ label, qid, answer }) {
  const [transferDate, setTransferDate] = useState('');
  const dispatch = useDispatch();

  // 날짜 변경 핸들러
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setTransferDate(newDate);
    dispatch(setAnswers({ qid: qid, value: newDate }));
  };

  return (
    <Form.Control
      type="date"
      style={{ fontSize: '0.9rem' }}
      value={answer ? answer : transferDate}
      onChange={handleDateChange}
    />
  );
}

export default DateFeild;