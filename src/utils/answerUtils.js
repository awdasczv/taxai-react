/**
 * 질문 배열을 기반으로 답변 객체를 초기화하는 함수
 * @param {Array} array - 질문 데이터 배열
 * @returns {Object} 초기화된 답변 객체 {qid: ''}
 */
const initAnswers = (array) => {
  const answers = array.reduce((acc, item) => {
    acc[item.qid] = '';
    return acc;
  }, {});

  return answers;
};

export { initAnswers }; 