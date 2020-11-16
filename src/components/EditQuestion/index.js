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

class EditQuestion extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
 
  constructor(props) {
    super(props);
 
    const { cookies } = props;
    this.state = {
      user: cookies.get('user'),
      loading: false,
      current_question:"",
      question:"",
      correct_answer:"",
      answer_1:"",
      answer_2:"",
      answer_3:"",
      answer_4:"",
      quiz_id:this.props.match.params.quiz_id
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
 
  async componentDidMount() {
    console.log(this.state.quiz_id)
    var url = `https://glacial-caverns-68634.herokuapp.com/api/v1/quizs/${this.props.match.params.quiz_id}/questions/${this.props.match.params.question_id}`;
    const token = 'Bearer ' + this.state.user.auth_token;
    await fetch(url, {
      headers: {
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(json => this.setState({ current_question:json, 
        question:json.question, 
        correct_answer:json.correct_answer,
        answer_1:json.answer_1,
        answer_2:json.answer_2,
        answer_3:json.answer_3,
        answer_4:json.answer_4,
    }));
      
  }


handleChange(event) { this.setState({ [event.target.name]: event.target.value });  }

async handleSubmit(event) {
  event.preventDefault();
  const { question, correct_answer, answer_1, answer_2, answer_3, answer_4, quiz_id } = this.state;
  const token = 'Bearer ' + this.state.user.auth_token;
    // POST request using fetch with async/await
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',
            Authorization: token
          },
        body: JSON.stringify({ question:question, correct_answer:correct_answer, answer_1:answer_1, answer_2:answer_2, answer_3: answer_3, answer_4:answer_4, quiz_id: quiz_id })
    };
    fetch(`https://glacial-caverns-68634.herokuapp.com/api/v1/quizs/${this.state.quiz_id}/questions/${this.state.current_question.id}`, requestOptions);

    this.props.history.push(`/quizs/${this.state.quiz_id}/edit`);
}

handleDelete(id){
    const token = 'Bearer ' + this.state.user.auth_token;
        // POST request using fetch with async/await
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json',
                Authorization: token
            }
        };
        fetch(`https://glacial-caverns-68634.herokuapp.com/api/v1/quizs/${this.state.quiz_id}/questions/${this.state.current_question.id}`, requestOptions);
   
        this.props.history.push(`/quizs/${this.state.quiz_id}/edit`);
  }

  render() {

    if (!this.state.user || this.state.user.role != "ADMIN") {
      return (
          <Redirect to="/home" />
      )
  }

    return (
            <div className={"main_class"}>
                
                <Form style={form_style }  onSubmit={this.handleSubmit} >
                <Form.Label>Edit Question Form</Form.Label>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control as="textarea" rows={3} value={this.state.question} name="question" onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control as="textarea" rows={3} value={this.state.correct_answer} name="correct_answer" onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control as="textarea" rows={3} value={this.state.answer_1} name="answer_1" onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control as="textarea" rows={3} value={this.state.answer_2} name="answer_2" onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control as="textarea" rows={3} value={this.state.answer_3}  name="answer_3" onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control as="textarea" rows={3} value={this.state.answer_4}  name="answer_4" onChange={this.handleChange} />
                </Form.Group>

                <Button variant="dark" type="submit">
                    Edit Question
                </Button>
                <Button onClick={this.handleDelete} variant="danger">Delete Question</Button>
                </Form>

                

            </div>

    );
  }
}
 
export default withCookies(EditQuestion);