import { Row, Col, Form } from 'react-bootstrap';
import InputLabel from '../components/InputLabel';
import { useState } from 'react';

/**
 * 기초정보 입력 컴포넌트
 * 사용자의 보유주택 수와 양도 예정일을 입력받는 폼
 */
function BasicInfo() {
  
  // 보유주택 수 선택 옵션 정의
  const houseOptions = [
    { value: '1', label: '1세대 1주택' },
    { value: '2', label: '1세대 2주택' },
    { value: '3', label: '1세대 3주택' },
  ];

  // 선택된 보유주택 수 상태 관리
  const [selectedHouseOption, setSelectedHouseOption] = useState('');
  
  return (
    <div>
      {/* 기초정보 섹션 제목 */}
      <h5 className="mb-3">1. 기초정보 <span className="text-danger">*</span></h5>
      
      {/* 기초정보 입력 폼 */}
      <Form className="mb-4">

        {/* 보유주택 수 선택 필드 */}
        <Row className="mb-3">
          <Col xs="auto">
            <InputLabel text="현재 보유주택 수" />
          </Col>
          <Col>
            <Form.Select 
              style={{fontSize: '0.9rem'}} 
              value={selectedHouseOption} 
              onChange={(e) => setSelectedHouseOption(e.target.value)}
            >
              <option value="" disabled>보유주택 수를 선택하세요</option>
              {houseOptions.map(e => (
                <option key={e.value} value={e.value}>
                  {e.label}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        
        {/* 양도 예정일 입력 필드 */}
        <Row className="mb-3">
          <Col xs="auto">
            <InputLabel text="양도 예정일" />
          </Col>
          <Col>
            <Form.Control type="date" style={{fontSize: '0.9rem'}} />
          </Col>
        </Row>
        
      </Form>
    </div>  
  );
}

export default BasicInfo;