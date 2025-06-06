import { Row, Col, Form } from 'react-bootstrap';
import InputLabel from '../components/InputLabel';
import InputForm from '../components/InputForm';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { csvLoader, evaluateCondition } from '../input_controller/CsvLoader';
import { useDispatch } from 'react-redux';
import { initUserInput, setVisibleQuestions } from '../store';

function OwnedHouseInfo() {

  const answers = useSelector((state) => state.userInput.answers);
  const visibilityRules = useSelector((state) => state.userInput.visibilityRules);
  const visibleQuestions = useSelector((state) => state.userInput.visibleQuestions);
  const questionObj = useSelector((state) => state.userInput.questionObj);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadCsvs = async() => {
      const results = await csvLoader();
      dispatch(initUserInput(results));
    }

    loadCsvs();
  },[]);

  useEffect(() => {
    // 공통 질문들을 먼저 포함
    const commonQuestions = Object.values(questionObj)
      .filter(q => q.category === '공통')
      .map(q => q.qid);
    
    const conditionalVisible = [];

    visibilityRules.forEach((rule) => {
      if (evaluateCondition(rule.condition, answers)) {
        conditionalVisible.push(...rule.show);
      }
    });
  
    const uniqueVisible = [...new Set([...commonQuestions, ...conditionalVisible])];
    dispatch(setVisibleQuestions(uniqueVisible));
  }, [answers, visibilityRules, questionObj, dispatch]);

  return (
    <div>
        <h5 className="mb-2">2. 보유주택별 기본정보</h5>
        <p className="text-danger">*양도 예정 주택을 첫번째 주택으로 입력하세요.</p>

        <Form className="mb-4">
          {visibleQuestions.map((e, i) => {
            // console.log(`Question ID: ${e}, Answer: ${answers[e]}, Available answers keys:`, Object.keys(answers));
            return (
              <Row key={i} className="mb-3">
                <Col xs="auto">
                  <InputLabel text={questionObj[e]?.label} required={questionObj[e]?.required} />
                </Col>
                <Col>
                  <Form.Group className="mb-1">
                    <InputForm feild={questionObj[e]} answer={answers[e]} />
                  </Form.Group>
                </Col>
              </Row>
            );
          })}
        </Form>
    </div>
  );

}

export default OwnedHouseInfo;

