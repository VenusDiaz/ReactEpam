import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './components/index.css';

import Registration from './screens/Registration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CourseInfo from './screens/CourseInfo';
import { setupStore } from './redux/store';
import { Provider, useSelector } from 'react-redux';
import { Courses } from './screens/Courses/Courses';
import { CreateCourse } from './screens/CreateCourse';
import { Header } from './components/Header';
import Login from './screens/Login';
import Footer from './components/Footer';
import ProtectedRoutes from './components/ProtectedRoutes';
import Blocked from './screens/Blocked';
import { CourseUpdate } from './screens/CourseUpdate';

const store = setupStore({});
const App = () => {
	const userInfo = useSelector((state) => state.userSlice);

	return (
		<BrowserRouter>
			<Header></Header>
			<Routes>
				<Route
					element={
						<ProtectedRoutes
							redirectTo='/blocked'
							isAllowed={userInfo.role === 'admin'}
						></ProtectedRoutes>
					}
				>
					<Route path='/courses/add' element={<CreateCourse />}></Route>
					<Route
						path='/courses/update/:courseId'
						element={<CourseUpdate />}
					></Route>
				</Route>
				<Route
					element={
						<ProtectedRoutes
							redirectTo='/login'
							isAllowed={true}
						></ProtectedRoutes>
					}
				>
					<Route index element={<Courses></Courses>}></Route>
					<Route path='/courses/:courseId' element={<CourseInfo />}></Route>
				</Route>
				<Route path='/login' element={<Login></Login>}></Route>
				<Route path='/registration' element={<Registration />}></Route>
				<Route path='/blocked' element={<Blocked></Blocked>}></Route>
			</Routes>
			<Footer></Footer>
		</BrowserRouter>
	);
};

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<App></App>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
