import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useLazyUserMeQuery } from '../redux/courses-app-api/api';

const ProtectedRoutes = ({ children, redirectTo = '/login' }) => {
	const token = localStorage.getItem('token');

	if (token !== 'null') {
		return children ? children : <Outlet></Outlet>;
	}

	return <Navigate to={redirectTo}></Navigate>;
};

export default ProtectedRoutes;
