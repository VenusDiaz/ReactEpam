import React from 'react';

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

	const navigate = useNavigate();
	const { data: course } = useGetCourseByIdQuery(courseId);

	return (
		<div>
			<div className='course-info-container'>
				<button
					href='#'
					onClick={() => {
						navigate('/');
					}}
				>
					Go Back
				</button>
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
