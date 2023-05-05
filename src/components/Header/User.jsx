import React from 'react';

export const User = ({ user = '' }) => {
	return (
		<div data-testid='user-container' className='user-container'>
			{user}
		</div>
	);
};
