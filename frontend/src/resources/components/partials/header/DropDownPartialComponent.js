import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { NavDropdown } from "react-bootstrap";
import { logout } from "../../../actions/UserActions";

const DropDownPartialComponent = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userDetails = useSelector((state) => state.userDetails)
    const { user } = userDetails

    const userName = () => {
        return !user ? userInfo.data.name : user.name || userInfo.data.name;
    }

    const profileLink = () => {
        window.location.href = '/profile'
    }

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <NavDropdown title={userName()} id='username'>
            <LinkContainer  to='/profile'>
                <NavDropdown.Item onClick={profileLink}> Profile </NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={logoutHandler}>
                Logout
            </NavDropdown.Item>
        </NavDropdown>
    );
}

export default DropDownPartialComponent;