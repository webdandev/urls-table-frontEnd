import React, { Component } from 'react';
import Insert from './components/Insert';
import Navigation from './components/Navigation';
import DisplayLinks from './components/DisplayLinks';
import RegisterHooks from './components/RegisterHooks';
import SigninHooks from './components/SigninHooks';
import './App.css';

const initialState = {
	route: 'signin',					
	database: [],
	isSignedIn: false,
	user: {
		id: '',
		email: '',
		password: '',
		joined: '',
	}
} 

class App extends Component {
	constructor() {
		super();
		this.state = initialState;		
	}	

  loadUser = (data) => {
  	this.setState({user: {
  		id: data.id,
  		email: data.email,  		
  		joined: data.joined,
  	}})
	}

	removeLink = (index) => {
		const { database } = this.state;

		this.setState({
			database: database.filter((row, i) => {
				return i !== index;
			}),			
		})
	}

	onRouteChange = (route) => {
		if (route === 'signout') {   //It doesn't work at the moment - in devtools 
			this.setState(initialState) //u can still see the 'disconnected' user data/old State			
		}
		else if (route === 'display' || route === 'insert') {
			this.setState({isSignedIn: true})
		} else {
			this.setState({isSignedIn: false,
										database: []})
		}
    this.setState({route: route});
  }

  loadUserLinks = (links) => {
  	this.setState({database: links});
  	console.log ("database: ", this.state.database);
  }
  updateDatabase = (data) => {  	
  	this.setState({ database: [...this.state.database, data[0]] });
  	// this.setState(Object.assign(this.state.database, data));
  	// this.setState(Object.assign(this.state.user, { entries: count}))  	
  }

	render() {
		const { route, database, isSignedIn, user } = this.state;		
		return (
			<div className="container">
				<Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { route === 'insert'
        	? <div>							
							<Insert updateDatabase={this.updateDatabase} email={user.email} />
						</div>
					: (
						route === 'register'
						? <RegisterHooks loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
						: (
							route === 'signin' || route === 'signout'
							? <SigninHooks loadUser={this.loadUser} onRouteChange={this.onRouteChange}
								loadUserLinks={this.loadUserLinks}/>
							: (				
								<DisplayLinks database = {database} removeLink={this.removeLink}
									email={user.email}/>
								)
							)						
						)		
				}
			</div>
		)
	}
}

export default App