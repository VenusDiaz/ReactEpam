import { createSlice } from '@reduxjs/toolkit';
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
	},
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
