import React from 'react';
import { render } from '@testing-library/react';
import { Header } from '../../Header';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('Header component', () => {
	const mockStore = configureStore();
	let storeAdmin, storeOther, storeMissingName;

	const userSliceAdmin = {
		userName: 'Daniela',
		userEmail: 'admin@123.com',
		role: 'admin',
	};

	const userSliceOther = {
		userName: 'TestUser',
		userEmail: 'test@123.com',
		role: 'other',
	};

	const userSliceEmail = {
		userName: null,
		userEmail: 'test@123.com',
		role: 'other',
	};

	beforeEach(() => {
		storeAdmin = mockStore({ userSlice: userSliceAdmin });
		storeOther = mockStore({ userSlice: userSliceOther });
		storeMissingName = mockStore({ userSlice: userSliceEmail });
	});

	it('should render logo and user name when admin', () => {
		const { queryByTestId } = render(
			<Provider store={storeAdmin}>
				<MemoryRouter>
					<Header />
				</MemoryRouter>
			</Provider>
		);
		const container = queryByTestId('header-container');
		const logo = queryByTestId('img-logo');
		const user = queryByTestId('user-container');

		//Header container
		expect(container).toBeInTheDocument();
		//Logo
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute('src', 'corgi-logo.png');
		//User
		expect(user).toBeInTheDocument();
		expect(user.textContent).toBe(userSliceAdmin.userName);
	});

	it('should render logo and user name when other user', () => {
		const { queryByTestId } = render(
			<Provider store={storeOther}>
				<MemoryRouter>
					<Header />
				</MemoryRouter>
			</Provider>
		);
		const container = queryByTestId('header-container');
		const logo = queryByTestId('img-logo');
		const user = queryByTestId('user-container');

		//Header container
		expect(container).toBeInTheDocument();
		//Logo
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute('src', 'corgi-logo.png');
		//User
		expect(user).toBeInTheDocument();
		expect(user.textContent).toBe(userSliceOther.userName);
	});

	it('should display email if username is missing', () => {
		const { queryByTestId } = render(
			<Provider store={storeMissingName}>
				<MemoryRouter>
					<Header />
				</MemoryRouter>
			</Provider>
		);
		const container = queryByTestId('header-container');
		const logo = queryByTestId('img-logo');
		const user = queryByTestId('user-container');

		//Header container
		expect(container).toBeInTheDocument();
		//Logo
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute('src', 'corgi-logo.png');
		//User
		expect(user).toBeInTheDocument();
		expect(user.textContent).toBe(userSliceOther.userEmail);
	});
});
