import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  setView(view, params) {
    this.setState({
      view: {
        name: view,
        params: params
      }
    });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => this.setState({ cart: data }))
      .catch(err => console.error(err));
  }

  addToCart(product) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product })
    };
    fetch('/api/cart', req)
      .then(res => res.json())
      .then(() => this.getCartItems())
      .catch(err => console.error(err));
  }

  render() {
    let body = null;
    switch (this.state.view.name) {
      case 'catalog':
        body = <ProductList setView={this.setView} />;
        break;
      case 'details':
        body = <ProductDetails productId={this.state.view.params.product} setView={this.setView} addToCart={this.addToCart}/>;
        break;
      case 'cart':
        body = <CartSummary cartItems={this.state.cart} setView={this.setView}/>;
        break;
    }

    return (
      <div>
        <div>
          <Header cartItemCount={(this.state.cart.length) + 1} setView={this.setView}/>
        </div>
        <div className="body">
          <div>
            {body}
          </div>
        </div>
      </div>
    );
  }
}
