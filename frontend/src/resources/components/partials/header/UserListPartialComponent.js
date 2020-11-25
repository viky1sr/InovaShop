import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { NavDropdown } from "react-bootstrap";

const UserListPartialComponent = () => {
    return (
        <NavDropdown title='Admin' id='admin-menu'>
            <LinkContainer to='/admin/user-list'>
                <NavDropdown.Item> Users </NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/admin/product-list'>
                <NavDropdown.Item> Products </NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/admin/order-list'>
                <NavDropdown.Item> Orders </NavDropdown.Item>
            </LinkContainer>
        </NavDropdown>
    );
}

export default UserListPartialComponent;