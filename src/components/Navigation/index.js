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
    return (
        <Navbar>
        <Navbar.Brand href={ROUTES.LANDING}>CTD Quiz App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            { !cookies.user ?  
                      <Navbar.Text>
                      <Button onClick={this.onLogout}>Log Out</Button>
                    </Navbar.Text>         :
                    <p></p>
            }

        </Navbar.Collapse>
      </Navbar>

    );
  }
}
 
export default withCookies(Navigation);