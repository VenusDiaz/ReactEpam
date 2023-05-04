import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './components/index.css';

import Registration from './screens/Registration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CourseInfo from './screens/CourseInfo';
import store from './redux/store';
import { Provider } from 'react-redux';
import { Courses } from './screens/Courses';
import { CreateCourse } from './screens/CreateCourse';
import { Header } from './components/Header';
import Login from './screens/Login';
import Footer from './components/Footer';
import ProtectedRoutes from './components/ProtectedRoutes';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Header></Header>
				<Routes>
					<Route
						index
						element={
							<ProtectedRoutes>
								<Courses></Courses>
							</ProtectedRoutes>
						}
					></Route>
					<Route path='/login' element={<Login></Login>}></Route>
					<Route
						path='/registration'
						element={<Registration></Registration>}
					></Route>
					<Route
						path='/courses/:courseId'
						element={<CourseInfo></CourseInfo>}
					></Route>
					<Route path='/courses' element={<Courses></Courses>}></Route>
					<Route
						path='/courses/add'
						element={<CreateCourse></CreateCourse>}
					></Route>
				</Routes>
				<Footer></Footer>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
