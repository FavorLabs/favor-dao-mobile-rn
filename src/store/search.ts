import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type State = {
  feedsSearch: string;
  daoSearch: string;
}

export const searchStore = createSlice({
  name: 'search',
  initialState: {
    feedsSearch: '',
    daoSearch: '',
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

export const { updateState } = searchStore.actions
export default searchStore.reducer