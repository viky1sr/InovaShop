import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import MessageBoxComponent from '../components/MessageBoxComponent';
import LoadingBoxComponent from '../components/LoadingBoxComponent';
import FormContainerComponent from '../components/FormContainerComponent';
import { login } from '../actions/UserActions';

const LoginScreen = ({ history, location }) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/' ;

    useEffect(() => {
       if(userInfo) {
           history.push(redirect)
       }
    },[history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault()
        //DISPATCH LOGIN
        dispatch(login(email,password))
    }

        return (
            <FormContainerComponent>
                <h1>Sign In</h1>
                {error && <MessageBoxComponent variant='danger'>{error}</MessageBoxComponent>}
                {loading && <LoadingBoxComponent />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email' >
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='enter your email' valaue={email}
                                      onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='password' >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='enter your password' valaue={password}
                                      onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Sign in
                    </Button>
                </Form>

                <Row className="py-3">
                    <Col>
                        New Customer ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'
                        }>Register</Link>
                    </Col>
                </Row>
            </FormContainerComponent>
        );
}

export default LoginScreen;