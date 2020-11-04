import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Jumbotron, Button, Row, Col} from 'react-bootstrap';
import {UserConsumer} from '../Context'

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Answer from "../Answer";
import Result from "../Result"



class Question extends React.Component {

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
      answer_clicked:false,
      answer_style:["answer_div","answer_div","answer_div","answer_div"],
      question_answered:false,
      results:[],
      quiz_finished:false,
    };
    this.handleAnswerClicked = this.handleAnswerClicked.bind(this);
    this.handleNextClicked = this.handleNextClicked.bind(this);
    this.handleFinishClicked = this.handleFinishClicked.bind(this);
  }

  async componentDidMount() {
    const token = 'Bearer ' + this.state.user.auth_token;
    const response = await fetch(`http://localhost:3000/api/v1/quizs/1/questions`, {
              headers: {
                Authorization: token
              }
            });
    const json = await response.json();
    this.setState({ questions: json });
  }

handleAnswerClicked (answer, c_answer, id){
    console.log(answer)
    console.log(c_answer)
    this.setState({answer_clicked:true})
    if(this.state.answer_clicked == false){
        if(answer == c_answer){

            let answer_style = [...this.state.answer_style];
            // 2. Make a shallow copy of the item you want to mutate
            let item = {...answer_style[id]};
            // 3. Replace the property you're intested in
            item = 'correct_answer';
            // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
            answer_style[id] = item;
            // 5. Set the state to our new copy
            this.setState({answer_style});

            this.setState({
              results: this.state.results.concat('correct')
            })
        }
        else{
            let answer_style = [...this.state.answer_style];
            // 2. Make a shallow copy of the item you want to mutate
            let item = {...answer_style[id]};
            // 3. Replace the property you're intested in
            item = 'wrong_answer';
            // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
            answer_style[id] = item;
            // 5. Set the state to our new copy
            this.setState({answer_style});

            this.setState({
              results: this.state.results.concat('wrong')
            })

        }
    }
}

handleNextClicked (){
  if(this.state.answer_clicked == true){
    if( this.state.current_q_index < this.state.questions.length - 1){
        this.setState( prevState => {
            return {
            current_q_index: prevState.current_q_index + 1,
            
            }
        })
        this.setState({answer_clicked:false})
        this.setState({answer_style:["answer_div","answer_div","answer_div","answer_div"]})
    }
    console.log(this.state.current_q_index)
    console.log(this.state.questions.length)
  }else{
    alert("Please answer the Question before move next!")
  }
}

handleFinishClicked(){
  if(this.state.answer_clicked == true){
    this.setState({answer_clicked:false})
    this.setState({quiz_finished:true})
    // this.props.history.push("/result");
  }

}


   render() {
       let current_question = []
       if(this.state.questions[0]){
        let question = this.state.questions[this.state.current_q_index];
            current_question.push(
                <div className={"question_main"}>
                    <h2 className={"question_header"}>Q{this.state.current_q_index +1}: {question.question}</h2>
                    <Answer id={0} answer_style = {this.state.answer_style[0]} answer_clicked={this.state.answer_clicked} answer={question.answer_1} handleAnswerClicked = {this.handleAnswerClicked} c_answer={question.correct_answer}></Answer>
                    <Answer id={1} answer_style = {this.state.answer_style[1]} answer_clicked={this.state.answer_clicked} answer={question.answer_2} handleAnswerClicked = {this.handleAnswerClicked} c_answer={question.correct_answer}></Answer>
                    <Answer id={2} answer_style = {this.state.answer_style[2]} answer_clicked={this.state.answer_clicked} answer={question.answer_3} handleAnswerClicked = {this.handleAnswerClicked} c_answer={question.correct_answer}></Answer>
                    <Answer id={3} answer_style = {this.state.answer_style[3]} answer_clicked={this.state.answer_clicked} answer={question.answer_4} handleAnswerClicked = {this.handleAnswerClicked} c_answer={question.correct_answer}></Answer>
                </div>

            )
          }

    
    return (

      <UserConsumer>
        {context => {

            return (
              
                        <div className={"main_class"}>
                          {this.state.quiz_finished == false ?
                          <div>
                          <Jumbotron id={"landing_jumbotron"}>
                          <h1>This is Question Page</h1>
                          <p>
                              Questions.
                          </p>
                          <p>
                              {this.state.user.auth_token}
                          </p>
                          <p>
                          </p>

                          </Jumbotron>
                          {current_question }
                          <Row>
                            <Col xs={9}>
                            
                            </Col>
                            <Col xs={3}>
                            { this.state.questions.length == this.state.current_q_index +1 ?
                              <Button onClick={this.handleFinishClicked} variant="danger" >Finish</Button>
                              :
                              <Button onClick={this.handleNextClicked}>Next</Button>

                          }                            
                            </Col>

                          

                          </Row>
                          </div>

                          :

                          <Result results = {this.state.results} questions = {this.state.questions}></Result>
                        
                        
                        
                        }

                        
                    </div>

                    );
        }}
      </UserConsumer>
    );
  }
}
 
export default withCookies(Question);