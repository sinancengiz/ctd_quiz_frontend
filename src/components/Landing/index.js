import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Jumbotron, Button} from 'react-bootstrap';


class Landing extends React.Component {

  render() {

    return (
            <div className={"main_class"}>
                <Jumbotron id={"landing_jumbotron"}>
                    <h1>CTD Quiz APP!</h1>
                    <p>
                        This is a simple app to test knowledge.
                    </p>
                    <p>
                        <Button href={ROUTES.SIGN_IN} variant="dark">Sign In</Button>
                        <Button href={ROUTES.SIGN_UP} variant="dark">Sign Up</Button>
                    </p>

                </Jumbotron>
            </div>

    );
  }
}
 
export default Landing;