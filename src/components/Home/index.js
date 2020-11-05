import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Jumbotron, Button, Nav, ListGroup} from 'react-bootstrap';
import {UserConsumer} from '../Context'

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Redirect } from 'react-router-dom'


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
          <Button href={`/quizs/${quizes[i].id}`} variant="success">{quizes[i].title}</Button>
          )
      }
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
                        <Jumbotron id={"landing_jumbotron"}>
                            <h1>Home Page</h1>
                            <p>
                                This is home page.
                            </p>
                            <p>
                                {this.state.user ? this.state.user.auth_token : "loading"}
                            </p>
                            <p>
                                {admin_button}
                            </p>
                            <p>
                                {this.state.quizes[0] ? this.state.quizes[0].title : "loading"}
                                {this.state.quizes[0] ? this.state.quizes[0].description : "loading"}
                            </p>

                        </Jumbotron>
                        <ListGroup>
                            {show_quizes}
                        </ListGroup>
                        
                    </div>
                );
        }}
      </UserConsumer>
    );
  }
}
 
export default withCookies(Home);