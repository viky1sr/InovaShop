import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import MessageBoxComponent from '../components/MessageBoxComponent';
import LoadingBoxComponent from '../components/LoadingBoxComponent';
import {listUsers} from "../actions/UserActions";

const UserListScreen = () => {
    const dispatch = useDispatch();

    const usersList = useSelector(state => state.usersList)
    const { loading, error, users } = usersList

    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch]);

    const deleteHandler = (id) => {
        console.log(`delete`)
    }

    return (
        <>
            <h1>Users</h1>
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
                                            <LinkContainer to={`/user/${item._id}/edit`}>
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