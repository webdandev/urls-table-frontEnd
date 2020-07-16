import React, { useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import './RegisterHooks.css';

const RegisterHooks = (props) => {
	const { register, handleSubmit, errors } = useForm();
	const [isSubmited, setIsSubmited] = useState(false);
	const [details, setDetails] = useState({
		email: "",
		password: ""
	});

	const onSubmit = (data, e) => {
		setDetails(data);
		e.target.reset(data);
		setIsSubmited(true);
	}

	useEffect(() => {
    if (isSubmited) {
    	fetch('https://vast-sierra-35763.herokuapp.com/register', {
    		method: 'post',
    		headers: {'Content-Type': 'application/json'},
    		body: JSON.stringify({
    			email: details.email,
    			password: details.password
    		})
    	})			
    		.then(response => response.json())
    		.then(user => {
    			console.log("user: ", user);
    			if (user.id) {					
    				props.loadUser(user);
    				props.onRouteChange('insert');
    			} else {
    				alert("something went wrong");
    			}
    		})

    setIsSubmited(false);
  	}
	}, [isSubmited, details, setIsSubmited]);

	return (
		<div className="container-form">
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>Email</label>
				<input className="input-specific"				
					name="email"
					ref={register({
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "invalid email address"
            }
          })}
          autoComplete="off"					
				/>
				{errors.email && <p className="error-text">{errors.email.message}</p>}

				<label>Password</label>
				<input className="input-specific"
					name="password"
					type="password"
					ref={register({ required: true, minLength: 3 })}
					autoComplete="off"										
				/>
				{errors.password && <p className="error-text">at least 3 character</p>}

				<button type="submit" className="button-specific">Register</button>

			</form>
		</div>



	);



}




export default RegisterHooks;