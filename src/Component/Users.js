import React, { useState, useEffect } from 'react';

const Users = (props) => {
	return (
		<>
			<div className='card'>
				<div className='columns'>
					<div className='column'>
						{props.items.map((item) => {
							return <h1>{item.login}</h1>;
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default Users;
