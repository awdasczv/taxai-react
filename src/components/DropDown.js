import { Form } from "react-bootstrap";
import { useState } from "react";

function DropDown({dropdownOptions, placeholder}) {

  const [selectedOption, setSelectedOption] = useState('');

  const parsedOptions = parseStringToList(dropdownOptions);

  return (
    <Form.Select 
    value={selectedOption}
    style={{fontSize: '0.9rem'}}
     onChange={(e) => setSelectedOption(e.target.value)} >
      <option value="" disabled >{placeholder}</option>
      {parsedOptions.map(e => <option key={e} value={e}>{e}</option>)}
    </Form.Select>
  );
}

function parseStringToList(string) {
  try {
    if (!string) return [];

    // 1. 따옴표 ' → " 로 변경
    // 2. 끝에 붙은 쉼표 제거
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