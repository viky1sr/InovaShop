import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import MessageBoxComponent from '../components/MessageBoxComponent';
import LoadingBoxComponent from '../components/LoadingBoxComponent';
import {getUserDetails, updateUserAdmin} from '../actions/UserActions';
import FormContainerComponent from "../components/FormContainerComponent";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";
import {USER_UPDATE_ADMIN_RESET} from "../constants/UserConstants";

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdateAdmin = useSelector((state) => state.userUpdateAdmin)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdateAdmin

    console.log(user)

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: USER_UPDATE_ADMIN_RESET})
            toast('Update Successfully', {
                position: "top-right",
                type: 'success',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            })
            setTimeout(() => {
                history.push('/admin/user-list')
            },1300)
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, userId, user, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUserAdmin({ _id: userId, name, email, isAdmin }))
    }


    return (
        <>
            <Link className="btn btn-light my-3" to="/admin/user-list">
                Go Back
            </Link>
            <FormContainerComponent>
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
                <h1>Edit User</h1>
                {
                    loading ? <LoadingBoxComponent /> : error ? <MessageBoxComponent variant='danger'>{error}</MessageBoxComponent> :
                        (
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

                                <Form.Group controlId='isAdmin'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Check
                                        type='checkbox'
                                        label='Is Admin'
                                        value={isAdmin}
                                        checked={isAdmin}
                                        onChange={(e) => setIsAdmin(e.target.checked)}
                                    />
                                </Form.Group>


                                <Button type='submit'  variant='primary' disabled={successUpdate} >
                                    Update
                                </Button>
                            </Form>
                        )
                }
            </FormContainerComponent>
        </>
    );
}

export default UserEditScreen;