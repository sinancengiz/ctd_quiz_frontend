import React from 'react';
import { Jumbotron, Button, Nav, ListGroup} from 'react-bootstrap';
import {UserConsumer} from '../Context'

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';


class Answer extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
 
  constructor(props) {
    super(props);
 
    const { cookies } = props;
    this.state = {
      user: cookies.get('user'),
      questions: [],
      current_q_index:0,
    };
    this.onAnswerClicked = this.onAnswerClicked.bind(this);
    
}


  onAnswerClicked(){
    this.props.handleAnswerClicked(this.props.answer,this.props.c_answer, this.props.id)
    // if(this.props.answer_clicked == false){
    //     if(this.props.answer == this.props.c_answer){
    //         this.setState({answer_style:"correct_answer"})
    //     }
    //     else{
    //         this.setState({answer_style:"wrong_answer"})
    //     }
    // }

  }

   render() {
   
            return (
                    <div disabled={this.props.disabled} onClick={this.onAnswerClicked}>
                    <p className= {this.props.answer_style} >{this.props.answer}</p>
                    </div>
                );

  }
}
 
export default withCookies(Answer);