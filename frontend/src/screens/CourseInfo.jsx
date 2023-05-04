import React from 'react';
import { Header } from '../components/Header';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './CourseInfo.css';
import {
	useGetAllAuthorsQuery,
	useGetCourseByIdQuery,
} from '../redux/courses-app-api/api';

const CourseInfo = () => {
	const { data: authorsData } = useGetAllAuthorsQuery();
	const { courseId } = useParams();
	console.log(courseId);
	const navigate = useNavigate();
	const { data: course } = useGetCourseByIdQuery(courseId);
	console.log(course);
	return (
		<div>
			<Header></Header>
			<div className='course-info-container'>
				<a
					href='/'
					onClick={() => {
						navigate('/');
					}}
				>
					Go Back
				</a>
				<div className='card-info-title'>{course?.result?.title}</div>
				<div className='card-info-description'>
					<p>{course?.result?.description}</p>
				</div>
				<div>
					<div>
						<h3>ID: </h3>
						<span>{course?.result?.id}</span>
					</div>
					<div>
						<h3>Duration: </h3>
						<span>{course?.result?.duration}</span>
					</div>
					<div>
						<h3>Created: </h3>
						<span>{course?.result?.creationDate}</span>
					</div>
					<div>
						<h3>Authors: </h3>
						<span>
							{course?.result?.authors
								.map((id) => {
									let author =
										authorsData !== undefined
											? authorsData?.result.find((author) => {
													return id === author.id;
											  })
											: [];
									return author?.name;
								})
								.toString()}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseInfo;
