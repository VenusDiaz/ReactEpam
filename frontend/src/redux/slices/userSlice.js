import { createSelector, createSlice } from '@reduxjs/toolkit';
import { api } from '../courses-app-api/api';

const initialState = {
	userName: '',
	token: null,
	userEmail: '',
};

export const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		logOut: (state, action) => {
			state.token = null;
			state.userEmail = '';
			state.userName = '';
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			api.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.token = payload.result;
				state.userEmail = payload.user.email;
				state.userName = payload.user.name;
			}
		);
		builder.addMatcher(
			api.endpoints.userMe.matchFulfilled,
			(state, { payload }) => {
				state.token = payload.result.token;
				state.userEmail = payload.result.email;
				state.userName = payload.result.name;
			}
		);
	},
});
export const filterUser = createSelector(
	[(state) => state.userSlice.userName, (state) => state.userSlice.userEmail],
	(name, email) => {
		if (name && name !== '') return { user: name };
		if (email && email !== '') return { user: email };
		return { user: null };
	}
);
export const { logOut } = userSlice.actions;
export default userSlice.reducer;
