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
  },
});

export const quizDataActions = quizDataSlice.actions;
export const myPicksActions = myPicksSlice.actions;

const store = configureStore({
  reducer: { quizData: quizDataSlice.reducer, myPicks: myPicksSlice.reducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
