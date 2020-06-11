import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Users from './Users';

function Header() {
	const [showResults, setShowResults] = useState(false);
	const [users, setUsers] = useState([]);
	const [username, setUserName] = useState('');
	const [usernameFromButtonClick, setUserNameByButtonClick] = useState('');
	const handleClick = () => {
		setUserNameByButtonClick(username);
		setShowResults(true);
		setUserName('');
	};
	useEffect(() => {
		axios
			.get(`https://api.github.com/search/users?q=${usernameFromButtonClick}`)
			.then((res) => {
				console.log(res.data.items);
				setUsers(res.data.items);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [usernameFromButtonClick]);
	return (
		<>
			<div className='header has-text-white'>
				<h1 className='is-size-3 has-text-centered mx-3'>GitHub LookBook</h1>
			</div>
			<div className='card container'>
				<h1 className='is-size-3 has-text-weight-bold has-text-centered'>
					<img
						src='https://github.githubassets.com/images/icons/emoji/octocat.png'
						alt=''
					/>
					<br></br>
					Search By GitHub UserName
				</h1>
				<div className='field has-addons container'>
					<div className='control has-icons-left has-icons-right is-expanded'>
						<input
							type='text input'
							className='input is-dark is-medium'
							placeholder='Enter words to search'
							value={username}
							onChange={(e) => setUserName(e.target.value)}
						/>
						<span className='icon is-medium is-left'>
							<i className='fab fa-github'></i>
						</span>
					</div>
					<p className='control'>
						<button className='button is-dark is-medium' onClick={handleClick}>
							SEARCH
						</button>
					</p>
				</div>
			</div>
			{showResults && (
				<div className='container'>
					{users.map((user) => {
						return (
							<div className='card columns' key={user.login}>
								<div className='column is-half avatar'>
									<div class='card-image'>
										<figure class='image'>
											<img src={user.avatar_url} alt='user' />
										</figure>
									</div>
								</div>
								<div className='column is-half'>
									<h1 className='is-size-3 has-text-weight-bold'>
										{user.login}
									</h1>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</>
	);
}

export default Header;
