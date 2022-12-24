import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/UserDetails/UserDetailsReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
