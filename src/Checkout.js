import React from 'react';
import axios from  'axios';
import { CartCard } from './CartCard';

export default class Checkout extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            cartItems: [],
            totalItems: null,
            totalValue: null
        }
    }

    componentDidMount(){
        let cartID = localStorage.getItem('cartID');

        axios({
            url: `https://api.chec.io/v1/carts/${cartID}/items`,
            method: 'GET',
            headers: {
                "X-Authorization": "pk_18797aad803e18b5c76f7bd068f8b010f00d7a57c4e33",
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }).then((response) => {
            this.setState({
                cartItems: response.data
            })
        }).catch((err) => {
            console.log(err)
        })


        axios({
            url: `https://api.chec.io/v1/carts/${cartID}`,
            method: 'GET',
            headers: {
                "X-Authorization": "pk_18797aad803e18b5c76f7bd068f8b010f00d7a57c4e33",
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }).then((response) => {
            this.setState({
                totalItems: response.data.total_unique_items,
                totalValue: response.data.subtotal.formatted_with_symbol
            })

        }).catch((err) => {
            console.log(err)
        })
    }

    handleDelete = (itemID) => {
        let cartID = localStorage.getItem('cartID');

        axios({
            url:  `https://api.chec.io/v1/carts/${cartID}/items/${itemID}`,
            method: 'DELETE',
            headers: {
                "X-Authorization": "pk_18797aad803e18b5c76f7bd068f8b010f00d7a57c4e33",
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }).then((response) => {
            console.log(response)
            this.setState({
                cartItems: response.data.cart.line_items,
                totalItems: response.data.cart.total_unique_items,
                totalValue: response.data.cart.subtotal.formatted_with_symbol
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    render(){

        const { totalItems, totalValue, cartItems } = this.state;

        return(
            <div>
                <div>
                    <CartCard
                        totalProducts={totalItems}
                        totalValue={totalValue}
                        onFeed={false}
                    />
                </div>
                <div>
                    {
                        cartItems.map((cartItem, index) => {
                            const {media: { source }, name, price: { formatted_with_symbol }, quantity, id  } = cartItem;

                            return (
                                <div className="card mb-3" style={{maxWidth: '540px'}} key={index}>
                                    <div className="row no-gutters">
                                        <div className="col-md-4">
                                        <img src={source} className="card-img" alt="..." />
                                        </div>
                                        <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{name}</h5>
                                            <p className="card-text">Price - {formatted_with_symbol}</p>
                                            <p className="card-text">Quantity - {quantity}</p>
                                            <button className='btn btn-danger' onClick={() => {this.handleDelete(id)}}>Delete</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}