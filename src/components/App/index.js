import React from 'react';
import { BrowserRouter as Router,   Route} from 'react-router-dom';
import {UserProvider} from "../Context" 
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import Signup from '../Signup';
import Signin from '../Signin';
import Home from '../Home';
import Quiz from '../Quiz';
import Question from '../Question';
import Result from '../Result';

 
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
            <Route path={ROUTES.SIGN_IN} component={Signin} />
            <Route path={ROUTES.SIGN_UP} component={Signup} />
            <Route path={ROUTES.HOME} component={Home} />
            <Route path={"/quizs/:quiz_id"} component={Quiz} />
            <Route path={ROUTES.QUESTIONS} component={Question} />
            <Route path={ROUTES.RESULT} component={Result} />

              {/* 

              
              
              
              <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />

              <Route path={ROUTES.HOME} render={(props) => <HomePage{...props} authUser = {authUser}/>} />

              <Route path={ROUTES.ACCOUNT} component={AccountPage} />
              <Route path={ROUTES.ADMIN} component={AdminPage} /> */}
            </div>
          </Router>
      </UserProvider>
  );
  }
}

export default withCookies(App);
