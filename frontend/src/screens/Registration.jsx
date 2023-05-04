import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import './Registration.css';
import {
	useCreateUserMutation,
	useLoginMutation,
} from '../redux/courses-app-api/api';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
	const [firstName, setFirstName] = useState(null);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState(null);
	const [createUser, { error }] = useCreateUserMutation();
	const [login] = useLoginMutation();
	const navigate = useNavigate();

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		if (id === 'firstName') {
			setFirstName(value);
		}
		if (id === 'email') {
			setEmail(value);
		}
		if (id === 'password') {
			setPassword(value);
		}
		if (id === 'confirmPassword') {
			setConfirmPassword(value);
		}
	};
	useEffect(() => {
		if (error !== undefined) {
			alert(JSON.stringify(error));
		}
	}, [error]);

	const handleSubmit = async () => {
		if (password !== confirmPassword) {
			alert('Password no coincide');
			return;
		}

		let response = await createUser({
			name: firstName,
			email: email,
			password: password,
		});
		console.log(response);
		login({ email: email, password: password });
		if (response?.data?.successful) {
			navigate('/');
		}
	};
	return (
		<div className='App'>
			<Header></Header>
			<div className='form'>
				<h2>New User</h2>
				<div className='form-body'>
					<div className='username'>
						<label className='form__label' for='firstName'>
							User Name{' '}
						</label>
						<input
							className='form__input'
							type='text'
							value={firstName}
							onChange={(e) => handleInputChange(e)}
							id='firstName'
							placeholder='First Name'
						/>
					</div>
					<div className='email'>
						<label className='form__label' for='email'>
							Email{' '}
						</label>
						<input
							type='email'
							id='email'
							className='form__input'
							value={email}
							onChange={(e) => handleInputChange(e)}
							placeholder='Email'
						/>
					</div>
					<div className='password'>
						<label className='form__label' for='password'>
							Password{' '}
						</label>
						<input
							className='form__input'
							type='password'
							id='password'
							value={password}
							onChange={(e) => handleInputChange(e)}
							placeholder='Password'
						/>
					</div>
					<div className='confirm-password'>
						<label className='form__label' for='confirmPassword'>
							Confirm Password{' '}
						</label>
						<input
							className='form__input'
							type='password'
							id='confirmPassword'
							value={confirmPassword}
							onChange={(e) => handleInputChange(e)}
							placeholder='Confirm Password'
						/>
					</div>
				</div>
				<div className='footer'>
					<button onClick={() => handleSubmit()} type='submit' class='btn'>
						Register
					</button>
				</div>
			</div>
		</div>
	);
};

export default Registration;
