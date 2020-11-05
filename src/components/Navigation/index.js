import React from 'react';
import * as ROUTES from '../../constants/routes';
import { Navbar , Button} from 'react-bootstrap';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Navigation extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
 
  constructor(props) {
    super(props);
 
    const { cookies } = props;
    this.state = {
      user: cookies.get('user'),
      login:false,
    };
    this.onLogout = this.onLogout.bind(this)
  }

  onLogout = (e) => {
    const { cookies } = this.props;
    cookies.remove('user', { path: '/' })
    window.location.href = '/';
  }

  render() {
    const { cookies } = this.props;
    let logout = [];
    if(cookies.get('user')){
      if(cookies.get('user').auth_token){
        logout.push(
          <Navbar.Text>
          <Button variant="dark" onClick={this.onLogout}>Log Out</Button>
        </Navbar.Text>  
        )
      }else{
        logout.push(<p></p>)
      }

    }else{
      logout.push(<p></p>)
    }

    return (
        <Navbar>
        <Navbar.Brand href={ROUTES.HOME}>CTD Quiz App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            {logout}

        </Navbar.Collapse>
      </Navbar>

    );
  }
}
 
export default withCookies(Navigation);