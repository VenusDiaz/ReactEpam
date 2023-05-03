import React from 'react';
import { Logo } from './Logo';
import { User } from './User';
import { Button } from '../Button';
import logo from '../../corgi-logo.png';
import './index.css';
import { LOGIN_LABEL, REGISTER_LABEL } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
export const Header = () => {
	const navigate = useNavigate();
	return (
		<div id='header-container'>
			<Logo
				src={logo}
				onClick={() => {
					navigate('/');
				}}
			></Logo>
			<User></User>
			<Button
				onClick={() => {
					navigate('/login');
				}}
				buttonText={LOGIN_LABEL}
			></Button>
			<Button
				onClick={() => {
					navigate('/registration');
				}}
				buttonText={REGISTER_LABEL}
				className='register-button-container'
			></Button>
		</div>
	);
};
