import Papa from 'papaparse';
import { setVisibleQuestions } from '../store';

const csvLoader = async()=> {
  const fileNames = ['input-controller-common.csv', 'input-controller-conditional.csv'];
  const csvFolder = '/csv/';
  
  const results = await Promise.all(
    fileNames.map(async (fileName) => {
      const response = await fetch(`${csvFolder}${fileName}`);
      const text = await response.text();
      return new Promise((resolve) => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => resolve({ fileName, data: result.data }),
        });
      });
    })
  );


  // 결과 예시: [{ fileName: '...', data: [...] }, ...]
  return results;
}

const initAnswers = (array) => {

  const answers = array.reduce((acc, item) => {
    acc[item.qid] = '';
    return acc;
  },{});

  return answers;
}

function initVisibilityRules(conditionalInputs){
  const conditionMap = {};

  conditionalInputs.forEach((item) => {
    const conditionStr = item.condition; // 예: "q10301=재건축전 주택"
    const [questionId, expectedValue] = conditionStr.split('=').map(s => s.trim());

    if (!conditionMap[conditionStr]) {
      conditionMap[conditionStr] = {
        condition: (answers) => answers[questionId] === expectedValue,
        show: []
      };
    }

    conditionMap[conditionStr].show.push(item.qid);
  });

  // console.log(Object.values(conditionMap));

  return Object.values(conditionMap);
}

function updateVisibleQuestions(answers, visibilityRules, dispatch) {
  const newVisible = new Set();

  visibilityRules.forEach(rule => {
    if (evaluateCondition(rule.condition, answers)) {
      rule.show.forEach(qid => newVisible.add(qid));
    }
  });

  dispatch(setVisibleQuestions([...newVisible]));
}

// 조건 문자열을 평가하는 함수
function evaluateCondition(conditionStr, answers) {
  const [questionId, expectedValue] = conditionStr.split('=').map(s => s.trim());
  return answers[questionId] === expectedValue;
}

export { csvLoader, initAnswers, initVisibilityRules, updateVisibleQuestions, evaluateCondition };