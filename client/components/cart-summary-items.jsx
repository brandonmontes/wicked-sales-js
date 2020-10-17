import React from 'react';

function cartItem(props) {
  return (
    <div>
      <div className="card d-flex flex-row m-2">
        <img src={props.image} className="card-img-left object-fit cart-item-card" alt={props.image}></img>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p>${(props.price / 100).toFixed(2)}</p>
          <p className="card-text">{props.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default cartItem;
