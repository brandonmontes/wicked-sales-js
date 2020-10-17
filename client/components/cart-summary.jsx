import React from 'react';
import CartItems from './cart-summary-items';

function CartSummary(props) {
  return (
    <div>
      <div className="card m-5">
        <div>
          <button type='button' className='btn btn-light mx-4 mt-3' onClick={() => props.setView('catalog')}><i className="fas fa-arrow-left"></i> Back to Catalog</button>
        </div>
        <div className="mt-3 mx-5">
          <h4>My Cart</h4>
        </div>
        {
          props.cartItems.map(cartItems => {
            return (
              <CartItems
                key={cartItems.productId}
                productsId={cartItems.productId}
                title={cartItems.name}
                image={cartItems.image}
                shortDescription={cartItems.shortDescription}
                price={cartItems.price}
              />
            );
          })
        }
        <div className="my-3 mx-5">
          <h4>Item Total:</h4>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
