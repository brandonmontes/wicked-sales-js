import React from 'react';

function header(props) {
  let cartTotal;
  if (props.cartItemCount === 1) {
    cartTotal = 'Item';
  } else {
    cartTotal = 'Items';
  }
  return (
    <div className='navbar fixed-top navbar-dark bg-dark text-light'>
      <h6 className='ml-5'><i className="fas fa-dollar-sign"></i>  Wicked Sales</h6>
      <h6 className='ml-5' onClick={() => props.setView('cart', {})}>{props.cartItemCount} {cartTotal} <i className="fas fa-shopping-cart"></i></h6>
    </div>
  );
}

export default header;
