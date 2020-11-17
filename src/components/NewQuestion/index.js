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

class NewQuestion extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
 
  constructor(props) {
    super(props);
 
    const { cookies } = props;
    this.state = {
      user: cookies.get('user'),
      loading: false,
      question:"",
      correct_answer:"",
      answer_1:"",
      answer_2:"",
      answer_3:"",
      answer_4:"",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
 


handleChange(event) { this.setState({ [event.target.name]: event.target.value });  }

async handleSubmit(event) {
  event.preventDefault();
  const { question, correct_answer, answer_1, answer_2, answer_3, answer_4 } = this.state;
  const token = 'Bearer ' + this.state.user.auth_token;
    // POST request using fetch with async/await
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            Authorization: token
          },
        body: JSON.stringify({ question: question, correct_answer:correct_answer ,answer_1:answer_1, answer_2:answer_2, answer_3:answer_3, answer_4:answer_4, quiz_id:this.props.match.params.quiz_id})
    };
    await fetch(`https://glacial-caverns-68634.herokuapp.com/api/v1/quizs/${this.props.match.params.quiz_id}/questions`, requestOptions);

    this.props.history.push(`/quizs/${this.props.match.params.quiz_id}/edit`);
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
                <Form.Label>New Question Form</Form.Label>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control as="textarea" rows={3} placeholder="Question" name="question" onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control as="textarea" rows={3} placeholder="Correct Answer - (Must be identical with one if the following answers)" name="correct_answer" onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control as="textarea" rows={3} placeholder="Answer A" name="answer_1" onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control as="textarea" rows={3} placeholder="Answer B" name="answer_2" onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control as="textarea" rows={3} placeholder="Answer C" name="answer_3" onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control as="textarea" rows={3} placeholder="Answer D" name="answer_4" onChange={this.handleChange} />
                </Form.Group>

                <Button variant="dark" type="submit">
                    Add Question
                </Button>
                </Form>

            </div>

    );
  }
}
 
export default withCookies(NewQuestion);