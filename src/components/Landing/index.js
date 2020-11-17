import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Jumbotron, Button} from 'react-bootstrap';

const landing_jumbotron = {
  
  // backgroundImage: `url(${sun_image})`,
  backgroundColor:"lightblue",
  marginTop: "50px",
  color:"white",
  minHeight: '600px',
  textAlign:"center",
  paddingTop: '200px',
  paddingBottom:"200px",

};

const landing_button = {
  margin:"10px",
}


class Landing extends React.Component {

  render() {

    return (
            <div className={"main_class"}>
                <Jumbotron style={landing_jumbotron}>
                    <h1>CTD Quiz App</h1>
                    <p>
                        Code The Dream Quiz App is designed to help students to test thier knowledge!
                    </p>
                    <p>
                        <Button style={landing_button} href={ROUTES.SIGN_IN} variant="dark">Sign In</Button>
                        <Button style={landing_button}  href={ROUTES.SIGN_UP} variant="dark">Sign Up</Button>
                    </p>

                </Jumbotron>
            </div>

    );
  }
}
 
export default Landing;