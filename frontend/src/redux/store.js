import { configureStore } from '@reduxjs/toolkit';
import { api } from './courses-app-api/api';
import userSlice from './slices/userSlice';
const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		userSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ thunk: true }).concat([api.middleware]),
});

export default store;
