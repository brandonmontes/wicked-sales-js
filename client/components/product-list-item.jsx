import React from 'react';

function itemCard(props) {
  return (
    <div>
      <div className="card" style="width: 18rem;">
        <img src={props.imageUrl} className="card-img-top" alt={props.imageUrl}></img>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className>{props.price}</p>
          <p className="card-text">{props.text}</p>
        </div>
      </div>
    </div>
  );
}

export default itemCard;
