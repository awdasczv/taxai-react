import { Form } from "react-bootstrap";
import { useState } from 'react';

function TextFeild({placeholder,onlydigits}) {
    const [inputValue, setInputValue] = useState('');

    // console.log(`placeholder: ${placeholder}, onlydigits: ${onlydigits}`);

    return (
        <Form.Group className="mb-1">
            <Form.Control 
            placeholder={placeholder} 
            value={inputValue} 
            onChange={(e) => {
                if(onlydigits) {    
                    const inputNumbers = e.target.value.replace(/\D/g, '');
                    setInputValue(inputNumbers)
                } else {
                    setInputValue(e.target.value)
                }
            }} 
            />
        </Form.Group>
    );
}

export default TextFeild;