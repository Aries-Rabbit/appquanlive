import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {comboTicketSlice} from '../features/counter/comboTicketFireStore';
import counterReducer, { ticketSlice } from '../features/counter/ticketFireStore';

export const store = configureStore({
  reducer: {
    ticket: ticketSlice.reducer,
    comboticket: comboTicketSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
