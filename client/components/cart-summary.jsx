import React from 'react';
import CartItems from './cart-summary-items';

function CartSummary(props) {
  props.cartItems.sum = () => {
    let cartTotal = 0;
    for (let i = 0; i < props.cartItems.length; i++) {
      cartTotal = cartTotal + props.cartItems[i].price;
    }
    return cartTotal;
  };

  if (props.cartItems.length !== 0) {
    return (
      <div className="phone-cart-margins">
        <div className="card m-3">
          <div>
            <button type='button' className='btn btn-light mx-4 mt-3' onClick={() => props.setView('catalog', {})}><i className="fas fa-arrow-left"></i> Back to Catalog</button>
          </div>
          <div className="mt-3 mx-5">
            <h4>My Cart</h4>
          </div>
          {
            props.cartItems.map(cartItems => {
              return (
                <CartItems
                  key={cartItems.cartItemId}
                  productsId={cartItems.productId}
                  title={cartItems.name}
                  image={cartItems.image}
                  shortDescription={cartItems.shortDescription}
                  price={cartItems.price}
                />
              );
            })
          }
          <div className="d-flex justify-content-between align-items-center">
            <div className="my-3 mx-5">
              <h5>Item Total: ${(props.cartItems.sum('price') / 100).toFixed(2)}</h5>
            </div>
            <div>
              <button type='button' className='btn btn-primary mx-4' onClick={() => props.setView('checkout', {})}>Checkout</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="card m-5">
        <div>
          <button type='button' className='btn btn-light mx-4 mt-3' onClick={() => props.setView('catalog', {})}><i className="fas fa-arrow-left"></i> Back to Catalog</button>
        </div>
        <div className="my-3 mx-5">
          <h4>No Items in Cart</h4>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
