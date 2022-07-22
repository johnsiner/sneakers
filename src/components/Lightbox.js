import React, { Fragment, useEffect } from 'react';
import './Lightbox.css';
import closeIcon from '../images/icon-close-2.svg';
import ProductThumbnail from './ProductThumbnail';
import nextIcon from '../images/icon-next.svg';
import prevIcon from '../images/icon-previous.svg';

export default function Lightbox(props) {
   const { nav, onClose } = props;
   useEffect(() => {
      const keyboardNav = (event) => {
         var name = event.key;
         if (name === 'ArrowLeft') {
            nav('previous');
         }
         if (name === 'ArrowRight') {
            nav('next');
         }
         if (name === 'Escape') {
            onClose();
         }
      };
      document.addEventListener('keydown', keyboardNav, false);
      return () => document.removeEventListener('keydown', keyboardNav);
   }, [nav, onClose]);
   return (
      <Fragment>
         <div onClick={props.onClose} className="lightbox-modal"></div>
         <div className="lightbox">
            <div className="lightbox-content">
               <div onClick={onClose} className="cancel">
                  <img src={closeIcon} alt="close" />
               </div>
               <div className="product">
                  <img className="image" src={props.image} alt="product" />
                  <div
                     className="product-nav prev"
                     onClick={nav.bind(null, 'previous')}
                  >
                     <img src={prevIcon} alt="prev" />
                  </div>
                  <div
                     className="product-nav next"
                     onClick={nav.bind(null, 'next')}
                  >
                     <img src={nextIcon} alt="next" />
                  </div>
               </div>
               <ProductThumbnail
                  images={props.images}
                  onSelect={props.onThumbnailSelect}
                  productIndex={props.productIndex}
               />
            </div>
         </div>
      </Fragment>
   );
}
