import React from 'react';

export const User = ({ user = 'Daniela' }) => {
	return <div className='user-container'>{user}</div>;
};
