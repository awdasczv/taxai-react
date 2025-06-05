import { Row, Col, Form } from 'react-bootstrap';
import InputLabel from '../components/InputLabel';
import InputForm from '../components/InputForm';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CsvLoader from '../input_controller/CsvLoader';
import SetConditionalInput from '../input_controller/SetConditionalInput';

function OwnedHouseInfo() {

  const [inputCommonFeild, setInputCommonFeild] = useState([]);
  const [inputConditionalFeild, setInputConditionalFeild] = useState([]);
  const selectedOptionStore = useSelector(state => state.userInput.value);

  useEffect(() => {
    const loadCsvs = async() => {
      const results = await CsvLoader();
      setInputCommonFeild(results[0].data);
      setInputConditionalFeild(results[1].data);
    }
    loadCsvs();
  }, []);

  return (
    <div>
        <h5 className="mb-2">2. 보유주택별 기본정보</h5>
        <p className="text-danger">*양도 예정 주택을 첫번째 주택으로 입력하세요.</p>

        <Form className="mb-4">
          {inputCommonFeild.map((e, i) => (
            <Row key={i} className="mb-3">
              <Col xs="auto">
                <InputLabel text={e.label} required={e.required} />
              </Col>
              <Col>
                <Form.Group className="mb-1">
                  <InputForm feild={e} />
                </Form.Group>
              </Col>
            </Row>
          ))}

          {inputConditionalFeild.map((e, i) => (
            SetConditionalInput({conditionalFeild: e, selectedOptionStore}) ? 
            <Row key={i} className="mb-3">
              <Col xs="auto">
                <InputLabel text={e.label} required={e.required} />
              </Col>
              <Col>
                <Form.Group className="mb-1">
                  <InputForm feild={e} />
                </Form.Group>
              </Col>
            </Row>
            : null
          ))} 
        </Form>
    </div>
  );

}

export default OwnedHouseInfo;

