import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ children, redirectTo = '/login', isAllowed }) => {
	const token = localStorage.getItem('token');

	if (isAllowed)
		if (token !== 'null') {
			return children ? children : <Outlet></Outlet>;
		}

	return <Navigate to={redirectTo}></Navigate>;
};

export default ProtectedRoutes;
