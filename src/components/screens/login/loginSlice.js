import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  itsId: -1,
};

export const loggedIn = createSlice({
  name: 'loggedIn',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.itsId = action.payload;
      state.loggedIn = true;
    },
    logOut: (state) => {
      state.itsId = -1;
      state.loggedIn = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logIn, logOut } = loggedIn.actions;

export default loggedIn.reducer;
