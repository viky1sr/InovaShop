import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { NavDropdown } from "react-bootstrap";
import { logout } from "../../../actions/UserActions";

const DropDownPartialComponent = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <NavDropdown title={userInfo.data.name} id='username'>
            <LinkContainer to='/profile'>
                <NavDropdown.Item> Profile </NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={logoutHandler}>
                Logout
            </NavDropdown.Item>
        </NavDropdown>
    );
}

export default DropDownPartialComponent;