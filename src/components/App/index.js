import React from 'react';
import { BrowserRouter as Router,   Route} from 'react-router-dom';
import {UserProvider} from "../Context" 
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import Signup from '../Signup';
import Signin from '../Signin';
import Home from '../Home';
import Quiz from '../Quiz';
import Asignedquiz from '../Asignedquiz';
import Question from '../Question';
import Result from '../Result';
import Admin from "../Admin";
import AllUsers from "../AllUsers";
import User from "../User";
import NewQuiz from "../NewQuiz";
import EditQuiz from "../EditQuiz"
import NewQuestion from "../NewQuestion"
import EditQuestion from "../EditQuestion"
 
import * as ROUTES from '../../constants/routes';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';


class App extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
 
  constructor(props) {
    super(props);
 
    const { cookies } = props;
    this.state = {
      user: cookies.get('user')
    };
  }
 
  handleUserChange(user) {
    const { cookies } = this.props;
 
    cookies.set('user', user, { path: '/' });
    this.setState({ user });
  }

  render(){
    const { user } = this.state;
  return (
    <UserProvider value={user}>
        <Router>
            <div id="app_div" >
            <Navigation />
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route exact path={ROUTES.SIGN_IN} component={Signin} />
            <Route exact path={ROUTES.SIGN_UP} component={Signup} />
            <Route exact path={ROUTES.HOME} component={Home} />
            <Route exact path={"/quizs/:quiz_id"} component={Quiz} />
            <Route exact path={ROUTES.ASIGNEDQUIZ} component={Asignedquiz} />
            <Route exact path={ROUTES.QUESTIONS} component={Question} />
            <Route exact path={ROUTES.RESULT} component={Result} />
            <Route exact path={ROUTES.ADMIN} component={Admin} />
            <Route exact path={ROUTES.ALLUSERS} component={AllUsers}/>
            <Route exact path={ROUTES.USER} component={User}/>
            <Route exact path={ROUTES.NEWQUIZ} component={NewQuiz}/>
            <Route exact path={ROUTES.EDITQUIZ} component={EditQuiz}/>
            <Route exact path={ROUTES.NEWQUESTION} component={NewQuestion}/>
            <Route exact path={ROUTES.EDITQUESTION} component={EditQuestion}/>

            </div>
          </Router>
      </UserProvider>
  );
  }
}

export default withCookies(App);
