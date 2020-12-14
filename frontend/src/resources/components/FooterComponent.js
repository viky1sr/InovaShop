import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const FooterComponent = () => {
    const productList = useSelector( state => state.productList)
    const { error} = productList

    if(error === 'Request failed with status code 500' || error ==='connect ECONNREFUSED 127.0.0.1:27017') {
        setTimeout(() => {
            window.location.reload(true)
     },10000)
    }

    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; InovaShop
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default FooterComponent;