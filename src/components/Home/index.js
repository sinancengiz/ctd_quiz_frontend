import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Jumbotron, Button, Container} from 'react-bootstrap';
import {UserConsumer} from '../Context'

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Redirect } from 'react-router-dom'

const landing_jumbotron = {
  
  // backgroundImage: `url(${sun_image})`,
  backgroundColor:"lightblue",
  marginTop: "50px",
  color:"white",
  textAlign:"center",
  padding:"150px"
};

const quiz_button = {
  margin:"10px",
  width:"250px",
  hieght:"250px",
}

const asigned_quiz_div_style = {
  textAlign:"center",
}

class Home extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
 
  constructor(props) {
    super(props);
 
    const { cookies } = props;
    this.state = {
      user: cookies.get('user'),
      quizes: [],
      asigned_quizes:[],
    };
  }

  async componentDidMount() {
    if (!this.state.user) {
      return (
          <Redirect to="/" />
      )
  }

    var url = "http://localhost:3000/api/v1/quizs";
    const token = 'Bearer ' + this.state.user.auth_token;
    await fetch(url, {
      headers: {
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(json => this.setState({ quizes:json }));
    

      var asigned_quizes_url = `http://localhost:3000/api/v1/users/${this.state.user.user_id}/asignedquizs`;
      await fetch(asigned_quizes_url, {
        headers: {
          Authorization: token
        }
      })
        .then(res => res.json())
        .then(json => this.setState({ asigned_quizes:json }));

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
            // <ListGroup.Item><Nav.Link href={`/quizs/${quizes[i].id}`}>{quizes[i].title}</Nav.Link></ListGroup.Item>
          <Button style={quiz_button}  href={`/quizs/${quizes[i].id}`} variant="success">{quizes[i].title}</Button>
          )
      }
    }


    let asigned_quizes = this.state.asigned_quizes;
    let asigned_quiz_div = <div></div>;
    let show_asigned_quizes = [];
    if (asigned_quizes.length > 0) {
      for (let i = 0; i < asigned_quizes.length; i++){
          show_asigned_quizes.push(
            // <ListGroup.Item><Nav.Link href={`/quizs/${quizes[i].id}`}>{quizes[i].title}</Nav.Link></ListGroup.Item>
          <Button style={quiz_button}  href={`/quizs/${asigned_quizes[i].id}`} variant="danger">{asigned_quizes[i].quiz_name}</Button>
          )
      }
    }
    if (asigned_quizes.length > 0) {
          asigned_quiz_div = <Container style={asigned_quiz_div_style}>
            <h2>You have quizes to take, Lets take them!</h2>
            {show_asigned_quizes}
            <br>
            </br>
            <br>
            </br>
          </Container>
    }

    let user = this.state.user;
    let admin_button = [];
    if (user.role == "ADMIN") {
        admin_button.push(
            <Button href={ROUTES.ADMIN}> You are an Admin Go to Admin Page</Button>
          )
    }


    return (
      <UserConsumer>

        {context => {

            return (
                        <div className={"main_class"}>
                        <Jumbotron  style={landing_jumbotron}>
                            <h1>Welcome {this.state.user.username.toUpperCase()}</h1>
                            <p>
                                This is your home page. Below you can find quizes to test your skills.
                            </p>
                            <p>
                                {admin_button}
                            </p>

                        </Jumbotron>
                            
                            {asigned_quiz_div}
                            {show_quizes}

                        
                    </div>
                );
        }}
      </UserConsumer>
    );
  }
}
 
export default withCookies(Home);