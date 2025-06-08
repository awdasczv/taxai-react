/**
 * acquisition 데이터 필터링 함수
 * @param {Array} acquisitionData - 원본 acquisition 데이터
 * @param {string} q10201Value - 양도 시 부동산 종류
 * @param {string} q10301Value - 취득 시 부동산 종류
 * @param {string} q10401Value - 취득 원인
 * @returns {Array} 필터링된 데이터 배열
 */
export function filterAcquisitionData(acquisitionData, q10201Value, q10301Value, q10401Value) {
  return acquisitionData.filter(item => 
    item.q10201 === q10201Value && 
    item.q10301 === q10301Value && 
    item.q10401 === q10401Value &&
    item.qid && item.qid.trim() !== '' // qid가 있는 항목만 (빈 행 제외)
  );
}

/**
 * options 문자열을 JavaScript 배열로 파싱하는 함수
 * @param {string} optionsStr - 파싱할 options 문자열
 * @param {string} qid - 오류 로깅용 질문 ID
 * @returns {Array} 파싱된 옵션 배열
 */
export function parseOptions(optionsStr, qid) {
  if (!optionsStr || optionsStr.trim() === '') {
    return [];
  }

  try {
    // 따옴표 처리 및 배열 파싱
    const cleanedStr = optionsStr.replace(/"""/g, '"').replace(/'/g, '"');
    return JSON.parse(cleanedStr);
  } catch (error) {
    console.warn(`options 파싱 오류 (${qid}):`, optionsStr, error);
    return [];
  }
}

/**
 * 필터링된 acquisition 데이터를 질문 객체 배열로 변환하는 함수
 * @param {Array} filteredData - 필터링된 acquisition 데이터
 * @returns {Array} 질문 객체 배열
 */
export function transformToQuestionObjects(filteredData) {
  return filteredData.map(item => {
    const parsedOptions = parseOptions(item.options, item.qid);

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
}

/**
 * acquisition 데이터 처리 메인 함수
 * q10201, q10301, q10401 값에 따라 데이터를 필터링하고 질문 객체로 변환
 * @param {Array} acquisitionData - 원본 acquisition 데이터
 * @param {string} q10201Value - 양도 시 부동산 종류
 * @param {string} q10301Value - 취득 시 부동산 종류  
 * @param {string} q10401Value - 취득 원인
 * @returns {Array} 변환된 질문 객체 배열
 */
export function processAcquisitionData(acquisitionData, q10201Value, q10301Value, q10401Value) {
  // 세 값이 모두 있고 데이터가 있는지 확인
  if (!q10201Value || !q10301Value || !q10401Value || acquisitionData.length === 0) {
    return [];
  }

  // 1. 필터링
  const filteredData = filterAcquisitionData(acquisitionData, q10201Value, q10301Value, q10401Value);

  // 2. 질문 객체로 변환
  const acquisitionQuestions = transformToQuestionObjects(filteredData);

  return acquisitionQuestions;
} 