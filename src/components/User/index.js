import React from 'react';
import * as ROUTES from '../../constants/routes';
import {  Button, Table, Jumbotron, Container, Row, Col} from 'react-bootstrap';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Redirect } from 'react-router-dom'

import Plotly from "plotly.js";

import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

const form_style = {
  paddingTop:"5%",
  paddingLeft:"15%",
  paddingRight:"15%",
  paddingBottom:"5%",
  backgroundColor:"lightblue",
  marginBottom:"5%"
};

const questions_div = {
  paddingTop:"5%",
  paddingLeft:"15%",
  paddingRight:"15%",
  paddingBottom:"5%",

  backgroundColor:"lightblue",
}

const main_jumbotron = {

  backgroundColor:"lightblue",
  marginTop: "50px",
  color:"white",
  textAlign:"center",
  padding:"100px"
};


class User extends React.Component {

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
      user_id:this.props.match.params.user_id,
      user_info:[],
      user_test_results:[],
      max_test_results:[]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
 
  async componentDidMount() {
    console.log(this.state.user_id)
    var url = `http://localhost:3000/api/v1/users/${this.state.user_id}`;
    const token = 'Bearer ' + this.state.user.auth_token;
    await fetch(url, {
      headers: {
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(json => this.setState({ user_info:json}));


      var user_results_url = `http://localhost:3000/api/v1/users/${this.state.user_id}/results`;
      await fetch(user_results_url, {
        headers: {
          Authorization: token
        }
      })
        .then(res => res.json())
        .then(json => this.setState({ user_test_results:json}));

      var max_results_url = `http://localhost:3000/api/v1/users/${this.state.user_id}/maxresults`;
      await fetch(max_results_url, {
        headers: {
          Authorization: token
        }
      })
        .then(res => res.json())
        .then(json => this.setState({ max_test_results:json}));
    
      
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
    if (!this.state.user || this.state.user.role != "ADMIN") {
      return (
          <Redirect to="/home" />
      )
  }
  
    let user_test_results = this.state.user_test_results;
    let show_user_test_results = [];
    if (user_test_results.length > 0) {
      for (let i = 0; i < user_test_results.length; i++){

        show_user_test_results.push(
            <tr >
              <td>{user_test_results[i].id}</td>
              <td>{user_test_results[i].quiz_name}</td>
              <td>{user_test_results[i].score}</td>
            </tr>
          )
      }
    }


    return (
            <div className={"main_class"}>

              <Jumbotron style={main_jumbotron}>
                <h2>{this.state.user_info.id}</h2>
                <h1>{this.state.user_info.name}</h1>
                <h2>{this.state.user_info.email}</h2>
              </Jumbotron>
              <Container>
                    <Row>
                      <Col >
                      <Plot
                            data={[
                                {type: 'bar', x: Object.keys(this.state.max_test_results), y: Object.values(this.state.max_test_results)},
                            ]}
                            layout={ {width: 1000, height: 500, title: 'Max Quiz Scores'} }
                          />
                      </Col>
                    

                  </Row>
            
              </Container>

                <div style={questions_div }>
                <Table striped bordered hover>
                              <thead>
                                <tr>
                                  <th colSpan="4">Quiz Results of {this.state.user_info.name}</th>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                <th>Test Result ID</th>
                                <th>Quiz Name</th>
                                <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                            {show_user_test_results }
                            </tbody>
                            </Table>
 

                    
                </div>
            </div>

    );
  }
}
 
export default withCookies(User);