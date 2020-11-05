import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Form, Button} from 'react-bootstrap';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';


class EditQuiz extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
 
  constructor(props) {
    super(props);
 
    const { cookies } = props;
    this.state = {
      user: cookies.get('user'),
      loading: false,
      quiz:"",
      title:"",
      description:"",
      quiz_id:this.props.match.params.quiz_id,
      questions:[]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
 
  async componentDidMount() {
    console.log(this.state.quiz_id)
    var url = `http://localhost:3000/api/v1/quizs/${this.state.quiz_id}`;
    const token = 'Bearer ' + this.state.user.auth_token;
    await fetch(url, {
      headers: {
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(json => this.setState({ quiz:json, title:json.title, description:json.description}));


      var questions_url = `http://localhost:3000/api/v1/quizs/${this.state.quiz_id}/questions`;
      await fetch(questions_url, {
        headers: {
          Authorization: token
        }
      })
        .then(res => res.json())
        .then(json => this.setState({ questions:json}));
    
      
  }


handleChange(event) { this.setState({ [event.target.name]: event.target.value });  }

async handleSubmit(event) {
  event.preventDefault();
  const { title, description } = this.state;
  const token = 'Bearer ' + this.state.user.auth_token;
    // POST request using fetch with async/await
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',
            Authorization: token
          },
        body: JSON.stringify({ title: title, description:description })
    };
    fetch(`http://localhost:3000/api/v1/quizs/${this.state.quiz_id}`, requestOptions);

    this.props.history.push(ROUTES.ADMIN);
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
        fetch(`http://localhost:3000/api/v1/quizs/${this.state.quiz_id}`, requestOptions);
   
        this.props.history.push(ROUTES.ADMIN);
  }

  render() {
    let questions = this.state.questions;
    let show_questions = [];
    if (questions.length > 0) {
      for (let i = 0; i < questions.length; i++){
        show_questions.push(
                <div>
                     <h1>{questions[i].question}</h1>
                    <Button href={`/quizs/${this.state.quiz_id}/questions/${questions[i].id}`} variant="success">Edit</Button>
                </div>
          )
      }
    }


    return (
            <div className={"main_class"}>
                
                <Form className={"form_class"} onSubmit={this.handleSubmit} >
                
                <Form.Label>Edit Quiz Form</Form.Label>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" value= {this.state.title}  name="title" onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control as="textarea" rows={3} value= {this.state.description} name="description" onChange={this.handleChange} />
                </Form.Group>

                <Button variant="dark" type="submit">
                    Edit Quiz
                </Button>
                </Form>
                <Button onClick={this.handleDelete} variant="danger">Delete Quiz</Button>


                <div className={"questions_div"}>
                <Button href={`/quizs/${this.state.quiz_id}/questions/`} variant="success">Add New Question</Button>
                    {show_questions }
                </div>
            </div>

    );
  }
}
 
export default withCookies(EditQuiz);