import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './RatingComponent';

const ProductComponent = ({ product }) => {
        return (
            <Card className='my-3 p-3 border-0 rounded-lg shadow'>
                <Link to={`/product/${product._id}`}>
                    <Card.Img src={product.image} variant='top' />
                </Link>

                <Card.Body>
                    <Link to={`/product/${product._id}`}>
                        <Card.Title as='div' >
                            <strong>{product.name}</strong>
                        </Card.Title>
                    </Link>

                    <Card.Text as='div'>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </Card.Text>

                    <Card.Text as='h3'>
                        ${product.price}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
}

export default ProductComponent;