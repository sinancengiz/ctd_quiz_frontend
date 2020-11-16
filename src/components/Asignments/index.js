import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Jumbotron, Button, Form, Col, Table} from 'react-bootstrap';
import {UserConsumer} from '../Context'
import { Redirect } from 'react-router-dom'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

const main_jumbotron = {

  backgroundColor:"lightblue",
  marginTop: "50px",
  color:"white",
  textAlign:"center",
  padding:"100px"
};

const quiz_div = {
  backgroundColor:"yellowgreen",
  width:"300px",
  borderRadius:"10px",
  padding:"20px",
  margin:"20px",
  textAlign:"center",
};

const form_style = {
  paddingTop:"10%",
  paddingLeft:"15%",
  paddingRight:"15%",
  paddingBottom:"10%",
  backgroundColor:"lightblue",
  margin:"10%",
  width:"80%"
}

const table_style = {
  margin:"10%",
  width:"80%"
}


class Assignments extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
 
  constructor(props) {
    super(props);
 
    const { cookies } = props;
    this.state = {
      user: cookies.get('user'),
      users: [],
      quizes:[],
      assignments:[],
      selected_quiz_id:1,
      selected_student_id:1
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.search_name = this.search_name.bind(this);
  }

  async componentDidMount() {

    if (!this.state.user ) {
      return (
          <Redirect to="/" />
      )
  }

    var url = "https://glacial-caverns-68634.herokuapp.com/api/v1/users";
    const token = 'Bearer ' + this.state.user.auth_token;
    await fetch(url, {
      headers: {
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(json => this.setState({ users:json}));


      var quizes_url = "https://glacial-caverns-68634.herokuapp.com/api/v1/quizs";
    //   const token = 'Bearer ' + this.state.user.auth_token;
      await fetch(quizes_url, {
        headers: {
          Authorization: token
        }
      })
        .then(res => res.json())
        .then(json => this.setState({ quizes:json}));

        var assignments_url = "https://glacial-caverns-68634.herokuapp.com/api/v1/assignments";
        //   const token = 'Bearer ' + this.state.user.auth_token;
            await fetch(assignments_url, {
            headers: {
                Authorization: token
            }
            })
            .then(res => res.json())
            .then(json => this.setState({ assignments:json}));
    

  }
  search_name(id, user_list){
        for (var i=0; i < user_list.length; i++) {
            if (user_list[i].id == id) {
                return user_list[i];
            }
        }
    };

  handleChange(event) { this.setState({ [event.target.name]: event.target.value });  }

  async handleSubmit(event) {
    event.preventDefault();
    const { selected_quiz_id, selected_student_id } = this.state;
    let current_quiz = await this.search_name(selected_quiz_id, this.state.quizes);
    const token = 'Bearer ' + this.state.user.auth_token;
      // POST request using fetch with async/await
      const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json',
          Authorization: token
        },
          body: JSON.stringify({ quiz_name: current_quiz.title, user_id: selected_student_id, quiz_id:selected_quiz_id })
      };
      await fetch(`https://glacial-caverns-68634.herokuapp.com/api/v1/users/${selected_student_id}/asignedquizs`, requestOptions);

      this.setState(prevState => ({
        assignments: [...prevState.assignments, { quiz_name: current_quiz.title, user_id : selected_student_id, quiz_id:selected_quiz_id , created_at:"just now added"}]
      }))
  }


   render() {

    if (!this.state.user || this.state.user.role != "ADMIN") {
      return (
          <Redirect to="/home" />
      )
  }

    let users = this.state.users;
    let show_users = [];
    if (users.length > 0) {
      for (let i = 0; i < users.length; i++){
          show_users.push(

                <div style={quiz_div}>
                    <h1>{users[i].name}</h1>
                    <Button href={`/users/${users[i].id}`} variant="primary">See Details</Button>
                </div>
          )
      }
    }

    let assignments = this.state.assignments;
    let assignments_list = [];
    if (assignments.length > 0) {
      for (let i = 0; i < assignments.length; i++){

        let current_user = this.search_name(assignments[i].user_id, this.state.users)
        let current_quiz = this.search_name(assignments[i].quiz_id, this.state.quizes)
        assignments_list.push(

          <tr >
          <td>{assignments[i].quiz_id}</td>
          <td>{current_quiz.title}</td>
          <td>{assignments[i].user_id}</td>
          <td>{current_user.name}</td>
          <td>{assignments[i].created_at}</td>
          </tr>
          )
      }
    }


    let quiz_options = [];
    let quizes = this.state.quizes;
    if (quizes.length > 0) {
      for (let i = 0; i < quizes.length; i++){
        quiz_options.push(
                <option value={parseInt(quizes[i].id)}>{quizes[i].title}</option>
          )
      }
    }

    let users_options = [];
    let all_users = this.state.users;
    if (all_users.length > 0) {
      for (let i = 0; i < all_users.length; i++){
        
        users_options.push(
                <option value={parseInt(all_users[i].id)}>{all_users[i].name}</option>
          )
      }
    }
    


    return (
      <UserConsumer>

        {context => {

            return (
                        <div className={"main_class"}>
                        <Jumbotron style={main_jumbotron}>
                            <h1>Assignments Page</h1>
                            <h2>Below You can assign assignments to students and see the unsubmited assignments</h2>
                        </Jumbotron>

                        <Form style={form_style } onSubmit={this.handleSubmit}>
                            <Form.Row>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Quiz</Form.Label>
                                <Form.Control as="select" name="selected_quiz_id" onChange={this.handleChange} >
                                    {quiz_options}
                                </Form.Control>
                              </Form.Group>

                              <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Student</Form.Label>
                                <Form.Control as="select"  name="selected_student_id" onChange={this.handleChange} >
                                    {users_options}
                                </Form.Control>
                              </Form.Group>

                              <Button variant="primary" type="submit">
                                Submit
                              </Button>

                            </Form.Row>
                          </Form>


                          <Table style={table_style}  striped bordered hover>
                            <thead>
                                <tr>
                                <th>Quiz ID</th>
                                <th>Quiz Name</th>
                                <th>Student ID</th>
                                <th>Student Name</th>
                                <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignments_list}
                            </tbody>
                            </Table>
                </div>
                );
        }}
      </UserConsumer>
    );
  }
}
 
export default withCookies(Assignments);