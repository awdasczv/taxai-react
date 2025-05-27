import {Row, Col, Form} from "react-bootstrap";
import InputLabel from "../Components/FieldTitle";
import { useState } from "react";

function BasicInfo(){
  
  const houseOptions = [
    { value: '1', label: '1세대 1주택' },
    { value: '2', label: '1세대 2주택' },
    { value: '3', label: '1세대 3주택' },
  ];

  const [selectedHouseOption, setSelectedHouseOption] = useState('');
  
  return(
    <div>
      {/* 1. 기초정보 */}
      <h5 className="mb-3">1. 기초정보 <span className="text-danger">*</span></h5>
      <Form className="mb-4">
        <Row className="mb-3">
          <Col xs="auto">
            <InputLabel text="현재 보유주택 수"  />
          </Col>
          <Col>
            <Form.Select value={selectedHouseOption} onChange={(e) => setSelectedHouseOption(e.target.value)} >
              <option value="" disabled >보유주택 수를 선택하세요</option>
              {houseOptions.map(e => <option key={e.value} >{e.label}</option>)}
            </Form.Select>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs="auto">
            <InputLabel text="양도 예정일"  />
          </Col>
          <Col>
            <Form.Control type="date" />
          </Col>
        </Row>
      </Form>
    </div>  
  )
}

export default BasicInfo;