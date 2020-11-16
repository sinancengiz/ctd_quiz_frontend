import React from 'react';
import { Jumbotron, Table} from 'react-bootstrap';
import {UserConsumer} from '../Context'

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

const landing_jumbotron = {
  
  // backgroundImage: `url(${sun_image})`,
  backgroundColor:"lightblue",
  marginTop: "50px",
  color:"white",
  textAlign:"center",
  padding:"50px"
};

class Result extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
 
  constructor(props) {
    super(props);
 
    const { cookies } = props;
    this.state = {
      user: cookies.get('user'),
    };
  }


   render() {
    let questions = this.props.questions
    let results = this.props.results

    let result_rows = [];
    if (questions.length > 0) {
      for (let i = 0; i < questions.length; i++){
        result_rows.push(
            <tr >
            <td>{questions[i].id}</td>
            <td>{questions[i].question}</td>
            <td>{questions[i].correct_answer}</td>
            <td>{results[i]}</td>
            </tr>
          )
      }
    }


    return (
      <UserConsumer>

        {context => {

            return (
                    <div className={"main_class"}>

                        <Jumbotron style={landing_jumbotron} >
                        <h2>Quiz Result - Great Job! You Scored {this.props.quiz_score}/100</h2>
                        </Jumbotron>
                            <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Question</th>
                                <th>Correct Answer</th>
                                <th>True/False</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result_rows}
                            </tbody>
                            </Table>
                        
                        
                    </div>
                );
        }}
      </UserConsumer>
    );
  }
}
 
export default withCookies(Result);