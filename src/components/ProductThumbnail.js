import React from 'react';

export default function ProductThumbnail(props) {
   return (
      <div className="thumbnails">
         {props.images.map((product, index) => (
            <div
               key={index}
               className={index === props.productIndex ? 'selected' : ''}
               onClick={props.onSelect.bind(null, index)}
            >
               <img
                  src={require(`./../${product.thumbnail}`)}
                  alt="thumbnail"
               ></img>
            </div>
         ))}
      </div>
   );
}
