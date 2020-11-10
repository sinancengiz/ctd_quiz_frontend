import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Jumbotron, Button, Nav, ListGroup} from 'react-bootstrap';
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

const user_secondary = {
  display: "flex",
  flexWrap: "wrap",
  paddingLeft: "100px",
  paddingRight: "100px",

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
      assignments:[]
    };
    
  }

  async componentDidMount() {

    if (!this.state.user ) {
      return (
          <Redirect to="/" />
      )
  }

    var url = "http://localhost:3000/api/v1/users";
    const token = 'Bearer ' + this.state.user.auth_token;
    await fetch(url, {
      headers: {
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(json => this.setState({ users:json}));


      var quizes_url = "http://localhost:3000/api/v1/quizs";
    //   const token = 'Bearer ' + this.state.user.auth_token;
      await fetch(quizes_url, {
        headers: {
          Authorization: token
        }
      })
        .then(res => res.json())
        .then(json => this.setState({ quizes:json}));

        var assignments_url = "http://localhost:3000/api/v1/assignments";
        //   const token = 'Bearer ' + this.state.user.auth_token;
            await fetch(assignments_url, {
            headers: {
                Authorization: token
            }
            })
            .then(res => res.json())
            .then(json => this.setState({ assignments:json}));
    
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
        assignments_list.push(

                <div style={quiz_div}>
                    <h1>{assignments[i].quiz_name}</h1>
                    <h2>{assignments[i].quiz_id}</h2>
                    <h2>{assignments[i].user_id}</h2>
                </div>
          )
      }
    }
    


    return (
      <UserConsumer>

        {context => {

            return (
                        <div className={"main_class"}>
                        <Jumbotron style={main_jumbotron}>
                            <h1>Hi {this.state.user ? this.state.user.username : "loading"}</h1>
                            <h2>See all Users below</h2>
                        </Jumbotron>
                        
                        <div style={user_secondary}>
                        {show_users}
                        {assignments_list}
                        </div>


                       
                    </div>
                );
        }}
      </UserConsumer>
    );
  }
}
 
export default withCookies(Assignments);