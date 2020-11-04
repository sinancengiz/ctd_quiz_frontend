import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Form, Button} from 'react-bootstrap';


class Signup extends React.Component {

    constructor(props) {
        super(props);
     
        this.state = {
          loading: false,
          name: "",
          auth_token:"",
          email:"",
          password:"",
          password_conformation:"",  
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
 
    handleChange(event) { this.setState({ [event.target.name]: event.target.value });  }
    
    async handleSubmit(event) {
      event.preventDefault();
      const { name, email, password ,password_conformation} = this.state;
        // POST request using fetch with async/await
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name:name, email: email, password:password, password_conformation: password_conformation})
        };
        const response = await fetch('http://localhost:3000/signup', requestOptions);
        const data = await response.json();
        // this.setState({
        //   auth_token: data.auth_token,
          
        // });
        
      
      this.props.history.push('/home');
    }

  render() {

    return (
            <div className={"main_class"} >
                <Form className={"form_class"} onSubmit={this.handleSubmit} >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" name="name" onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.handleChange}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" placeholder="Password Confirmation" name="password_conformation" onChange={this.handleChange}/>
                </Form.Group>

                <Button variant="dark" type="submit">
                    Sing Up
                </Button>
                </Form>

            </div>

    );
  }
}
 
export default Signup;