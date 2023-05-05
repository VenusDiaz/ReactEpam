import React, { useEffect, useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import {
	ADD_AUTHOR_LABEL,
	CANCEL_CREATE_COURSE_LABEL,
	CREATE_AUTHOR_LABEL,
	CREATE_COURSE_LABEL,
	DELETE_AUTHOR_LABEL,
} from '../utils/constants';
import { formatDuration } from '../utils/utilities';
import { v4 as uuidv4 } from 'uuid';
import {
	useAddCourseMutation,
	useAddAuthorMutation,
	useGetAllAuthorsQuery,
} from '../redux/courses-app-api/api';
import { Header } from '../components/Header';
import { useNavigate } from 'react-router-dom';

export const CreateCourse = () => {
	const [duration, setDuration] = useState(0);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [selectedAuthors, setSelectedAuthors] = useState([]);
	const [newAuthors, setNewAuthors] = useState([]);
	const [newAuthor, setNewAuthor] = useState('');
	const [addCourse, { error: errorCourse }] = useAddCourseMutation();
	const [addAuthor, { error: errorAuthor }] = useAddAuthorMutation();
	const { data: authorsData } = useGetAllAuthorsQuery();
	const navigate = useNavigate();

	useEffect(() => {
		if (errorCourse !== undefined)
			alert(`Course ERROR with: ${JSON.stringify(errorCourse)}`);
		if (errorAuthor !== undefined)
			alert(`Author ERROR with: ${JSON.stringify(errorAuthor)}`);
	}, [errorCourse, errorAuthor]);

	return (
		<>
			<Header></Header>
			<div className='add-course-container' data-testid='add-course-container'>
				<div className='add-title-section'>
					<div className='add-title'>
						<h3>Title: </h3>
						<Input
							placeholder='Add title here...'
							name='title'
							className='add-input'
							onChange={(e) => {
								setTitle(e.target.value);
							}}
						></Input>
					</div>
					<div className='add-button'>
						<Button
							buttonText={CREATE_COURSE_LABEL}
							onClick={async () => {
								if (title === '') {
									alert('Invalid Title');
									return;
								}
								if (description === '') {
									alert('Invalid Description');
									return;
								}
								if (selectedAuthors.length === 0 && newAuthors.length === 0) {
									alert('Authors are empty');
									return;
								}
								let newAuthorsIds = await Promise.all(
									newAuthors.map(async (author) => {
										let response = await addAuthor({ name: author.name });

										if (response.data.successful)
											return response.data.result.id;
									})
								);

								let oldAuthors = selectedAuthors.map((author) => {
									return author.id;
								});

								let response = await addCourse({
									title: title,
									description: description,
									duration: Number.parseInt(duration),
									authors: newAuthorsIds.concat(oldAuthors),
								});
								if (response.data.successful) navigate('/');
							}}
							className='add-button-container'
						></Button>
						<Button
							buttonText={CANCEL_CREATE_COURSE_LABEL}
							onClick={() => {
								navigate('/');
							}}
							className='add-button-container'
						></Button>
					</div>
				</div>
				<div className='add-description-section'>
					<h3>Description: </h3>
					<textarea
						onChange={(e) => {
							setDescription(e.target.value);
						}}
						id='story'
						name='story'
						rows='5'
						cols='50'
					></textarea>
				</div>
				<div className='add-authors-section'>
					<div className='authors-duration-section'>
						<div className='author-creation-section'>
							<h2>Add Author</h2>
							<h3>Author name: </h3>
							<Input
								placeholder='Enter author here...'
								name='author'
								className='add-author'
								onChange={(e) => {
									setNewAuthor(e.target.value);
								}}
							></Input>
							<Button
								onClick={() => {
									if (newAuthor !== '')
										setNewAuthors([
											...newAuthors,
											{ name: newAuthor, id: uuidv4() },
										]);
								}}
								buttonText={CREATE_AUTHOR_LABEL}
								className='add-author-button'
							></Button>
						</div>
						<div className='duration-creation-section'>
							<h3>Duration: </h3>
							<Input
								placeholder='Enter duration in minutes...'
								name='duration'
								className='add-duration'
								value={duration}
								onChange={(e) => {
									if (!isNaN(e.target.value)) setDuration(e.target.value);
								}}
							></Input>
							<h1>{formatDuration(duration)}</h1>
						</div>
					</div>
					<div className='add-existing-author-section'>
						<div>
							{authorsData?.result?.map((author) => {
								return (
									<div className='add-existing-author'>
										<h3>{author.name}</h3>
										<Button
											className='add-author'
											onClick={() => {
												let index = selectedAuthors.findIndex(
													(aut) => aut.id === author.id
												);
												if (index < 0)
													setSelectedAuthors([...selectedAuthors, author]);
											}}
											buttonText={ADD_AUTHOR_LABEL}
										></Button>
									</div>
								);
							})}
						</div>
						<div className='author-list-section'>
							<h3 style={{ textAlign: 'center' }}>Course Authors</h3>
							{selectedAuthors.length === 0 && newAuthors.length === 0 ? (
								<span>Author list is empty</span>
							) : (
								<>
									{selectedAuthors.map((author) => {
										return (
											<div className='add-existing-author'>
												<h3>{author.name}</h3>
												<Button
													className='add-author'
													onClick={() => {
														setSelectedAuthors(
															selectedAuthors.filter(
																(item) => item.id !== author.id
															)
														);
													}}
													buttonText={DELETE_AUTHOR_LABEL}
												></Button>
											</div>
										);
									})}
									{newAuthors.map((author) => {
										return (
											<div className='add-existing-author'>
												<h3>{author.name}</h3>
												<Button
													className='add-author'
													onClick={() => {
														setNewAuthors(
															newAuthors.filter((item) => item.id !== author.id)
														);
													}}
													buttonText={DELETE_AUTHOR_LABEL}
												></Button>
											</div>
										);
									})}
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
