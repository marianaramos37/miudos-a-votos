import './App.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

function SignIn() {
    const [userData, setUserData] = useState({username:"", password: "" })
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        setUserData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("fogo")

        if (userData.username === "" || userData.password === "") {
            setErrorMessage((prevState) => ({
                value: "Empty username/password field",
            }));

        } else if (
            userData.username.toLowerCase() === "admin" &&
            userData.password === "123456"
        ) {
            localStorage.setItem("isAuthenticated", "true");
            window.location.pathname = "/respostas";
        } else {

            setErrorMessage((prevState) => ({ value: "Invalid username/password" }));
            return;
        }
    };

    return (

        <Container className="mt-3" >
            <Form className="m-5" onSubmit={handleSubmit}>
                <h3 className="Auth-form-title">Sign In</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="text-start d-flex">Username</Form.Label>
                    <Form.Control type="text" name="username" placeholder="username" required onChange={handleInputChange} />
                    <Form.Label className="text-start d-flex mt-3">Password</Form.Label>
                    <Form.Control type="text" name="password" placeholder="password" required onChange={handleInputChange} />
                </Form.Group>
                <div className="d-grid gap-2">
                        <Button variant="success" type="submit" onClick={handleSubmit} >
                            Submeter
                        </Button>
                    </div>
            </Form>
        </Container>

    );
}

export default SignIn;
