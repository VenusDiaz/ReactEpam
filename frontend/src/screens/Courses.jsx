import React, { useEffect, useState } from 'react';
import './Courses.css';
import { CourseCard } from '../components/Courses/CourseCard';
import { SearchBar } from '../components/Courses/SearchBar';
// import { mockedCoursesList } from '../../backend/courseList';
// import { mockedAuthorsList } from '../../backend/authorList';
// import { CreateCourse } from '../components/Courses/CreateCourse';

import {
	useDeleteCourseMutation,
	useGetAllAuthorsQuery,
	useGetAllCoursesQuery,
} from '../redux/courses-app-api/api';
import { useSelector } from 'react-redux';

export const Courses = () => {
	const {
		refetch: refetchCourses,
		isLoading: loadingCourses,
		data: coursesData,
	} = useGetAllCoursesQuery();
	const {
		refetch: refetchAuthors,
		isLoading: loadingAuthors,
		data: authorsData,
	} = useGetAllAuthorsQuery();
	const [deleteCourse, { isSuccess }] = useDeleteCourseMutation();

	const allCourses = coursesData?.result ? coursesData.result : [];
	const allAuthors = authorsData?.result ? authorsData.result : [];
	const [searchTerm, setSearchTerm] = useState('');

	const [filteredCourseList, setFilteredCourseList] = useState([]);
	const userInfo = useSelector((state) => state.userSlice);

	let searchCourses = () => {
		if (searchTerm !== '')
			return allCourses.filter((course) => {
				const lowercaseQuery = searchTerm.toLowerCase();
				const lowercaseTitle = course.title.toLowerCase();
				const lowercaseId = course.id.toLowerCase();

				return (
					lowercaseTitle.includes(lowercaseQuery) ||
					lowercaseId.includes(lowercaseQuery)
				);
			});
		return allCourses;
	};

	useEffect(() => {
		if (searchTerm === '') {
			setFilteredCourseList(allCourses);
		}
	}, [searchTerm, allCourses, isSuccess]);
	useEffect(() => {
		refetchCourses();
		refetchAuthors();
	}, []);

	useEffect(() => {
		if (isSuccess) {
			refetchCourses();
			refetchAuthors();
		}
	}, [refetchCourses, isSuccess, refetchAuthors]);

	return (
		<div>
			{loadingAuthors || loadingCourses ? (
				<>Loading...</>
			) : (
				<>
					<SearchBar
						setSearchTerm={setSearchTerm}
						setFilteredCourseList={() => {
							setFilteredCourseList(searchCourses());
						}}
					></SearchBar>

					{filteredCourseList.map((course) => {
						let authors = course?.authors?.map((id) => {
							let author = allAuthors.find((author) => {
								return id === author.id;
							});
							return author?.name;
						});

						return (
							<CourseCard
								isAdmin={userInfo.role === 'admin'}
								deleteCourse={deleteCourse}
								authors={authors.toString()}
								title={course.title}
								duration={course.duration}
								description={course.description}
								created={course.creationDate}
								id={course.id}
								key={course.id}
							></CourseCard>
						);
					})}
				</>
			)}
		</div>
	);
};
