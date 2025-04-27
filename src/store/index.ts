import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestionData } from "../model/questionData";

const quizDataSlice = createSlice({
  name: "quizData",
  initialState: [] as QuestionData[],
  reducers: {
    setQuizData(state, action: PayloadAction<QuestionData[]>) {
      return action.payload;
    },
  },
});

const myPicksSlice = createSlice({
  name: "myPicks",
  initialState: [] as string[],
  reducers: {
    setMyPicks(state, action: PayloadAction<string>) {
      state.push(action.payload);
    },
    resetMyPicks() {
      return [];
    },
  },
});

const questionNumberSlice = createSlice({
  name: "questionNumber",
  initialState: 0,
  reducers: {
    nextQuestion(state) {
      return state + 1;
    },
    startAgain() {
      return 0;
    },
  },
});

const dataStatusSlice = createSlice({
  name: "dataStatus",
  initialState: {
    isLoading: false,
    errorMessage: "",
  },
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    setError(state, action) {
      state.errorMessage = action.payload;
    },
    resetStatus(state) {
      state.isLoading = false;
      state.errorMessage = "";
    },
  },
});

export const quizDataActions = quizDataSlice.actions;
export const myPicksActions = myPicksSlice.actions;
export const questionNumberActions = questionNumberSlice.actions;
export const dataStatusActions = dataStatusSlice.actions;

const store = configureStore({
  reducer: {
    quizData: quizDataSlice.reducer,
    myPicks: myPicksSlice.reducer,
    questionNumber: questionNumberSlice.reducer,
    dataStatus: dataStatusSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
