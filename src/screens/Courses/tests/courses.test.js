import React from 'react';
import { Courses } from '../Courses';
import { renderWithProviders } from '../../../utils/test-utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { ADD_COURSE_LABEL, URL_SERVICE } from '../../../utils/constants';
import { MemoryRouter } from 'react-router-dom';
const mockedCourses = {
	successful: true,
	result: [
		{
			title: 'Python 2',
			description: 'description e',
			creationDate: '9/3/2021',
			duration: 30,
			authors: ['9b87e8b8-6ba5-40fc-a439-c4e30a373d36'],
			id: '66cc289e-6de9-49b2-9ca7-8b4f409d6467',
		},
		{
			title: 'Moby Dick',
			description:
				'Melville began writing Moby-Dick in February 1850 and finished 18 months later, a year after he had anticipated. Melville drew on his experience as a common sailor from 1841 to 1844, including on whalers, and on wide reading in whaling literature.',
			duration: 320,
			authors: ['1ef87615-aec9-4e18-9031-3080dc5c6f03'],
			creationDate: '03/05/2023',
			id: '1b4d2e05-2f4f-4202-9771-b948b4c6648c',
		},
	],
};

const mockedCoursesEmpty = {
	successful: true,
	result: [],
};
export const handlers = [
	rest.get(`${URL_SERVICE}courses/all`, (req, res, ctx) => {
		return res(ctx.json(mockedCourses));
	}),
];

describe('Course Card component', () => {
	const server = setupServer(...handlers);

	// Enable API mocking before tests.
	beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));

	// Reset any runtime request handlers we may add during the tests.
	afterEach(() => server.resetHandlers());

	// Disable API mocking after the tests are done.
	afterAll(() => server.close());

	it('Courses should display amount of CourseCard equal length of courses array.', async () => {
		renderWithProviders(
			<MemoryRouter>
				<Courses></Courses>
			</MemoryRouter>
		);
		await waitFor(() => {
			let searchBar = screen.getByTestId('search');
			expect(searchBar).toBeInTheDocument();
		});
		await waitFor(() => {
			let cards = screen.getAllByTestId('card-container');
			expect(cards[0]).toBeInTheDocument();
			expect(cards.length).toBe(mockedCourses.result.length);
		});

		//screen.debug();
	});

	it('Courses should display Empty container if courses array length is 0.', async () => {
		renderWithProviders(
			<MemoryRouter>
				<Courses></Courses>
			</MemoryRouter>
		);
		await waitFor(() => {
			let searchBar = screen.getByTestId('search');
			expect(searchBar).toBeInTheDocument();
		});
		await waitFor(() => {
			let cards = screen.getAllByTestId('card-container');
			expect(cards[0]).toBeInTheDocument();
			expect(cards.length).toBe(mockedCourses.result.length);
		});

		//screen.debug();
	});

	it('CourseForm should be showed after a click on a button "Add new course".', async () => {
		renderWithProviders(
			<MemoryRouter>
				<Courses></Courses>
			</MemoryRouter>
		);

		//screen.debug();
		await waitFor(() => {
			let searchBar = screen.getByTestId('search');
			expect(searchBar).toBeInTheDocument();
			fireEvent.click(screen.getByText(ADD_COURSE_LABEL));
			waitFor(() => {
				let addContainer = screen.getByTestId('add-course-container');
				expect(addContainer).toBeInTheDocument();
			});
		});
	});
});
