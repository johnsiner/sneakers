import React, { useContext } from 'react';
import { CartContext } from '../store';
import './Cart.css';
import deleteIcon from '../images/icon-delete.svg';

export default function Cart() {
   const {
      cartState: { cart },
      removeFromCart,
   } = useContext(CartContext);

   return (
      <div className="cart">
         <h3>Cart</h3>
         {cart.map((item) => (
            <div key={item.id} className="cart-item">
               <div className="cart-thumbnail">
                  <img
                     src={require(`../${item.images[0].thumbnail}`)}
                     alt="product"
                  />
               </div>
               <div className="item-details">
                  <p>{item.name}</p>
                  <p>
                     {`$${(item.price * item.discount).toFixed(2)} x ${
                        item.amount
                     }`}{' '}
                     <span>{`$${(
                        item.price *
                        item.discount *
                        item.amount
                     ).toFixed(2)}`}</span>
                  </p>
               </div>
               <div
                  onClick={() => removeFromCart(item.id)}
                  className="cart-delete"
               >
                  <img src={deleteIcon} alt="" />
               </div>
            </div>
         ))}
         {cart.length > 0 && (
            <div className="checkout">
               <button>Checkout</button>
            </div>
         )}
         {cart.length === 0 && <p className="cart-empty">Your cart is empty</p>}
      </div>
   );
}
