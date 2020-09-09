import React from 'react';
import PropTypes from 'prop-types';

const CartCard = (props) => {
    const { totalProducts, totalValue, onFeed, title, label} = props;

    return(
        <div className="card" style={{width: '18rem', margin: 'auto'}}>
            <div className="card-body">
                <h1>{title}</h1>
                <h5 className="card-title">Total Products - {totalProducts}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Total Cart Value - {totalValue} </h6>
                {
                    onFeed ?
                    <a href='/checkout'><button className='btn btn-success'>Checkout</button></a> :
                    <a href='#'><button className='btn btn-success'>Make an order</button></a>
                }
            </div>
        </div>
    )
}

CartCard.defaultProps = {
    totalProducts: 0,
    title: "Your's Cart"
}

CartCard.propTypes = {
    totalProducts: PropTypes.number,
    totalValue:  PropTypes.string,
    onFeed: PropTypes.bool,
    title:  PropTypes.string,
    label: PropTypes.string
}

export { CartCard };