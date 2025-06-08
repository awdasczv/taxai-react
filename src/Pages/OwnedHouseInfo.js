import { Row, Col, Form } from 'react-bootstrap';
import InputLabel from '../components/InputLabel';
import InputForm from '../components/InputForm';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { csvLoader } from '../input_controller/CsvLoader';
import { initUserInput, setVisibleQuestions, updateAcquisitionRules } from '../store';
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
  const acquisitionData = useSelector((state) => state.userInput.acquisitionData);
  const acquisitionRules = useSelector((state) => state.userInput.acquisitionRules);

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

  // q10201, q10301, q10401 값에 따라 acquisition 데이터 필터링
  useEffect(() => {
    const q10201Value = answers.q10201; // 양도 시 부동산 종류
    const q10301Value = answers.q10301; // 취득 시 부동산 종류 
    const q10401Value = answers.q10401; // 취득 원인

    // 세 값이 모두 있을 때만 필터링 실행
    if (q10201Value && q10301Value && q10401Value && acquisitionData.length > 0) {
      // acquisition 데이터에서 조건에 맞는 항목들 필터링
      const filteredData = acquisitionData.filter(item => 
        item.q10201 === q10201Value && 
        item.q10301 === q10301Value && 
        item.q10401 === q10401Value &&
        item.qid && item.qid.trim() !== '' // qid가 있는 항목만 (빈 행 제외)
      );

      // 2단계: 필터링된 결과에서 질문 목록 추리기
      const acquisitionQuestions = filteredData.map(item => {
        // options 문자열을 배열로 파싱 (예: "['승계분양권','최초당첨 분양권']" -> ['승계분양권','최초당첨 분양권'])
        let parsedOptions = [];
        if (item.options && item.options.trim() !== '') {
          try {
            // 따옴표 처리 및 배열 파싱
            const optionsStr = item.options.replace(/"""/g, '"').replace(/'/g, '"');
            parsedOptions = JSON.parse(optionsStr);
          } catch (error) {
            console.warn(`options 파싱 오류 (${item.qid}):`, item.options, error);
            parsedOptions = [];
          }
        }

        return {
          qid: item.qid,
          label: item.label,
          category: item.category,
          inputMethod: item.inputMethod,
          placeholder: item.placeholder || '',
          options: parsedOptions,
          condition: item.condition || '', // 각 질문의 개별 조건
          required: true, // acquisition 질문들은 기본적으로 required
          // acquisition contract date 정보도 포함 (나중에 사용할 수 있도록)
          acquisitionContractDate: item['acquisition contract date'] || ''
        };
      });

      // 3단계: 질문 목록의 condition을 acquisitionRules에 추가
      dispatch(updateAcquisitionRules(acquisitionQuestions));
      
    } else {
      // 조건이 미충족일 경우 acquisitionRules 초기화
      dispatch(updateAcquisitionRules([]));
    }
  }, [answers.q10201, answers.q10301, answers.q10401, acquisitionData]);

  // 답변이나 가시성 규칙이 변경될 때마다 보여줄 질문들을 다시 계산
  useEffect(() => {
    // 1. 공통 질문들을 먼저 포함
    const commonQuestions = Object.values(questionObj)
      .filter(q => q.category === '공통')
      .map(q => q.qid);
    
    // 2. 조건부 가시성 규칙에 따라 추가 질문들을 찾음 (기존 conditional 규칙)
    const conditionalVisible = [];
    
    visibilityRules.forEach((rule) => {
      if (evaluateCondition(rule.condition, answers)) {
        conditionalVisible.push(...rule.show);
      }
    });

    // 3. acquisition 가시성 규칙에 따라 추가 질문들을 찾음
    const acquisitionVisible = [];
    
    acquisitionRules.forEach((rule) => {
      if (evaluateCondition(rule.condition, answers)) {
        acquisitionVisible.push(...rule.show);
      }
    });
  
    // 4. 중복 제거하여 최종 보여줄 질문 목록 생성
    const uniqueVisible = [...new Set([...commonQuestions, ...conditionalVisible, ...acquisitionVisible])];
    
    // 5. qid순으로 정렬
    const sortedVisible = uniqueVisible.sort();
    
    dispatch(setVisibleQuestions(sortedVisible));
  }, [answers, visibilityRules, acquisitionRules, questionObj, dispatch]);

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

