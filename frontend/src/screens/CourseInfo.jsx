import React from 'react';
import { Header } from '../components/Header';

const CourseInfo = () => {
	return (
		<>
			<Header></Header>
			<div>
				<a>go Back</a>
				<div>Java</div>
				<div>
					<p>Lorem ipsum</p>
				</div>
				<div>
					<div>
						<h3>ID: </h3>
					</div>
					<div>
						<h3>Duration: </h3>
					</div>
					<div>
						<h3>Created: </h3>
					</div>
					<div>
						<h3>Authors: </h3>
					</div>
				</div>
			</div>
		</>
	);
};

export default CourseInfo;
