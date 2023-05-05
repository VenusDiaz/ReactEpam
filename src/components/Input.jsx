import React from 'react';

export const Input = ({
	placeholder = 'Search Term',
	name = 'searchbar',
	className = 'input-container',
	value,
	onChange,
}) => {
	return (
		<div className={className}>
			<label htmlFor={name}></label>
			<input
				onChange={onChange}
				className='search-input'
				name={name}
				value={value}
				placeholder={placeholder}
			></input>
		</div>
	);
};
