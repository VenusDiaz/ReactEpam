import React from 'react';

export const Logo = ({ src }) => {
	return (
		<div className='logo-container'>
			<img width='70px' height='50px' alt='logo de la empresa' src={src} />
		</div>
	);
};
