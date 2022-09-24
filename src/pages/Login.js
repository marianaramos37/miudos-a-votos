import '../App.css';

import LoginComponent from '../signIn.js';
import Container from 'react-bootstrap/Container';

function Login() {
  return (
    <div className="Login">
    <Container className="mt-3" >  
      <LoginComponent />
    </Container>
  </div>
  );
}

export default Login;
