import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Jumbotron, Button, Nav, ListGroup} from 'react-bootstrap';
import {UserConsumer} from '../Context'

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';


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
    let quizes = this.state.quizes;
    let show_quizes = [];
    if (quizes.length > 0) {
      for (let i = 0; i < quizes.length; i++){
          show_quizes.push(
          // <Row>
          //   <h2>{quizes[i].title}</h2>
          //   <p>{quizes[i].description}</p>
          //   <Button>Take Quiz</Button>
          // </Row>
            <ListGroup.Item><Nav.Link href={"/quizs/"+quizes[i].id}>{quizes[i].title}</Nav.Link></ListGroup.Item>
          )
      }
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
                                {this.state.user.auth_token}
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