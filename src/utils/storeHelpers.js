/**
 * Store 관련 헬퍼 함수들
 * Redux store의 userInput slice에서 사용되는 유틸리티 함수들
 */

/**
 * 질문 배열에서 answers 객체 초기화하는 헬퍼 함수
 * @param {Array} questionArray - 질문 객체들의 배열
 * @returns {Object} qid를 키로 하고 빈 문자열을 값으로 하는 answers 객체
 */
export const initAnswersFromQuestions = (questionArray) => {
  return questionArray.reduce((acc, item) => {
    acc[item.qid] = '';
    return acc;
  }, {});
}

/**
 * 질문 배열에서 보이는 질문들의 qid 배열 생성하는 헬퍼 함수
 * @param {Array} questionArray - 질문 객체들의 배열  
 * @returns {Array} qid들의 배열
 */
export const initVisibleQuestionsFromArray = (questionArray) => {
  return questionArray.reduce((acc, item) => {
    acc.push(item.qid);
    return acc;
  }, []);
}

/**
 * 질문 배열을 qid를 키로 하는 객체 맵으로 변환하는 헬퍼 함수
 * @param {Array} questionArray - 질문 객체들의 배열
 * @returns {Object} qid를 키로 하고 질문 객체를 값으로 하는 맵
 */
export const convertQuestionsToObjectMap = (questionArray) => {
  const result = {};
  questionArray.forEach(item => {
    result[item.qid] = item;
  });
  return result;
}

/**
 * 질문 배열에서 label을 키로 하고 qid를 값으로 하는 맵 생성하는 헬퍼 함수
 * @param {Array} questionArray - 질문 객체들의 배열
 * @returns {Object} label을 키로 하고 qid를 값으로 하는 맵
 */
export const createLabelToQidMap = (questionArray) => {
  const result = {};
  questionArray.forEach(item => {
    result[item.label] = item.qid;
  });
  return result;
}

/**
 * 조건부 입력 배열에서 가시성 규칙을 생성하는 헬퍼 함수
 * @param {Array} conditionalInputs - 조건부 질문 객체들의 배열
 * @returns {Array} 조건과 보여줄 질문들을 포함하는 가시성 규칙 배열
 */
export const createVisibilityRules = (conditionalInputs) => {
  const conditionMap = {};

  conditionalInputs.forEach((item) => {
    const conditionStr = item.condition; // 예: "q10301=재건축전 주택"

    // 동일한 조건이 없으면 새로 생성
    if (!conditionMap[conditionStr]) {
      conditionMap[conditionStr] = {
        condition: conditionStr, // 문자열로 저장
        show: []
      };
    }
    // 해당 조건에 보여줄 질문 추가
    conditionMap[conditionStr].show.push(item.qid);
  });
  
  return Object.values(conditionMap);
} 