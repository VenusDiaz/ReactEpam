import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REDUCER_API_PATH, URL_SERVICE } from '../../utils/constants';

export const api = createApi({
	reducerPath: REDUCER_API_PATH,

	baseQuery: fetchBaseQuery({
		baseUrl: URL_SERVICE,
		prepareHeaders: (headers, { getState }) => {
			const token = getState().userSlice.token;
			if (token) {
				headers.set('Authorization', token);
			}
			return headers;
		},
	}),
	refetchOnFocus: true,
	refetchOnReconnect: true,
	endpoints: (build) => ({
		addCourse: build.mutation({
			query: (request) => ({
				url: '/courses/add',
				method: 'POST',
				body: request,
			}),
		}),
		addAuthor: build.mutation({
			query: (request) => ({
				url: '/authors/add',
				method: 'POST',
				body: request,
			}),
		}),
		login: build.mutation({
			query: (request) => ({ url: '/login', method: 'POST', body: request }),
		}),
		getAllCourses: build.query({
			query: (request) => ({
				url: '/courses/all',
			}),
		}),
		getAllAuthors: build.query({
			query: (request) => ({
				url: '/authors/all',
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useGetAllCoursesQuery,
	useGetAllAuthorsQuery,
	useAddCourseMutation,
	useAddAuthorMutation,
} = api;
