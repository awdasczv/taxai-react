import { useState, useEffect } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setAnswers } from '../store';

/**
 * O/X 선택 버튼 컴포넌트
 * @param {string} label - 라벨 텍스트 (현재 사용되지 않음)
 * @param {string} qid - 질문 ID
 * @param {string} answer - 기본 선택값 ('O' 또는 'X')
 */
function OxChoice({ label, qid, answer }) {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  // 외부에서 전달된 answer 값이 변경될 때 inputValue 업데이트
  useEffect(() => {
    setInputValue(answer || '');
  }, [answer]);

  // 선택 변경 핸들러
  const handleSelection = (value) => {
    setInputValue(value);
    dispatch(setAnswers({ qid: qid, value: value }));
  };

  return (
    <ButtonGroup className="w-100">
      <Button
        style={{ fontSize: '0.9rem' }}
        className="me-2 rounded-start rounded-end"
        variant={inputValue === 'O' ? 'primary' : 'outline-primary'}
        onClick={() => handleSelection('O')}
      >
        O
      </Button>
      <Button
        style={{ fontSize: '0.9rem' }}
        className="ms-2 rounded-start rounded-end"
        variant={inputValue === 'X' ? 'danger' : 'outline-danger'}
        onClick={() => handleSelection('X')}
      >
        X
      </Button>
    </ButtonGroup>
  );
}

export default OxChoice;