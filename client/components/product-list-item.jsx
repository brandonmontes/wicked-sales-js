import React from 'react';

function itemCard(props) {
  return (
    <div>
      <div className="card product-card">
        <img src={props.image} className="card-img-top object-fit" alt={props.image}></img>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p>{props.price}</p>
          <p className="card-text">{props.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default itemCard;
