import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import tableReducer from '../Components/Tables/tableSlice';
import authReducer from "./../auth/authSlice";


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tables: tableReducer,
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
