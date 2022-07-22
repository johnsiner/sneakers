import React, { useContext, useEffect } from 'react';
import './Header.css';
import { useState } from 'react';
import logo from './../images/logo.svg';
import cartIcon from './../images/icon-cart.svg';
import avatar from './../images/image-avatar.png';
import menuIcon from './../images/icon-menu.svg';
import closeIcon from './../images/icon-close.svg';
import { CartContext } from '../store';
import Cart from './Cart';

export default function Header() {
   const [menuIsOpened, setMenuIsOpened] = useState(false);
   const {
      showCart,
      cartState: { cartIsShown, cart },
   } = useContext(CartContext);

   const [cartIconBump, setCartIconBump] = useState(false);

   useEffect(() => {
      if (cart.length === 0) return;
      setCartIconBump(true);
      const timer = setTimeout(() => {
         setCartIconBump(false);
      }, 300);

      return () => {
         clearTimeout(timer);
      };
   }, [cart]);

   return (
      <header>
         {cartIsShown && <Cart />}
         {menuIsOpened && (
            <div
               onClick={() => setMenuIsOpened(false)}
               className="nav-modal"
            ></div>
         )}
         <div className="left">
            <div onClick={() => setMenuIsOpened(true)} className="menu">
               <img src={menuIcon} alt="menu" />
            </div>
            <div>
               <img src={logo} alt="logo" />
            </div>
            <nav className={menuIsOpened ? 'opened' : ''}>
               <div
                  onClick={() => setMenuIsOpened(false)}
                  className="close-menu"
               >
                  <img src={closeIcon} alt="close menu" />
               </div>
               <ul>
                  <li>Collection</li>
                  <li>Men</li>
                  <li>Women</li>
                  <li>About</li>
                  <li>Contact</li>
               </ul>
            </nav>
         </div>
         <div className="right">
            <div
               className={`cart-icon ${cartIconBump && 'bump'}`}
               onClick={() => showCart()}
            >
               <img src={cartIcon} alt="cart" />
               <p>{cart.reduce((total, item) => total + item.amount, 0)}</p>
            </div>
            <div className="avatar">
               <img src={avatar} alt="avatar" />
            </div>
         </div>
      </header>
   );
}
