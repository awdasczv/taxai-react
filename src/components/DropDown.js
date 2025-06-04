import { Form } from "react-bootstrap";
import { useState } from "react";

function DropDown({dropdownOptions = [], placeholder}) {

  const [selectedOption, setSelectedOption] = useState('');

  return (
    <Form.Select 
    value={selectedOption}
    style={{fontSize: '0.9rem'}}
     onChange={(e) => setSelectedOption(e.target.value)} >
      <option value="" disabled >{placeholder}</option>
      {dropdownOptions.map(e => <option key={e} value={e}>{e}</option>)}
    </Form.Select>
  );
}

export default DropDown;