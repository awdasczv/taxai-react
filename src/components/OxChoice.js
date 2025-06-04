import { useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

function OxChoice() {
    const [inputValue, setInputValue] = useState('O');

    return (
    <ButtonGroup className="w-100">
        <Button 
            style={{fontSize: '0.9rem'}}
            className="me-2 rounded-start rounded-end"
            variant={inputValue === 'O' ? 'primary' : 'outline-primary'}
            onClick={() => setInputValue('O')}
            >
            O
        </Button>
        <Button
            style={{fontSize: '0.9rem'}}
            className="ms-2 rounded-start rounded-end"
            variant={inputValue === 'X' ? 'danger' : 'outline-danger'}
            onClick={() => setInputValue('X')}
            >
            X
        </Button>
    </ButtonGroup>
      );
}

export default OxChoice;