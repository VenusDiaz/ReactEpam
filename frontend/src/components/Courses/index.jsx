import React, { useEffect, useState } from 'react';
import './index.css';
import { CourseCard } from './CourseCard';
import { SearchBar } from './SearchBar';
// import { mockedCoursesList } from '../../backend/courseList';
// import { mockedAuthorsList } from '../../backend/authorList';
import { CreateCourse } from './CreateCourse';
import {
	useGetAllAuthorsQuery,
	useGetAllCoursesQuery,
} from '../../redux/courses-app-api/api';

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

	const allCourses = coursesData?.result ? coursesData.result : [];
	const allAuthors = authorsData?.result ? authorsData.result : [];
	const [searchTerm, setSearchTerm] = useState('');
	const [showAddCourseView, setShowAddCourseView] = useState(false);
	const [filteredCourseList, setFilteredCourseList] = useState(allCourses);

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
	}, [searchTerm, allCourses]);

	useEffect(() => {
		if (!showAddCourseView) {
			refetchCourses();
			refetchAuthors();
		}
	}, [showAddCourseView, refetchCourses]);

	return (
		<div>
			{loadingAuthors || loadingCourses ? (
				<>Loading...</>
			) : (
				<>
					{showAddCourseView === false ? (
						<>
							<SearchBar
								setSearchTerm={setSearchTerm}
								setFilteredCourseList={() => {
									setFilteredCourseList(searchCourses());
									setShowAddCourseView(false);
								}}
								setShowAddCourseView={setShowAddCourseView}
							></SearchBar>

							{filteredCourseList.map((course) => {
								let authors = course.authors.map((id) => {
									let author = allAuthors.find((author) => {
										return id === author.id;
									});
									return author?.name;
								});

								return (
									<CourseCard
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
					) : (
						<CreateCourse
							setShowAddCourseView={setShowAddCourseView}
							authors={allAuthors}
						></CreateCourse>
					)}
				</>
			)}
		</div>
	);
};
