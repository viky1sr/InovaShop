import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import MessageBoxComponent from '../components/MessageBoxComponent';
import LoadingBoxComponent from '../components/LoadingBoxComponent';
import FormContainerComponent from '../components/FormContainerComponent';
import { register } from '../actions/UserActions';

const RegisterScreen = ({ history, location }) => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirm_password, setConfirmPassword ] = useState('');
    const [ message ] = useState(null);

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/' ;

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    },[history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault()
        //DISPATCH REGISTER ( if not validasi in backend )
        // if(password !== confirm_password) {
        //     setMessage('Password do not match')
        // } else {
        //     dispatch(register(name, email, password, confirm_password))
        // }

        // DISPATCH REGISTER ( if do validasi in backend )
        dispatch(register(name, email, password, confirm_password))
    }

    return (
        <FormContainerComponent>
            <h1>Sign Up</h1>
            {message && <MessageBoxComponent variant='danger'>{message}</MessageBoxComponent>}
            {error && <MessageBoxComponent variant='danger'>{error}</MessageBoxComponent>}
            {loading && <LoadingBoxComponent />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirm_password}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                    Have an Account ? {''}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/register'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainerComponent>
    );
}

export default RegisterScreen;