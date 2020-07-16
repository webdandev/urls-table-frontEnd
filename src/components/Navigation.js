import React from 'react';
import './Navigation.css'; 

const Navigation = ({ onRouteChange, isSignedIn }) => {
	if (isSignedIn) {
		return (			
			<nav>
				<p onClick={() => onRouteChange('insert')}>
					<a>Insert</a></p>
				<p onClick={() => onRouteChange('display')}><a>Display</a></p>
				<p onClick={() => onRouteChange('signin')}>
					<a>Sign-Out</a></p>
			</nav>
		);
	} else {
		return (
			<nav>					
				<p onClick={() => onRouteChange('signin')}>
					<a className="textdec">Sign in</a></p>
				<p onClick={() => onRouteChange('register')}>
					<a>Register</a></p>
			</nav>
		);
	}
	
}

export default Navigation;

// <nav style={{display: 'flex', justifyContent: 'flex-end'}}>	
//style={{textDecoration: 'none'}}