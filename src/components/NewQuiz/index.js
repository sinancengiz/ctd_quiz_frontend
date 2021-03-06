import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Form, Button} from 'react-bootstrap';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Redirect } from 'react-router-dom'

const form_style = {
  paddingTop:"10%",
  paddingLeft:"15%",
  paddingRight:"15%",
  paddingBottom:"10%",
  backgroundColor:"lightblue",
}


class NewQuiz extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
 
  constructor(props) {
    super(props);
 
    const { cookies } = props;
    this.state = {
      user: cookies.get('user'),
      loading: false,
      title:"",
      description:""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
 


handleChange(event) { this.setState({ [event.target.name]: event.target.value });  }

async handleSubmit(event) {
  event.preventDefault();
  const { title, description } = this.state;
  const token = 'Bearer ' + this.state.user.auth_token;
    // POST request using fetch with async/await
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            Authorization: token
          },
        body: JSON.stringify({ title: title, description:description })
    };
    fetch('https://glacial-caverns-68634.herokuapp.com/api/v1/quizs', requestOptions);

    this.props.history.push(ROUTES.ADMIN);
}


  render() {

    if (!this.state.user || this.state.user.role != "ADMIN") {
      return (
          <Redirect to="/home" />
      )
  }
    return (
            <div className={"main_class"}>
              
                <Form style={form_style } onSubmit={this.handleSubmit} >
                <Form.Label>New Quiz Form</Form.Label>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Title" name="title" onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control as="textarea" rows={3} placeholder="Description" name="description" onChange={this.handleChange} />
                </Form.Group>

                <Button variant="dark" type="submit">
                    Add Quiz
                </Button>
                </Form>

            </div>

    );
  }
}
 
export default withCookies(NewQuiz);