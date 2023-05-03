import React, { useEffect, useState } from 'react';
import './index.css';
import { CourseCard } from './CourseCard';
import { SearchBar } from './SearchBar';
import { mockedCoursesList } from '../../backend/courseList';
import { mockedAuthorsList } from '../../backend/authorList';
import { CreateCourse } from './CreateCourse';

export const Courses = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [showAddCourseView, setShowAddCourseView] = useState(false);
	const [filteredCourseList, setFilteredCourseList] =
		useState(mockedCoursesList);

	let searchCourses = () => {
		if (searchTerm !== '')
			return mockedCoursesList.filter((course) => {
				const lowercaseQuery = searchTerm.toLowerCase();
				const lowercaseTitle = course.title.toLowerCase();
				const lowercaseId = course.id.toLowerCase();

				return (
					lowercaseTitle.includes(lowercaseQuery) ||
					lowercaseId.includes(lowercaseQuery)
				);
			});
		return mockedCoursesList;
	};
	useEffect(() => {
		if (searchTerm === '') {
			setFilteredCourseList(mockedCoursesList);
		}
	}, [searchTerm]);

	return (
		<div>
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
							let author = mockedAuthorsList.find((author) => {
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
								key={course.id}
							></CourseCard>
						);
					})}
				</>
			) : (
				<CreateCourse
					setShowAddCourseView={setShowAddCourseView}
					authors={mockedAuthorsList}
				></CreateCourse>
			)}
		</div>
	);
};
