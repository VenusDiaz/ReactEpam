import React from 'react';
import { Logo } from './Logo';
import { User } from './User';
import { Button } from '../Button';
import logo from '../../corgi-logo.png';
import './index.css';
import { LOGIN_LABEL, LOG_OUT, REGISTER_LABEL } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { filterUser, logOut } from '../../redux/slices/userSlice';

export const Header = () => {
	const navigate = useNavigate();
	const userInfo = useSelector((state) => filterUser(state));
	const dispatch = useDispatch();

	return (
		<div id='header-container'>
			<Logo
				src={logo}
				onClick={() => {
					navigate('/');
				}}
			></Logo>
			<User user={userInfo.user ? userInfo.user : ''}></User>
			{userInfo?.user === null ? (
				<>
					<Button
						onClick={() => {
							navigate('/');
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
				</>
			) : (
				<Button
					onClick={() => {
						dispatch(logOut());
						navigate('/');
					}}
					buttonText={LOG_OUT}
					className='register-button-container'
				></Button>
			)}
		</div>
	);
};
