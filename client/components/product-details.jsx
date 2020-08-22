import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.productDescription = this.productDescription.bind(this);
  }

  componentDidMount() {
    this.productDescription(this.props.productId);
  }

  productDescription(productId) {
    fetch(`api/products/${productId}`)
      .then(res => res.json())
      .then(data => this.setState({ product: data }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <div className="card product-card">
          <img src={this.state.image} className="card-img-top object-fit" alt={this.state.image}></img>
          <div className="card-body">
            <h5 className="card-title">{this.state.title}</h5>
            <p>{this.state.price}</p>
            <p className="card-text">{this.state.longDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetails;
