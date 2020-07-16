import React, {Component} from 'react'

class Insert extends Component {
  constructor(props) {
  	super(props)

  	this.initialState = {
  	  name: '',
  	  url: '',
  	}

  	this.state = this.initialState
	}

	handleChange = event => {
	  const { name, value } = event.target

	  this.setState ({
	  	[name]: value,
	  })
	}

	submitForm = () => {
		if (this.state.name === "" || this.state.url === "") {
			return alert("Fields should not be empty");
		}		
		fetch('https://vast-sierra-35763.herokuapp.com/addlink', {
			method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        url: this.state.url,
        email: this.props.email,     
      })
    })
    .then(response => response.json())
    .then(data => {
    	if (data) {
    		console.log("data: ",data);
	    	this.props.updateDatabase(data);	    		    
	    } else {
	    	alert("something went wrong");
	    }
    })
	
    this.setState(this.initialState)
	}

	render() {
	  const { name, url } = this.state;

	  return (
	  	<form>
	  		<label>Name</label>
	  		<input
	  			type="text"
	  			name="name"
	  			value={name}
	  			onChange={this.handleChange} />
	  		<label>Url</label>
	  		<input
	  			type="text"
	  			name="url"
	 				value={url} 			
	 				onChange={this.handleChange} />
 				<input 
          type="button" 
          value="Submit" 
          onClick={this.submitForm} />
	 		</form>
	  );
	}
}

export default Insert;