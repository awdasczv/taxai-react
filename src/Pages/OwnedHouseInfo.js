import { Row, Col, Form } from 'react-bootstrap';
import InputLabel from '../components/InputLabel';
import InputForm from '../components/InputForm';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { csvLoader } from '../input_controller/CsvLoader';
import { initUserInput, setVisibleQuestions } from '../store';
import { evaluateCondition } from '../utils/visibilityUtils';

/**
 * 보유주택별 기본정보를 입력받는 페이지 컴포넌트
 * 조건부 질문 표시 로직을 포함하여 동적으로 질문을 렌더링
 */
function OwnedHouseInfo() {
  // Redux store에서 필요한 상태값들을 가져옴
  const answers = useSelector((state) => state.userInput.answers);
  const visibilityRules = useSelector((state) => state.userInput.visibilityRules);
  const visibleQuestions = useSelector((state) => state.userInput.visibleQuestions);
  const questionObj = useSelector((state) => state.userInput.questionObj);

  const dispatch = useDispatch();

  // 컴포넌트 마운트 시 CSV 데이터를 로드하여 초기화
  useEffect(() => {
    const loadCsvs = async () => {
      try {
        const results = await csvLoader();
        dispatch(initUserInput(results));
      } catch (error) {
        console.error('CSV 로딩 중 오류가 발생했습니다:', error);
      }
    };

    loadCsvs();
  }, [dispatch]);

  // 답변이나 가시성 규칙이 변경될 때마다 보여줄 질문들을 다시 계산
  useEffect(() => {
    // 1. 공통 질문들을 먼저 포함
    const commonQuestions = Object.values(questionObj)
      .filter(q => q.category === '공통')
      .map(q => q.qid);
    
    // 2. 조건부 가시성 규칙에 따라 추가 질문들을 찾음
    const conditionalVisible = [];
    
    visibilityRules.forEach((rule) => {
      if (evaluateCondition(rule.condition, answers)) {
        conditionalVisible.push(...rule.show);
      }
    });
  
    // 3. 중복 제거하여 최종 보여줄 질문 목록 생성
    const uniqueVisible = [...new Set([...commonQuestions, ...conditionalVisible])];
    dispatch(setVisibleQuestions(uniqueVisible));
  }, [answers, visibilityRules, questionObj, dispatch]);

  return (
    <div>
      {/* 페이지 제목 및 안내 메시지 */}
      <h5 className="mb-2">2. 보유주택별 기본정보</h5>
      <p className="text-danger">*양도 예정 주택을 첫번째 주택으로 입력하세요.</p>

      {/* 동적 질문 폼 렌더링 */}
      <Form className="mb-4">
        {visibleQuestions.map((questionId, index) => {
          const question = questionObj[questionId];
          
          // 질문 객체가 존재하지 않을 경우 렌더링하지 않음
          if (!question) return null;
          
          return (
            <Row key={index} className="mb-3">
              <Col xs="auto">
                <InputLabel 
                  text={question.label} 
                  required={question.required} 
                />
              </Col>
              <Col>
                <Form.Group className="mb-1">
                  <InputForm 
                    feild={question} 
                    answer={answers[questionId]} 
                  />
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

