import React from 'react';
import { Form, Button} from 'react-bootstrap';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

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

class Signin extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
 
  constructor(props) {
    super(props);
 
    const { cookies } = props;
    this.state = {
      user: cookies.get('user'),
      loading: false,
      username: "",
      auth_token:"",
      email:"",
      password:"",
      error:null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
  }
 
  handleUserChange(user) {
    const { cookies } = this.props;
 
    cookies.set('user', user, { path: '/' });
    this.setState({ user });
  }


handleChange(event) { this.setState({ [event.target.name]: event.target.value });  }

async handleSubmit(event) {
  event.preventDefault();
  const { email, password } = this.state;
    // POST request using fetch with async/await
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password:password })
    };
    const response = await fetch('https://glacial-caverns-68634.herokuapp.com/auth/login', requestOptions);
    const data = await response.json();
    if(data.auth_token){
        this.setState({
          auth_token: data.auth_token,
        });
      this.handleUserChange(data)
      this.props.history.push('/home');
    }else{
      this.setState({error:data.message})
    }
  //   this.setState({
  //     auth_token: data.auth_token,
      
  //   });

  // this.handleUserChange(data)
  // this.props.history.push('/home');
}


  render() {

    return (
            <div style={main_div}>
    
                <Form  style={form_style } onSubmit={this.handleSubmit} >
                <h2 style={{color:"red"}}>{this.state.error}</h2>
                <br></br>
                <Form.Label>Login Form</Form.Label>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control required type="email" placeholder="Your Email" name="email" onChange={this.handleChange} />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control required type="password" placeholder="Your Password" name="password" onChange={this.handleChange} />
                </Form.Group>

                <Button variant="dark" type="submit">
                    Login
                </Button>
                </Form>

            </div>

    );
  }
}
 
export default withCookies(Signin);