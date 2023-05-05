import React from 'react';
import { render } from '@testing-library/react';
import { CourseCard } from '../CourseCard';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { formatDuration } from '../../../utils/utilities';

describe('Course Card component', () => {
	const mockStore = configureStore();
	let storeAdmin;

	const userSliceAdmin = {
		userName: 'Daniela',
		userEmail: 'admin@123.com',
		role: 'admin',
	};

	const cardProperties = {
		title: 'Testing title',
		description: 'Testing description',
		duration: 123,
		authors: 'Pedro, Pablo',
		created: '22/03/2023',
	};

	beforeEach(() => {
		storeAdmin = mockStore({ userSlice: userSliceAdmin });
	});

	it('CourseCard should display title', () => {
		const { queryByTestId } = render(
			<Provider store={storeAdmin}>
				<MemoryRouter>
					<CourseCard title={cardProperties.title} />
				</MemoryRouter>
			</Provider>
		);
		const container = queryByTestId('card-container');
		const title = queryByTestId('card-title');

		//Header container
		expect(container).toBeInTheDocument();
		expect(title.textContent).toBe(cardProperties.title);
	});

	it('CourseCard should display description', () => {
		const { queryByTestId } = render(
			<Provider store={storeAdmin}>
				<MemoryRouter>
					<CourseCard description={cardProperties.description} />
				</MemoryRouter>
			</Provider>
		);
		const container = queryByTestId('card-container');
		const description = queryByTestId('card-description');

		//Header container
		expect(container).toBeInTheDocument();
		expect(description.textContent).toBe(cardProperties.description);
	});

	it('CourseCard should display duration', () => {
		const { queryByTestId } = render(
			<Provider store={storeAdmin}>
				<MemoryRouter>
					<CourseCard duration={cardProperties.duration} />
				</MemoryRouter>
			</Provider>
		);
		const container = queryByTestId('card-container');
		const duration = queryByTestId('card-duration');

		//Header container
		expect(container).toBeInTheDocument();
		expect(duration.textContent).toBe(formatDuration(cardProperties.duration));
		expect(duration.textContent.includes(':')).toBeTruthy();
	});

	it('CourseCard should display authors', () => {
		const { queryByTestId } = render(
			<Provider store={storeAdmin}>
				<MemoryRouter>
					<CourseCard authors={cardProperties.authors} />
				</MemoryRouter>
			</Provider>
		);
		const container = queryByTestId('card-container');
		const authors = queryByTestId('card-authors');

		//Header container
		expect(container).toBeInTheDocument();
		expect(authors.textContent).toBe(cardProperties.authors);
	});

	it('CourseCard should display date', () => {
		const { queryByTestId } = render(
			<Provider store={storeAdmin}>
				<MemoryRouter>
					<CourseCard created={cardProperties.created} />
				</MemoryRouter>
			</Provider>
		);
		const container = queryByTestId('card-container');
		const created = queryByTestId('card-created');

		//Header container
		expect(container).toBeInTheDocument();
		expect(created.textContent).toBe(cardProperties.created);
	});
});
