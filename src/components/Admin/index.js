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
  height:"300px",
  textAlign:"center",
  padding:"100px"
};

const quiz_div = {
  backgroundColor:"lightgreen",
  height:"150px",
  width:"300px",
  borderRadius:"10px",
  padding:"20px",
  margin:"20px",
  textAlign:"center",

};

class Admin extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
 
  constructor(props) {
    super(props);
 
    const { cookies } = props;
    this.state = {
      user: cookies.get('user'),
      quizes: []
    };
  }

  async componentDidMount() {

    var url = "http://localhost:3000/api/v1/quizs";
    const token = 'Bearer ' + this.state.user.auth_token;
    await fetch(url, {
      headers: {
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(json => this.setState({ quizes:json}));
    
      
  }
 
   render() {

    if (!this.state.user) {
      return (
          <Redirect to="/" />
      )
  }

    let quizes = this.state.quizes;
    let show_quizes = [];
    if (quizes.length > 0) {
      for (let i = 0; i < quizes.length; i++){
          show_quizes.push(

                <div style={quiz_div}>
                    <h1>{quizes[i].title}</h1>
                    <Button href={`/quizs/${quizes[i].id}/edit`} variant="success">Edit</Button>
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
                            <h2>In this Admin page you can add new quizes and update them!</h2>
                            <div>
                              <Button href={ROUTES.NEWQUIZ} variant="dark">Add New Quiz</Button>
                            </div>
                        </Jumbotron>
                        
                        <div class={"quizes_main_div"}>
                        {show_quizes}
                       
                        </div>


                       
                    </div>
                );
        }}
      </UserConsumer>
    );
  }
}
 
export default withCookies(Admin);