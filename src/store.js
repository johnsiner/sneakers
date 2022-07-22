import { createContext, useReducer } from 'react';

export const CartContext = createContext({
   cartState: [],
   showCart: () => {},
   addToCart: (item) => {},
   removeFromCart: (id) => {},
});

const cartReducer = (state, action) => {
   switch (action.type) {
      case 'SHOW_CART':
         const cartShown = state.cartIsShown;
         return { ...state, cartIsShown: !cartShown };
      case 'ADD_TO_CART': {
         const existingCartItemIndex = state.cart.findIndex(
            (item) => item.id === action.payload.id
         );
         const existingCartItem = state.cart[existingCartItemIndex];
         let updatedCart;
         if (existingCartItem) {
            const updatedCartItem = {
               ...existingCartItem,
               amount: existingCartItem.amount + action.payload.amount,
            };
            updatedCart = [...state.cart];
            updatedCart[existingCartItemIndex] = updatedCartItem;
         } else {
            updatedCart = state.cart.concat(action.payload);
         }
         localStorage.setItem('cart', JSON.stringify(updatedCart));
         return { ...state, cart: updatedCart };
      }
      case 'REMOVE_CART_ITEM': {
         const updatedCart = state.cart.filter((item) => item.id !== action.id);
         localStorage.setItem('cart', JSON.stringify(updatedCart));
         return { ...state, cart: updatedCart };
      }

      default:
         return state;
   }
};

const CartContextProvider = (props) => {
   const defaultCartState = {
      cartIsShown: false,
      cart: localStorage.getItem('cart')
         ? JSON.parse(localStorage.getItem('cart'))
         : [],
   };
   const [cartState, dispatchAction] = useReducer(
      cartReducer,
      defaultCartState
   );

   const showCart = () => {
      dispatchAction({ type: 'SHOW_CART' });
   };

   const addToCart = (item) => {
      dispatchAction({ type: 'ADD_TO_CART', payload: item });
   };

   const removeFromCart = (id) =>
      dispatchAction({ type: 'REMOVE_CART_ITEM', id: id });

   const cartContext = { cartState, showCart, addToCart, removeFromCart };

   return (
      <CartContext.Provider value={cartContext}>
         {props.children}
      </CartContext.Provider>
   );
};

export default CartContextProvider;
