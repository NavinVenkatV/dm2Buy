import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface GlobalState {
  isLogin: boolean;
}

const initialState: GlobalState = {
  isLogin: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleLogin: (state) => {
      state.isLogin = !state.isLogin;
    },
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },
});

export const { toggleLogin, setLogin } = globalSlice.actions;
export default globalSlice.reducer;
