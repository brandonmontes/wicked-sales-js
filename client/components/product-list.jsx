import React from 'react';
import ProductListItem from './product-list-item';

class ItemMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => this.setState({ products: data }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className='container'>
        <div className='d-flex justify-content-center flex-wrap'>
          {
            this.state.products.map(products => {
              return <ProductListItem
                key={products.productId}
                productsId={products.productId}
                title={products.name}
                image={products.image}
                shortDescription={products.shortDescription}
                longDescription={products.longDescription}
                price={products.price}
                setView={this.props.setView}
              />;
            })
          }
        </div>
      </div>
    );
  }
}

export default ItemMenu;
