import { Form } from "react-bootstrap";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserInput, printUserInput } from '../store';

function TextFeild({label, placeholder,type}) {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();

    return (
        <Form.Group className="mb-1">
            <Form.Control 
            placeholder={placeholder} 
            value={inputValue} 
            style={{fontSize: '0.9rem'}}
            onChange={(e) => {
                if(type==='money') {    
                    const inputNumbers = e.target.value.replace(/\D/g, '');
                    if(!inputNumbers) {
                        setInputValue('')
                        dispatch(updateUserInput({label: label, value: ''}))
                    }else{
                        dispatch(updateUserInput({label: label, value:inputNumbers}))
                        setInputValue(parseInt(inputNumbers, 10).toLocaleString())
                    }
                } else if(type==='percent') {
                    setInputValue(`${e.target.value}%`)
                    dispatch(updateUserInput({label: label, value:e.target.value}))
                }else{
                    setInputValue(e.target.value)
                    dispatch(updateUserInput({label: label, value:e.target.value}))
                }
            }} 
            />
        </Form.Group>
    );
}

export default TextFeild;