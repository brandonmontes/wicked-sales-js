import React from 'react';

function header(props) {
  let cartTotal;
  if (props.cartItemCount === 1) {
    cartTotal = 'Item';
  } else {
    cartTotal = 'Items';
  }
  return (
    <div className='navbar fixed-top navbar-dark bg-dark text-light d-flex justify-content-around'>
      <h6><i className="fas fa-dollar-sign"></i>  Wicked Sales</h6>
      <div className="cart-button">
        <h6 onClick={() => props.setView('cart', {})}>{props.cartItemCount} {cartTotal} <i className="fas fa-shopping-cart"></i></h6>
      </div>
    </div>
  );
}

export default header;
