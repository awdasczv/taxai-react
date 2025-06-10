import { setVisibleQuestions } from '../store';

/**
 * 조건부 입력에 대한 가시성 규칙을 초기화하는 함수
 * @param {Array} conditionalInputs - 조건부 입력 데이터 배열
 * @returns {Array} 가시성 규칙 배열
 */
function initVisibilityRules(conditionalInputs) {
  const conditionMap = {};

  conditionalInputs.forEach((item) => {
    const conditionStr = item.condition; // 예: "q10301=재건축전 주택"

    // 같은 조건에 대해 여러 질문이 연결될 수 있으므로 그룹화
    if (!conditionMap[conditionStr]) {
      conditionMap[conditionStr] = {
        condition: conditionStr,
        show: []
      };
    }

    conditionMap[conditionStr].show.push(item.qid);
  });

  return Object.values(conditionMap);
}

/**
 * 현재 답변 상태에 따라 표시되어야 하는 질문들을 업데이트하는 함수
 * @param {Object} answers - 현재 답변 상태 객체
 * @param {Array} visibilityRules - 가시성 규칙 배열
 * @param {Function} dispatch - Redux 디스패치 함수
 */
function updateVisibleQuestions(answers, visibilityRules, dispatch) {
  const newVisible = new Set();

  // 각 가시성 규칙을 확인하여 조건이 만족되는 질문들을 찾음
  visibilityRules.forEach(rule => {
    if (evaluateCondition(rule.condition, answers)) {
      rule.show.forEach(qid => newVisible.add(qid));
    }
  });

  // 상태 업데이트
  dispatch(setVisibleQuestions([...newVisible]));
}

/**
 * 조건 문자열을 평가하는 함수
 * @param {string} conditionStr - 평가할 조건 문자열 
 *   예: "q10301=재건축전 주택", "q10002-q10551<730", "q10501=승계분양권&q10002-q10504<730", "always"
 * @param {Object} answers - 현재 답변 상태 객체
 * @returns {boolean} 조건 만족 여부
 */
function evaluateCondition(conditionStr, answers) {
  // 빈 문자열이거나 'true', 'always'인 경우 항상 참
  if (!conditionStr || conditionStr.trim() === '' || conditionStr.trim() === 'true' || conditionStr.trim() === 'always') {
    return true;
  }

  // AND 조건 처리 (& 연산자로 연결된 조건들)
  if (conditionStr.includes('&')) {
    const conditions = conditionStr.split('&').map(s => s.trim());
    // 모든 조건이 true여야 최종 true 반환
    // 재귀 함수
    return conditions.every(condition => evaluateCondition(condition, answers));
  }
  
  // 등호 조건 처리 (qid=value)
  if (conditionStr.includes('=')) {
    const [questionId, expectedValue] = conditionStr.split('=').map(s => s.trim());
    return answers[questionId] === expectedValue;
  }
  
  // 날짜 범위 조건 처리 (qid1-qid2<days)
  if (conditionStr.includes('-') && conditionStr.includes('<')) {
    try {
      // q10002-q10551<730 형태 파싱
      const parts = conditionStr.split('<');
      const threshold = parseInt(parts[1].trim());
      const [qid1, qid2] = parts[0].split('-').map(s => s.trim());
      
      const date1 = answers[qid1];
      const date2 = answers[qid2];
      
      // 날짜 값이 없으면 false 반환
      if (!date1 || !date2) return false;
      
      // 날짜 문자열을 Date 객체로 변환
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      
      // 유효한 날짜인지 확인
      if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return false;
      
      // 날짜 차이를 일 단위로 계산 (d1 - d2)
      const diffTime = d1.getTime() - d2.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      
      // -threshold 이상 threshold 이하면 true
      return diffDays >= -threshold && diffDays <= threshold;
    } catch (error) {
      console.error('날짜 조건 평가 오류:', error);
      return false;
    }
  }
  
  return false;
}

export { initVisibilityRules, updateVisibleQuestions, evaluateCondition }; 