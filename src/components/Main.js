import React, { useContext, useState } from 'react';
import './Main.css';
import cartIcon from './../images/icon-cart-2.svg';
import plusIcon from './../images/icon-plus.svg';
import minusIcon from './../images/icon-minus.svg';
import nextIcon from '../images/icon-next.svg';
import prevIcon from '../images/icon-previous.svg';
import Lightbox from './Lightbox';
import ProductThumbnail from './ProductThumbnail';
import { CartContext } from '../store';

const data = {
   id: 3838,
   name: 'Fall limited edition sneakers',
   details:
      "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the wetaher can offer.",
   price: 250,
   discount: 0.5,
   images: [
      {
         thumbnail: 'images/image-product-1-thumbnail.jpg',
         image: 'images/image-product-1.jpg',
      },
      {
         thumbnail: 'images/image-product-2-thumbnail.jpg',
         image: 'images/image-product-2.jpg',
      },
      {
         thumbnail: 'images/image-product-3-thumbnail.jpg',
         image: 'images/image-product-3.jpg',
      },
      {
         thumbnail: 'images/image-product-4-thumbnail.jpg',
         image: 'images/image-product-4.jpg',
      },
   ],
};

export default function Main() {
   const [productIndex, setProductIndex] = useState(0);
   const [cartQuantity, setCartQuantity] = useState(1);
   const [showLightbox, setShowLightbox] = useState(false);
   const image = require(`./../${data.images[productIndex].image}`);

   const { addToCart } = useContext(CartContext);

   const productNav = (type) => {
      if (type === 'next') {
         if (productIndex + 1 === data.images.length) {
            setProductIndex(0);
         } else setProductIndex((index) => index + 1);
      }

      if (type === 'previous') {
         if (productIndex === 0) {
            setProductIndex(data.images.length - 1);
         } else setProductIndex((index) => index - 1);
      }
   };

   return (
      <main>
         {showLightbox && (
            <Lightbox
               images={data.images}
               image={image}
               productIndex={productIndex}
               onThumbnailSelect={(index) => setProductIndex(index)}
               onClose={() => setShowLightbox(false)}
               nav={productNav}
            />
         )}
         <div className="left">
            <div
               onClick={() => setShowLightbox(true)}
               className="product-image"
            >
               <img src={image} alt="product" />
            </div>
            <div className="mobile-product-image">
               <img src={image} alt="product" />
               <div
                  className="product-nav prev mobile"
                  onClick={() => productNav('previous')}
               >
                  <img src={prevIcon} alt="prev" />
               </div>
               <div
                  className="product-nav next mobile"
                  onClick={() => productNav('next')}
               >
                  <img src={nextIcon} alt="next" />
               </div>
            </div>
            <ProductThumbnail
               images={data.images}
               productIndex={productIndex}
               onSelect={(index) => setProductIndex(index)}
            />
         </div>
         <div className="right">
            <h3>SNEAKERS COMPANY</h3>
            <h1>{data.name}</h1>
            <p>{data.details}</p>
            <div className="price">
               <h2>
                  {`$${(data.price * data.discount).toFixed(2)}`}{' '}
                  <span>{`${data.discount * 100}%`}</span>
               </h2>
               <p>{`$${data.price.toFixed(2)}`}</p>
            </div>
            <div className="cart-action">
               <div className="quantity">
                  <button
                     onClick={() => setCartQuantity((state) => state - 1)}
                     disabled={cartQuantity === 1}
                  >
                     <img src={minusIcon} alt="-" />
                  </button>
                  <p>{cartQuantity}</p>
                  <button onClick={() => setCartQuantity((state) => state + 1)}>
                     <img src={plusIcon} alt="+" />
                  </button>
               </div>
               <div className="add-to-cart">
                  <button
                     onClick={() =>
                        addToCart({ ...data, amount: cartQuantity })
                     }
                  >
                     <img src={cartIcon} alt="" /> <p>Add to cart</p>
                  </button>
               </div>
            </div>
         </div>
      </main>
   );
}
