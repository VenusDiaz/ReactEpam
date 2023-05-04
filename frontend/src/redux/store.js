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

const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		userSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ thunk: true })
			.concat([api.middleware])
			.concat(authMiddleware),
});

export default store;
