import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Form, Button} from 'react-bootstrap';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';


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
    const response = await fetch('http://localhost:3000/auth/login', requestOptions);
    const data = await response.json();
    this.setState({
      auth_token: data.auth_token,
      
    });

  this.handleUserChange(data)
  console.log(this.state.auth_token)
  console.log(this.state.user)
  this.props.history.push('/home');
}


  render() {

    return (
            <div className={"main_class"}>
                <Form className={"form_class"} onSubmit={this.handleSubmit} >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.handleChange} />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                </Form.Group>

                <Button variant="dark" type="submit">
                    Submit
                </Button>
                </Form>

            </div>

    );
  }
}
 
export default withCookies(Signin);