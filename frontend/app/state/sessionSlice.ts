import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  username: string;
  email: string;
  role?: 'admin' | 'editor' | 'volunteer' | 'member';
  id:number;
}

interface SessionState {
  user: User | null;
  expires: string | null;
  backendTokens: {
    accessToken: string;
    refreshToken: string;
  } | null;
}

const initialState: SessionState = {
  user: null,
  expires: null,
  backendTokens: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<SessionState>) => {
      state.user = action.payload.user;
      state.expires = action.payload.expires;
      state.backendTokens = action.payload.backendTokens;
    },
    clearSession: (state) => {
      state.user = null;
      state.expires = null;
      state.backendTokens = null;
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
