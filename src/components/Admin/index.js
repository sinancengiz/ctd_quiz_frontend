import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Jumbotron, Button, Nav, ListGroup} from 'react-bootstrap';
import {UserConsumer} from '../Context'

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';


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
    let quizes = this.state.quizes;
    let show_quizes = [];
    if (quizes.length > 0) {
      for (let i = 0; i < quizes.length; i++){
          show_quizes.push(

                <div className="quiz_list_class">
                    <h1>{quizes[i].title}</h1>
                    <Button href={`/quizs/${quizes[i].id}/edit`} variant="success">Show</Button>
                </div>
          )
      }
    }
    


    return (
      <UserConsumer>

        {context => {

            return (
                        <div className={"main_class"}>
                        <Jumbotron id={"landing_jumbotron"}>
                            <h1>Admin Page</h1>
                            <p>
                                Welcome {this.state.user ? this.state.user.username : "loading"}
                            </p>
                            <p>
                                {this.state.user ? this.state.user.auth_token : "loading"}
                            </p>
                            <p>
                                {this.state.quizes[0] ? this.state.quizes[0].title : "loading"}
                                {this.state.quizes[0] ? this.state.quizes[0].description : "loading"}
                            </p>

                        </Jumbotron>
                        
                        <div class={"quizes_main_div"}>
                        {show_quizes}
                       
                        </div>
                        <div>
                        <Button href={ROUTES.NEWQUIZ} variant="primary">Add New Quiz</Button>
                        </div>

                       
                    </div>
                );
        }}
      </UserConsumer>
    );
  }
}
 
export default withCookies(Admin);