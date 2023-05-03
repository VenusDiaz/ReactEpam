import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REDUCER_API_PATH, URL_SERVICE } from '../../utils/constants';

export const api = createApi({
	reducerPath: REDUCER_API_PATH,
	baseQuery: fetchBaseQuery({
		baseUrl: URL_SERVICE,
	}),
	endpoints: (build) => ({
		login: build.mutation({
			query: (request) => ({ url: '/login', method: 'POST', body: request }),
		}),
	}),
});

export const { useLoginMutation } = api;
