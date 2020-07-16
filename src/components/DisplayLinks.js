import React from 'react';
import './DisplayLinks.css';

	const DeleteFromServer = (url) => {		
		fetch('https://vast-sierra-35763.herokuapp.com/deletelink', {
			method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({        
        url: url,       
      })
    })
    .then(response => console.log("RES: ", response.json()));   
	}

	const LinkList = (props) => {
		const rows = props.database.map((row ,index) => {
			return (				
        <li key={index}>
        	<a href={row.url} target="_blank">{row.name}</a>&nbsp;&nbsp;&nbsp;
        	<button 			
						onClick={ () => {DeleteFromServer(row.url); props.removeLink(index); }}>						
						Delete
					</button>
        </li>	             
      );
   	});   	   	   	
   	return (   		
   			<ul>{rows}</ul>   		
   	);   	
  }
		
	const DisplayLinks = ({ database, removeLink, email }) => {		
		return (
			<div className="outerdiv">				
				<p className="headline">Links Names</p>
				<p className="greet"> {`Hi ${email}, here are your urls:`} </p>	
				<div className="main-container">			    
				  <LinkList database = {database} removeLink = {removeLink}/>						   			 				 
		  	</div>
			</div>
		);	
	}

export default DisplayLinks;
