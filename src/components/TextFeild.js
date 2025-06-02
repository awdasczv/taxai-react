import { Form } from "react-bootstrap";
import { useState } from 'react';


function TextFeild({placeholder,type}) {
    const [inputValue, setInputValue] = useState('');

    return (
        <Form.Group className="mb-1">
            <Form.Control 
            placeholder={placeholder} 
            value={inputValue} 
            onChange={(e) => {
                if(type==='money') {    
                    const inputNumbers = e.target.value.replace(/\D/g, '');
                    if(!inputNumbers) {
                        setInputValue('')
                    }else{
                        setInputValue(parseInt(inputNumbers, 10).toLocaleString())
                    }
                } else if(type==='percent') {
                    setInputValue(`${e.target.value}%`)
                }else{
                    setInputValue(e.target.value)
                }
            }} 
            />
        </Form.Group>
    );
}

export default TextFeild;