import { useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setAnswers } from '../store';
import { useEffect } from 'react';  


function OxChoice({label,qid,answer}) {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setInputValue(answer || '');
  }, [answer]);

  return (
    <ButtonGroup className="w-100">
      <Button 
        style={{fontSize: '0.9rem'}}
        className="me-2 rounded-start rounded-end"
        variant={inputValue === 'O' ? 'primary' : 'outline-primary'}
        onClick={() => {
          setInputValue('O')
          dispatch(setAnswers({qid: qid, value: 'O'}))
        }}
      >O</Button>
      <Button
        style={{fontSize: '0.9rem'}}
        className="ms-2 rounded-start rounded-end"
        variant={inputValue === 'X' ? 'danger' : 'outline-danger'}
        onClick={() => {
          setInputValue('X')
          dispatch(setAnswers({qid: qid, value: 'X'}))
        }}
      >X</Button>
    </ButtonGroup>
  );
}

export default OxChoice;