import { Row, Col, Form } from 'react-bootstrap';
import InputLabel from '../components/FieldTitle';
import InputForm from '../components/InputForm';

function OwnedHouseInfo() {
//샘플데이터
  const inputFields = [
    {label: '주소', inputMethod: 'text', placeholder: '주소를 입력해주세요.', required: true},
    {label: '양도 시 부동산 종류', inputMethod : 'dropdown', placeholder: '양도 시 부동산 종류를 선택해주세요.', options: ['주택', '오피스텔','조합원 입주권','주택 분양권','오피스텔 분양권',], required: true},
    {label: '취득 당시 부동산 종류', inputMethod: 'dropdown', placeholder: '취득 당시 부동산 종류를 선택해주세요.', options: ['주택', '재건축전 주택','조합원 입주권','분양권','오피스텔',], required: true},
    {label: '취득 원인', inputMethod: 'dropdown', placeholder: '취득 원인을 선택해주세요.', options : ['매매','증여','상속','자가 신축',], required: true},
    {label: '보유 지분', inputMethod: 'dropdown', placeholder: '보유 지분을 선택해주세요.', options: [`50%`,`100%`,`직접입력`], required: true},
    {label: '양도가액', inputMethod: 'money', placeholder: '양도가액을 입력해주세요.', required: true },
    {label: '취득가액', inputMethod: 'money', placeholder: '취득가액을 입력해주세요.', required: true},
    {label: '필요경비', inputMethod: 'money', placeholder: '필요경비를 입력해주세요.', required: true},
    {label: '선순위 상속주택', inputMethod: 'oxChoice'},
  ];


  return (
      <div>
          <h5 className="mb-2">2. 보유주택별 기본정보</h5>
          <p className="text-danger">*양도 예정 주택을 첫번째 주택으로 입력하세요.</p>

          <Form className="mb-4">
            {inputFields.map((e, i) => (
              <Row className="mb-3">
                <Col xs="auto">
                  <InputLabel text={e.label} />
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

