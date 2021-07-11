
import React from 'react';

<<<<<<< HEAD
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems }) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {cartItems.map(cartItem => (
                <CartItem key={cartItem.id} item={cartItem} />
            ))}
        </div>
=======
import CustomButton from '../custom-button/custom-button.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => (
    <div className='cart-dropdown'>
        <div className='cart-items' />
>>>>>>> 2f36c448955a1c6278067b752bc9d7af62916d69
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
);

<<<<<<< HEAD
const mapStateToProps = ({ cart: { cartItems }}) => ({
    cartItems
});

export default connect(mapStateToProps)(CartDropdown);
=======
export default CartDropdown;
>>>>>>> 2f36c448955a1c6278067b752bc9d7af62916d69
