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

    // console.log(userInfo.data.name)

    const userName = () => {
        return !user.name ? userInfo.data.name : user.name ;
    }

    const profileLink = () => {
        window.location.href = '/profile'
    }

    const logoutHandler = () => {
        dispatch(logout());
        window.location.href = '/'
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