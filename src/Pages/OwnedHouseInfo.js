import {  Row, Col, Form } from "react-bootstrap";

function OwnedHouseInfo() {
    const inputFields = ["주소", "양도 시 부동산 종류", "취득 당시 부동산 종류", "취득 확인", "보유 지분", "양도가액", "취득가액"];
    const dropdownOptions = [1, 2, 3, 4];

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