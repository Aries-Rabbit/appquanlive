import { ApiFilled } from '@ant-design/icons';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

import api from '../../firebase/firebase';
import comboapi from '../../firebase/combofirestore';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"

export interface CounterState {
  value: [] | undefined;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: [],
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

// Kết nối đến cơ sở dữ liệu của ticket

export const ticketAsync = createAsyncThunk(
  'ticket/getData',
  async () => {
    const response = await api.fetchAll();
    console.log(response)

    // The value we return becomes the `fulfilled` action payload 
    //@ts-ignore
    
    return response
  }
);

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    getData: (state, action: PayloadAction<{value: firebase.firestore.DocumentData[] | unknown[] | undefined}> ) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log(action)
      Object.assign(state, action.payload)
    }
  }
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const selectTicket = (state: RootState) => state.ticket;


// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.



// Sử dụng để kết nối firebase
export const getTicket = (): AppThunk =>  async (
  dispatch,
  getState
) => {
  const response = await api.fetchAll();
    //@ts-ignore
    dispatch(ticketSlice.actions.getData({ value : response}));
};

export default ticketSlice;


