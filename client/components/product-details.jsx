import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
    this.productDescription = this.productDescription.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.productDescription(this.props.productId);
  }

  productDescription(productId) {
    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(data => this.setState({ product: data }))
      .catch(err => console.error(err));
  }

  handleClick() {
    this.props.setView('catalog', {});
  }

  render() {
    return (
      <div>
        <div className="card mb-3">
          <div>
            <button type='button' className='btn btn-light' onClick={this.handleClick}><i className="fas fa-arrow-left"></i> Back to Catalog</button>
          </div>
          <img src={this.state.product.image} className="card-img-top object-fit" alt={this.state.product.image}></img>
          <div className="card-body">
            <h5 className="card-title">{this.state.product.name}</h5>
            <p>${(this.state.product.price / 100).toFixed(2)}</p>
            <p className="card-text">{this.state.product.longDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetails;
