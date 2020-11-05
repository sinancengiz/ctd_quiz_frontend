import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Jumbotron, Button, Nav, ListGroup} from 'react-bootstrap';
import {UserConsumer} from '../Context'

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';


class Quiz extends React.Component {

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

  componentDidMount() {

    var url = "http://localhost:3000/api/v1/quizs";
    const token = 'Bearer ' + this.state.user.auth_token;
    fetch(url, {
      headers: {
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(json => this.setState({ quizes:json }));
    

  }
 

   render() {

    return (
      <UserConsumer>

        {context => {

            return (
                        <div className={"main_class"}>
                        <Jumbotron id={"landing_jumbotron"}>
                            <h1>This is quiz Page</h1>
                            <p>
                                Quizpage.
                            </p>
                            <p>
                                {this.state.user.auth_token}
                            </p>
                            <p>
                                <Button variant="secondary" href={`/api/v1/quizs/${this.props.match.params.quiz_id}/questions`}>Start Quiz</Button>
                            </p>

                        </Jumbotron>
                    </div>
                );
        }}
      </UserConsumer>
    );
  }
}
 
export default withCookies(Quiz);