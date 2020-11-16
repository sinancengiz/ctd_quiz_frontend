import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Form, Button} from 'react-bootstrap';

const main_div = {
  paddingTop:"5%",
  paddingLeft:"10%",
  paddingRight:"10%",
}

const form_style = {
  paddingTop:"10%",
  paddingLeft:"15%",
  paddingRight:"15%",
  paddingBottom:"10%",
  backgroundColor:"lightblue",
}

class Signup extends React.Component {

    constructor(props) {
        super(props);
     
        this.state = {
          loading: false,
          name: "",
          auth_token:"",
          email:"",
          password:"",
          password_confirmation:"",  
          error:null
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
 
    handleChange(event) { this.setState({ [event.target.name]: event.target.value });  }
    
    async handleSubmit(event) {
      event.preventDefault();
      const { name, email, password ,password_confirmation} = this.state;
        // POST request using fetch with async/await
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name:name, email: email, password:password, password_confirmation: password_confirmation})
        };
        const response = await fetch('http://localhost:3000/signup', requestOptions);
        const data = await response.json();
        if(data.auth_token){
          this.props.history.push(ROUTES.SIGN_IN);
        }else{
          this.setState({error:data.message})
        }
        
        
    }

  render() {

    return (
            <div style={main_div}>
              
                <Form style={form_style }onSubmit={this.handleSubmit} >
                <h2 style={{color:"red"}}>{this.state.error}</h2>
                <br></br>
                <Form.Label>Signup Form</Form.Label>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control required type="text" placeholder="Username" name="name" onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Email Adress" name="email" onChange={this.handleChange}/>
                    <Form.Text required className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control required type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control required type="password" placeholder="Password Confirmation" name="password_confirmation" onChange={this.handleChange}/>
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