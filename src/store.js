import { configureStore,createSlice } from '@reduxjs/toolkit'
import { 
  initAnswersFromQuestions,
  initVisibleQuestionsFromArray,
  convertQuestionsToObjectMap,
  createLabelToQidMap,
  createVisibilityRules
} from './utils/storeHelpers'

let userInput = createSlice({
  name: 'userInput',
  initialState: {
    visibleQuestions: [],//화면에 보이는 Question들의 qid 목록
    answers:{},//key:qid, value:사용자 답변. ex) {q30601: '2년 미만'}
    questionObj:{},//key:qid, value:question 객체. ex) {q30601: {qid: 'q30601', label: '주택 건축 연도', type: 'text', required: true, options: []}}
    labelQidMap:{},//key:label, value:qid. ex) {'주택 건축 연도': 'q30601'}
    visibilityRules:[],//key:condition, value:show 객체. ex) {condition: (answers) => answers[q10301] === '재건축전 주택', show: ['q30601']}
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

      // 1. answers 상태 초기화 (공통 + 조건부 질문들의 답변을 빈 문자열로 초기화)
      state.answers = {
        ...initAnswersFromQuestions(commonInput), 
        ...initAnswersFromQuestions(conditionalInput)
      };

      // 2. 화면에 보여줄 질문들 초기화 (처음에는 공통 질문들만 보여줌)
      state.visibleQuestions = initVisibleQuestionsFromArray(commonInput);

      // 3. 질문 객체 맵 생성 (qid로 질문 객체에 빠르게 접근하기 위함)
      state.questionObj = {
        ...convertQuestionsToObjectMap(commonInput), 
        ...convertQuestionsToObjectMap(conditionalInput)
      };

      // 4. 라벨-qid 맵 생성 (라벨로 qid를 찾기 위함)
      state.labelQidMap = {
        ...createLabelToQidMap(commonInput), 
        ...createLabelToQidMap(conditionalInput)
      };

      // 5. 가시성 규칙 생성 (조건에 따라 어떤 질문을 보여줄지 결정)
      state.visibilityRules = createVisibilityRules(conditionalInput);
    },

    setAnswers: (state, action) => {
      const { qid, value } = action.payload;
      state.answers[qid] = value;
    },
    setVisibleQuestions: (state, action) => {
      state.visibleQuestions = action.payload;
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
  setVisibleQuestions 
} = userInput.actions;

// store 생성
const store = configureStore({
  reducer: {
    userInput: userInput.reducer
  }
})

// store를 default export로 변경
export default store