import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './screens/Login';
import Registration from './screens/Registration';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CourseInfo from './screens/CourseInfo';
import store from './redux/store';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: 'login',
		element: <Login />,
	},
	{
		path: 'registration',
		element: <Registration />,
	},
	{
		path: '/courses/:courseId',
		element: <CourseInfo />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
