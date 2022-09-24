import Container from 'react-bootstrap/Container';
import RbeForm from '../components/form.js';
import Image from 'react-bootstrap/Image';

function Form() {
    const back_style = {
        background:
          "linear-gradient(white -11.61%, white 34.51%, #f8fdff 95.3%)",
        boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
      };
      
      const nav_style = {
        background: "white",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      };
      
      /* <Image fluid rounded src={require('./assets/miudos_a_votos.png')} style={nav_style} />*/
      /* <Image style={{ width: 5 + 'em' }} src={require('./assets/logo_visao.png')} />
                <Image style={{ width: 5 + 'em' }} src={require('./assets/logo_rbe.png')} />*/
      
      return (
        <div className="App" style={back_style}>
          <Container className="mt-5 mb-5">
            <Image fluid rounded src={require('../assets/miudos_a_votos.png')} style={nav_style} />
            <RbeForm />
          </Container>
        </div>
      );
}

export default Form;
