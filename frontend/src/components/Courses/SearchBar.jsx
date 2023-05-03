import React from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import { ADD_COURSE_LABEL, SEARCH_LABEL } from '../../utils/constants';

export const SearchBar = ({
	setSearchTerm,
	setFilteredCourseList,
	setShowAddCourseView,
}) => {
	return (
		<div className='search-container'>
			<Input
				onChange={(e) => {
					setSearchTerm(e.target.value);
				}}
			/>
			<Button
				className={'button-search'}
				buttonText={SEARCH_LABEL}
				onClick={() => {
					setFilteredCourseList();
				}}
			></Button>
			<Button
				className={'button-add'}
				buttonText={ADD_COURSE_LABEL}
				onClick={() => {
					setShowAddCourseView(true);
				}}
			></Button>
		</div>
	);
};
