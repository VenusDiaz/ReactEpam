import React from 'react';

export const Logo = ({ src, onClick }) => {
	return (
		<div className='logo-container' onClick={onClick}>
			<img
				data-testid='img-logo'
				width='70px'
				height='50px'
				alt='logo de la empresa'
				src={src}
			/>
		</div>
	);
};
