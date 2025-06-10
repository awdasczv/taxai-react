import { configureStore,createSlice } from '@reduxjs/toolkit'
import { 
  initAnswersFromQuestions,
  initVisibleQuestionsFromArray,
  convertQuestionsToObjectMap,
  createLabelToQidMap
} from './utils/storeHelpers'
import { initVisibilityRules } from './utils/visibilityUtils'

let userInput = createSlice({
  name: 'userInput',
  initialState: {
    visibleQuestions: [],//화면에 보이는 Question들의 qid 목록
    answers:{},//key:qid, value:사용자 답변. ex) {q30601: '2년 미만'}
    questionObj:{},//key:qid, value:question 객체. ex) {q30601: {qid: 'q30601', label: '주택 건축 연도', type: 'text', required: true, options: []}}
    labelQidMap:{},//key:label, value:qid. ex) {'주택 건축 연도': 'q30601'}
    visibilityRules:[],//key:condition, value:show 객체. ex) {condition: (answers) => answers[q10301] === '재건축전 주택', show: ['q30601']}
    acquisitionData: [], // 원본 acquisition 데이터 저장
    acquisitionRules: [], // acquisition 가시성 규칙들 (q10201,q10301,q10401에 따라 동적 생성)
  },
  reducers: {
    /**
     * 사용자 입력 상태를 초기화하는 리듀서
     * @param {Object} state - 현재 상태
     * @param {Object} action - payload[0]은 commonInput, payload[1]은 conditionalInput 데이터
     */
    initUserInput: (state, action) => {
      // CSV 로더에서 받은 데이터 추출
      const commonInput = action.payload[0].data;      // 공통 질문들
      const conditionalInput = action.payload[1].data; // 조건부 질문들
      const acquisitionInput = action.payload[2].data; // 취득 질문들

      // acquisition 원본 데이터 저장
      state.acquisitionData = acquisitionInput;

      // 1. answers 상태 초기화 (공통 + 조건부 질문들의 답변을 빈 문자열로 초기화)
      state.answers = {
        ...initAnswersFromQuestions(commonInput), 
        ...initAnswersFromQuestions(conditionalInput),
        ...initAnswersFromQuestions(acquisitionInput),
      };

      // 2. 화면에 보여줄 질문들 초기화 (처음에는 공통 질문들만 보여줌)
      state.visibleQuestions = initVisibleQuestionsFromArray(commonInput);

      // 3. 질문 객체 맵 생성 (qid로 질문 객체에 빠르게 접근하기 위함)
      state.questionObj = {
        ...convertQuestionsToObjectMap(commonInput), 
        ...convertQuestionsToObjectMap(conditionalInput),
        ...convertQuestionsToObjectMap(acquisitionInput),
      };

      // 4. 라벨-qid 맵 생성 (라벨로 qid를 찾기 위함)
      state.labelQidMap = {
        ...createLabelToQidMap(commonInput), 
        ...createLabelToQidMap(conditionalInput),
        ...createLabelToQidMap(acquisitionInput),
      };

      // 5. 가시성 규칙 생성 (조건에 따라 어떤 질문을 보여줄지 결정)
      state.visibilityRules = initVisibilityRules(conditionalInput);
      
      // 6. acquisition 규칙 초기화 (빈 배열로 시작)
      state.acquisitionRules = [];
    },

    setAnswers: (state, action) => {
      const { qid, value } = action.payload;
      state.answers[qid] = value;
    },
    setVisibleQuestions: (state, action) => {
      state.visibleQuestions = action.payload;
    },

    /**
     * acquisition 가시성 규칙을 업데이트하는 리듀서
     * @param {Object} state - 현재 상태
     * @param {Array} action.payload - 추려낸 acquisition 질문 객체 배열
     */
    updateAcquisitionRules: (state, action) => {
      const acquisitionQuestions = action.payload;
      
      // acquisition 질문들을 가시성 규칙으로 변환
      const newAcquisitionRules = [];
      
      acquisitionQuestions.forEach(question => {
        if (question.condition && question.condition.trim() !== '') {
          // 조건이 있는 질문: 조건부 규칙으로 추가
          newAcquisitionRules.push({
            condition: question.condition,
            show: [question.qid]
          });
        } else {
          // 조건이 없는 질문: 항상 보여주는 규칙으로 추가
          newAcquisitionRules.push({
            condition: 'always', // 항상 참인 조건을 나타내는 특별한 값
            show: [question.qid]
          });
        }
      });
      
      // acquisition 규칙 업데이트
      state.acquisitionRules = newAcquisitionRules;
    },

    printAnswers: (state) => {
      console.log(JSON.stringify(state.answers))
    },

    
  }
})

export const { 
  updateUserInput, 
  initAnswers, 
  printAnswers, 
  setAnswers, 
  initUserInput, 
  setVisibleQuestions,
  updateAcquisitionRules
} = userInput.actions;

// store 생성
const store = configureStore({
  reducer: {
    userInput: userInput.reducer
  }
})

// store를 default export로 변경
export default store