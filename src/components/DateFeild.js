import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserInput, setAnswers } from '../store';

function DateFeild({label,qid,answer}) {
  const [transferDate, setTransferDate] = useState('');
  const dispatch = useDispatch();
  return (
    <Form.Control 
    type="date" 
    style={{fontSize: '0.9rem'}} 
    value={answer? answer:transferDate}
    onChange={(e) => {
        setTransferDate(e.target.value)
        console.log(e.target.value)
        dispatch(setAnswers({qid: qid, value: e.target.value}))
    }}
    />
  )
  
}

export default DateFeild;