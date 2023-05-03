import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import './Login.css';
import { useLoginMutation } from '../redux/courses-app-api/api';
import { useNavigate } from 'react-router-dom';
const Login = () => {
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [login, { isSuccess, error, data }] = useLoginMutation();
	const navigate = useNavigate();

	const handleInputChange = (e) => {
		const { id, value } = e.target;

		if (id === 'email') {
			setEmail(value);
		}
		if (id === 'password') {
			setPassword(value);
		}
	};
	useEffect(() => {
		if (isSuccess) {
			navigate('/');
		}
	}, [isSuccess]);

	const handleSubmit = () => {
		login({ email: email, password: password });
		console.log(email, password);
	};
	return (
		<div className='App'>
			<Header></Header>
			<div className='form'>
				<h2>Login</h2>
				<div className='form-body'>
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
				</div>
				<div class='footer'>
					<button onClick={() => handleSubmit()} type='submit' class='btn'>
						Login
					</button>
					<div>
						if you do not have an account <a href='/registration'>Register</a>{' '}
						here
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
