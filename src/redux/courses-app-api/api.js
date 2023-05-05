import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REDUCER_API_PATH, URL_SERVICE } from '../../utils/constants';

export const api = createApi({
	reducerPath: REDUCER_API_PATH,

	baseQuery: fetchBaseQuery({
		baseUrl: URL_SERVICE,
		prepareHeaders: (headers, { getState }) => {
			const token = localStorage.getItem('token');
			if (token) {
				headers.set('Authorization', token);
			}
			return headers;
		},
	}),
	refetchOnFocus: true,
	refetchOnReconnect: true,
	endpoints: (build) => ({
		updateCourse: build.mutation({
			query: ({ id, body }) => ({
				url: `/courses/${id}`,
				method: 'PUT',
				body: body,
			}),
		}),
		getCourseById: build.query({
			query: (id) => ({
				url: `/courses/${id}`,
			}),
		}),
		addCourse: build.mutation({
			query: (request) => ({
				url: '/courses/add',
				method: 'POST',
				body: request,
			}),
		}),
		deleteCourse: build.mutation({
			query: (id) => ({
				url: `/courses/${id}`,
				method: 'DELETE',
			}),
		}),

		addAuthor: build.mutation({
			query: (request) => ({
				url: '/authors/add',
				method: 'POST',
				body: request,
			}),
		}),
		logout: build.query({
			query: () => ({ url: '/logout', method: 'DELETE' }),
		}),
		login: build.mutation({
			query: (request) => ({ url: '/login', method: 'POST', body: request }),
		}),
		userMe: build.query({
			query: () => ({ url: '/users/me', method: 'GET' }),
		}),
		createUser: build.mutation({
			query: (request) => ({ url: '/register', method: 'POST', body: request }),
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
	useGetCourseByIdQuery,
	useCreateUserMutation,
	useDeleteCourseMutation,
	useUpdateCourseMutation,
	useLazyUserMeQuery,
	useLazyLogoutQuery,
} = api;
