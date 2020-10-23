import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkoutTotal = this.checkoutTotal.bind(this);
  }

  componentDidMount() {
    this.checkoutTotal();
  }

  checkoutTotal() {
    this.props.cartItems.sum = () => {
      let cartTotal = 0;
      for (let i = 0; i < this.props.cartItems.length; i++) {
        cartTotal = cartTotal + this.props.cartItems[i].price;
      }
      return cartTotal;
    };
    return ((this.props.cartItems.sum('price') / 100).toFixed(2));
  }

  handleChange(event) {
    const target = event.target.id;
    switch (target) {
      case 'name':
        this.setState({ name: event.target.value });
        break;
      case 'creditCard':
        this.setState({ creditCard: event.target.value });
        break;
      case 'shippingAddress':
        this.setState({ shippingAddress: event.target.value });
        break;
    }
  }

  render() {
    return (
      <div>
        <div className="card m-3 p-3">
          <div>
            <h1>Checkout</h1>
          </div>
          <div>
            <h3>Order Total: ${this.checkoutTotal()}</h3>
          </div>
          <div>
            <div>
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <input required type="text" className="form-control" id="name"onChange={this.handleChange}></input>
                </div>
                <div className="form-group">
                  <label>Credit Card</label>
                  <input required type="number" className="form-control" id="creditCard" onChange={this.handleChange}></input>
                </div>
                <div className="form-group">
                  <label>Shipping Address</label>
                  <textarea required className="form-control" id="shippingAddress" rows="3" onChange={this.handleChange}></textarea>
                </div>
              </form>
            </div>
          </div>
          <div>
            <div className="d-flex justify-content-between">
              <div>
                <button type='button' className='btn btn-light mx-4 mt-3' onClick={() => this.props.setView('catalog', {})}><i className="fas fa-arrow-left"></i> Continue Shopping</button>
              </div>
              <div>
                <button type='button' className='btn btn-primary mx-4 mt-3' onClick={() => this.props.placeOrder(this.state.name, this.state.creditCard, this.state.shippingAddress)}>Place Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckoutForm;
