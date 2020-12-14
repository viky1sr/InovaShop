import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import MessageBoxComponent from '../components/MessageBoxComponent';
import LoadingBoxComponent from '../components/LoadingBoxComponent';
import {delettUser, listUsers} from "../actions/UserActions";
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const usersList = useSelector((state) => state.usersList)
    const { loading, error, users } = usersList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector((state) => state.userDelete)
    const { success: successDelete } = userDelete

    console.log(users);

    useEffect(() => {
        if(userInfo) {
            dispatch(listUsers())
        } else {
            history.push(`/login`)
        }
    }, [ dispatch, history, successDelete ]);

    const deleteHandler = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(delettUser(id))
                toast('Deleted Successfully', {
                    position: "top-right",
                    type: 'success',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
    }


    return (
        <>
            <h1>Users</h1>
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
            {
                loading ? <LoadingBoxComponent /> : error ? <MessageBoxComponent variant='danger'>{error}</MessageBoxComponent> :
                    (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th>{}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map( item => (
                                    <tr key={item._id}>
                                        <td>{item._id}</td>
                                        <td>{item.name}</td>
                                        <td><a href={`mailto${item.email}`}>{item.email}</a></td>
                                        <td>
                                            {item.isAdmin ? (<i className='fas fa-check' style={{color: 'green'}} />) : (<i className='fas fa-times' style={{color: 'red'}} />)}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/admin/${item._id}/user-edit`}>
                                                <Button variant='light' className='btn btn-outline-warning btn-sm '>
                                                    <i className='fas fa-edit' />
                                                </Button>
                                            </LinkContainer>
                                            <Button variant='light' className='btn btn-outline-danger btn-sm ' onClick={() => deleteHandler(item._id)}>
                                                <i className='fa fa-trash' />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
            }
        </>
    );
}

export default UserListScreen;