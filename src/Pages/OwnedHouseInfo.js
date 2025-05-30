import { Row, Col, Form } from 'react-bootstrap';

function OwnedHouseInfo() {
  const inputFields2 = ['주소', 
    '양도 시 부동산 종류', 
    '취득 당시 부동산 종류', 
    '취득 확인', 
    '보유 지분', 
    '양도가액', 
    '취득가액',
  ];

  const inputFields = [
    {label: '주소', type: 'text', placeholder: '주소를 입력해주세요.'},
    {label: '양도 시 부동산 종류', type: 'dropdown', options: ['주택', '오피스텔','조합원 입주권','주택 분양권','오피스텔 분양권',]},
    {label: '취득 당시 부동산 종류', type: 'dropdown', options: ['주택', '재건축전 주택','조합원 입주권','분양권','오피스텔',]},
    {label: '취득 원인', type: 'dropdown',options : ['매매','증여','상속','자가 신축',]},
    {label: '보유 지분', type: 'dropdown'},
    {label: '양도가액', type: 'number'},
    {label: '취득가액', type: 'number'},
  ];
  const dropdownOptions = [1, 2, 3, 4,];

  return (
      <div>
          <h5 className="mb-2">2. 보유주택별 기본정보</h5>
          <p className="text-danger">*양도 예정 주택을 첫번째 주택으로 입력하세요.</p>
          <Form className="mb-4">
            {inputFields.map((label, i) => (
              <Form.Group key={i} className="mb-3">
                <Form.Control placeholder={label} />
              </Form.Group>
            ))}

            <Row className="mb-3">
              <Col>
                <Form.Select>
                  {dropdownOptions.map(v => <option key={v}>{v}</option>)}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select>
                  {dropdownOptions.map(v => <option key={v}>{v}</option>)}
                </Form.Select>
              </Col>
            </Row>
          </Form>
      </div>
  );
}

export default OwnedHouseInfo;