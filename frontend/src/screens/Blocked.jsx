import React from 'react';
import './Blocked.css';
import { Link } from 'react-router-dom';

const Blocked = () => {
	return (
		<div className='blocked-container'>
			<div>Blocked</div>
			<Link to={'/'}>Go Back</Link>
		</div>
	);
};

export default Blocked;
