import React from 'react';
import {
	AUTHORS_LABEL,
	CARD_BUTTON_LABEL,
	CREATED_LABEL,
	DURATION_LABEL,
} from '../../utils/constants';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
export const CourseCard = ({
	title,
	description,
	authors,
	duration,
	created,
	id,
}) => {
	const navigate = useNavigate();
	return (
		<div className='card-container'>
			<div className='card-info-section'>
				<div className='card-title-container'>
					<h2>{title}</h2>
				</div>
				<div className='card-description-container'>
					<p>{description}</p>
				</div>
			</div>
			<div className='card-actions-section'>
				<div className='card-authors-container'>
					<b>{AUTHORS_LABEL}: </b>
					<span>{authors}</span>
				</div>
				<div className='card-duration-container'>
					<b>{DURATION_LABEL}: </b>
					<span>{duration}</span>
				</div>
				<div className='card-created-container'>
					<b>{CREATED_LABEL}: </b>
					<span>{created}</span>
				</div>
				<Button
					buttonText={CARD_BUTTON_LABEL}
					className='card-button'
					onClick={() => {
						navigate(`info/${id}`);
					}}
				></Button>
			</div>
		</div>
	);
};
