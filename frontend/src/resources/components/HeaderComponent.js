import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import CartPartialComponent from "./partials/header/CartPartialComponent";
import DropDownPartialComponent from "./partials/header/DropDownPartialComponent";
import SigInPartialComponent from "./partials/header/SigInPartialComponent";
import UserListPartialComponent from "./partials/header/UserListPartialComponent";

const HeaderComponent = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const usersList = useSelector((state) => state.usersList)
    const { error } = usersList


    if(error === 'Request failed with status code 500') {
        setTimeout(() => {
            window.location.reload(true)
        },10000)
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect >
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>InovaShop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                       <CartPartialComponent />
                        { userInfo ? ( <DropDownPartialComponent /> ) : (<SigInPartialComponent />) }
                        { userInfo && userInfo.data.isAdmin && ( <UserListPartialComponent /> ) }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default HeaderComponent;