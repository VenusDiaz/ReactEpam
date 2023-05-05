import { configureStore } from '@reduxjs/toolkit';
import { api } from './courses-app-api/api';
import userSlice, { logOut } from './slices/userSlice';

const authMiddleware = (store) => (next) => (action) => {
	if (api.endpoints.login.matchFulfilled(action)) {
		localStorage.setItem('token', action.payload.result);
	}
	if (logOut.match(action)) {
		localStorage.setItem('token', null);
	}
	return next(action);
};

export const setupStore = (preloadedState) => {
	return configureStore({
		reducer: {
			[api.reducerPath]: api.reducer,
			userSlice,
		},
		preloadedState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: true,
				immutableCheck: false,
				serializableCheck: false,
			})
				.concat([api.middleware])
				.concat(authMiddleware),
	});
};
