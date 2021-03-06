import React from 'react';
import { Jumbotron, Button} from 'react-bootstrap';
import {UserConsumer} from '../Context'

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

const landing_jumbotron = {
  backgroundColor:"lightblue",
  marginTop: "50px",
  color:"white",
  minHeight: '600px',
  textAlign:"center",
  paddingTop: '200px',
  paddingBottom:"200px",
};

class Quiz extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
 
  constructor(props) {
    super(props);
 
    const { cookies } = props;
    this.state = {
      user: cookies.get('user'),
      quiz: [],
    };
  }

  componentDidMount() {

    var url = `https://glacial-caverns-68634.herokuapp.com/api/v1/quizs/${this.props.match.params.quiz_id}`;
    const token = 'Bearer ' + this.state.user.auth_token;
    fetch(url, {
      headers: {
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(json => this.setState({ quiz:json }));
    

  }
 

   render() {

    return (
      <UserConsumer>

        {context => {

            return (
                        <div className={"main_class"}>
                        <Jumbotron style={landing_jumbotron}>
                            <h1>{this.state.quiz.title}</h1>
                            <p>
                                {this.state.quiz.description}
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