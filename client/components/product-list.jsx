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
      <div>
        {
          this.state.products.map(products => {
            return <ProductListItem
              key={products.productsId}
              productsId={products.productsId}
              title={products.title}
              imageUrl={products.imageUrl}
              text={products.text}
              price={products.price}
            />;
          })
        }
      </div>
    );
  }
}

export default ItemMenu;
