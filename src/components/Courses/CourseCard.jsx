import React from 'react';
import {
	AUTHORS_LABEL,
	CARD_BUTTON_LABEL,
	CREATED_LABEL,
	DURATION_LABEL,
} from '../../utils/constants';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import { formatDuration } from '../../utils/utilities';

export const CourseCard = ({
	title,
	description,
	authors,
	duration,
	created,
	id,
	isAdmin,
	deleteCourse,
}) => {
	const navigate = useNavigate();
	return (
		<div className='card-container' data-testid='card-container'>
			<div className='card-info-section'>
				<div className='card-title-container' data-testid='card-title'>
					<h2>{title}</h2>
				</div>
				<div
					className='card-description-container'
					data-testid='card-description'
				>
					<p>{description}</p>
				</div>
			</div>
			<div className='card-actions-section'>
				<div className='card-authors-container'>
					<b>{AUTHORS_LABEL}: </b>
					<span data-testid='card-authors'>{authors}</span>
				</div>
				<div className='card-duration-container'>
					<b>{DURATION_LABEL}: </b>
					<span data-testid='card-duration'>{formatDuration(duration)}</span>
				</div>
				<div className='card-created-container'>
					<b>{CREATED_LABEL}: </b>
					<span data-testid='card-created'>{created}</span>
				</div>
				<Button
					buttonText={CARD_BUTTON_LABEL}
					className='card-button'
					onClick={() => {
						navigate({
							pathname: `/courses/${id}`,
						});
					}}
				></Button>
				{isAdmin ? (
					<div className='action-button-card'>
						<button
							onClick={() => {
								deleteCourse(id);
							}}
						>
							Delete
						</button>{' '}
						<button
							onClick={() => {
								navigate(`/courses/update/${id}`);
							}}
						>
							Edit
						</button>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};
