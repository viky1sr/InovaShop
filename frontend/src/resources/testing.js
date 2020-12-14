import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import MessageBoxComponent from '../components/MessageBoxComponent';
import LoadingBoxComponent from '../components/LoadingBoxComponent';
import {delettUser, getUserDetails, login, updateUserProfile} from '../actions/UserActions';
import { listMyOrders } from "../actions/OrderActions";
import {USER_DETAILS_SUCCESS, USER_UPDATE_RESET} from "../constants/UserConstants";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

const ProfileScreen = ({ history, match }) => {
    const userId = match.params.id

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirm_password, setConfirmPassword ] = useState('');
    const [ message, ] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin

    const userUpdate = useSelector((state) => state.userUpdate);
    const { success, error } = userUpdate

    const orderMyList = useSelector((state) => state.orderMyList);
    const { loading:loadingOrders, error:errorOrders, orders } = orderMyList

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
            if(!user || !user.name) {
                dispatch({ type: USER_UPDATE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch, history, userInfo, user]);

    // if (success === true ) {
    //     toast('Success Update Profile', {
    //         position: "top-right",
    //         type: 'success',
    //         autoClose: 2000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //     });
    //     // window.location.reload()
    // }

    const test1 = dispatch(login(email,password));

    // console.log(submitAcc)
    // console.log(user)


    const submitHandler = (e) => {
        e.preventDefault()
        //DISPATCH REGISTER ( if not validasi in backend )
        // if(password !== confirm_password) {
        //     setMessage('Password do not match')
        // } else {
        //     dispatch(register(name, email, password, confirm_password))
        // }

        // DISPATCH REGISTER ( if do validasi in backend )

        const { value: password1 } =
            Swal.fire({
            title: 'Enter your password',
            input: 'password',
            inputLabel: 'Password',
            inputPlaceholder: 'Enter your password',
            inputAttributes: {
                maxlength: 255,
                autocapitalize: 'off',
                autocorrect: 'off'
            },
            inputValidator: (value) => {
                if (value !== user.password) {
                    Swal.fire(`Your password is incorrect: ${value}`)
                } else {
                    toast('Success Update Profile', {
                        position: "top-right",
                        type: 'success',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    dispatch(updateUserProfile( { id: user._id, name, email, password, confirm_password } ))
                }
            }
        })

    }

    return (
        <Row>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
            />
            <Col md={3}>
                <h1>Update Profile</h1>
                {message && <MessageBoxComponent variant='danger'>{message}</MessageBoxComponent>}
                {error && <MessageBoxComponent variant='danger'>{error}</MessageBoxComponent>}
                {/*{success && <MessageBoxComponent variant='success'>Success Update Profile</MessageBoxComponent>}*/}
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
                {loadingOrders ? <LoadingBoxComponent /> : errorOrders ? <MessageBoxComponent variant='danger'>{errorOrders}</MessageBoxComponent> :
                    (
                        <Table striped border hover responsive className='table-sm' >
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>{}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {userInfo ? orders.map( item => (
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{item.createdAt.substring(0, 10)}</td>
                                    <td>${item.totalPrice}</td>
                                    <td>{item.isPaid ?
                                        ( <i style={{color: 'green'}} > {item.paidAt.substring(0, 10)} </i> ):
                                        ( <i className='fas fa-times' style={{color: 'red'}} />) }
                                    </td>
                                    <td>{item.isDelivered ? item.deliveredAt.substring(0, 10) :
                                        ( <i className='fas fa-times' style={{color: 'red'}} />) }
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${item._id}`}>
                                            <Button variant='light' className='btn-outline-info btn-sm'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            )) : history.push('/login') }
                            </tbody>
                        </Table>
                    )
                }
            </Col>
        </Row>

    );
}

export default ProfileScreen;