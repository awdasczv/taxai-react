import { configureStore,createSlice } from '@reduxjs/toolkit'

let userInput = createSlice({
  name: 'userInput',
  initialState: {
    value: []
  },
  reducers: {
    addUserInput: (state, action) => {
      state.value.push(action.payload)
    },
    updateUserInput: (state, action) => {
      const index = state.value.findIndex(item => item.label === action.payload.label)
      if (index !== -1) {
        state.value[index] = action.payload
      }else{
        state.value.push({label: action.payload.label, value: action.payload.value})
      }
    },
    deleteUserInput: (state, action) => {
      const index = state.value.findIndex(item => item.label === action.payload.label)
      if (index !== -1) {
        state.value.splice(index, 1)
      }else{
        console.log(`store.js : deleteUserInput : label ${action.payload.label} not found`)
      }
    },
    printUserInput: (state) => {
      console.log(JSON.stringify(state.value))
    }
  }
})

export const { addUserInput, updateUserInput, deleteUserInput, printUserInput } = userInput.actions;

// store 생성
const store = configureStore({
  reducer: {
    userInput: userInput.reducer
  }
})

// store를 default export로 변경
export default store