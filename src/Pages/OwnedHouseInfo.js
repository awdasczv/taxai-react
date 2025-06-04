import { Row, Col, Form } from 'react-bootstrap';
import InputLabel from '../components/InputLabel';
import InputForm from '../components/InputForm';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';

function OwnedHouseInfo() {

  const [inputCommonFeild, setInputCommonFeild] = useState([]);

  useEffect(() => {
    fetch('/csv/input-controller-common.csv')
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: function (results) {
            setInputCommonFeild(results.data);
            console.log(results.data);
          }
        });
      });
  }, []);

  return (
    <div>
        <h5 className="mb-2">2. 보유주택별 기본정보</h5>
        <p className="text-danger">*양도 예정 주택을 첫번째 주택으로 입력하세요.</p>

        <Form className="mb-4">
          {inputCommonFeild.map((e, i) => (
            <Row className="mb-3">
              <Col xs="auto">
                <InputLabel text={e.label} required={e.required} />
              </Col>
              <Col>
                <Form.Group key={i} className="mb-1">
                  <InputForm feild={e} key={i} />
                </Form.Group>
              </Col>
            </Row>
          ))}
        </Form>
    </div>
  );

}

export default OwnedHouseInfo;

