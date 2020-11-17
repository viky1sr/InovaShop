import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import MessageBoxComponent from '../components/MessageBoxComponent';
import LoadingBoxComponent from '../components/LoadingBoxComponent';
import {getUserDetails, register, updateUserProfile} from '../actions/UserActions';
import FormContainerComponent from "../components/FormContainerComponent";

const ProfileScreen = ({ history, location }) => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirm_password, setConfirmPassword ] = useState('');
    const [ message, setMessage ] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin

    const userUpdate = useSelector(state => state.userUpdate);
    const { success, error } = userUpdate


    console.log()

    useEffect(() =>     {
        if(!userInfo) {
            history.push('/login')
        } else {
            if(!user || !user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                console.log(user)
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch, history, userInfo, user]);


    const submitHandler = (e) => {
        e.preventDefault()
        //DISPATCH REGISTER ( if not validasi in backend )
        // if(password !== confirm_password) {
        //     setMessage('Password do not match')
        // } else {
        //     dispatch(register(name, email, password, confirm_password))
        // }

        // DISPATCH REGISTER ( if do validasi in backend )
        dispatch(updateUserProfile( { id: user._id, name, email, password, confirm_password } ))
    }

    return (
        <Row>
            <Col md={3}>
                <h1>Update Profile</h1>
                {message && <MessageBoxComponent variant='danger'>{message}</MessageBoxComponent>}
                {error && <MessageBoxComponent variant='danger'>{error}</MessageBoxComponent>}
                {success && <MessageBoxComponent variant='success'>Success Update Profile</MessageBoxComponent>}
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
            </Col>
            <Col md={9}>
                <h2> My Orders </h2>
            </Col>
        </Row>

    );
}

export default ProfileScreen;