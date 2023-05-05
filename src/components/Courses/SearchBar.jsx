import React from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import { ADD_COURSE_LABEL, SEARCH_LABEL } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

export const SearchBar = ({ setSearchTerm, setFilteredCourseList }) => {
	const navigate = useNavigate();
	return (
		<div className='search-container' data-testid='search'>
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
					navigate('/courses/add');
				}}
			></Button>
		</div>
	);
};
