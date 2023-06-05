import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type State = {
  delFromId: string;
  messageRefresh: boolean;
  readFromId: string;
  isSystem: boolean;
}

export const notifyStore = createSlice({
  name: 'notify',
  initialState: {
    delFromId: '',
    messageRefresh: true,
    readFromId: '',
    isSystem: false,
  } as State,
  reducers: {
    updateState: (state, action: PayloadAction<Partial<State>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  }
})

export const { updateState } = notifyStore.actions
export default notifyStore.reducer