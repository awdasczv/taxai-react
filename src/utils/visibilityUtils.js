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
 * @param {string} conditionStr - 평가할 조건 문자열 (예: "q10301=재건축전 주택")
 * @param {Object} answers - 현재 답변 상태 객체
 * @returns {boolean} 조건 만족 여부
 */
function evaluateCondition(conditionStr, answers) {
  const [questionId, expectedValue] = conditionStr.split('=').map(s => s.trim());
  return answers[questionId] === expectedValue;
}

export { initVisibilityRules, updateVisibleQuestions, evaluateCondition }; 