import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(view, params) {
    this.setState({
      name: view,
      params: params
    });
  }

  render() {
    let body = null;
    switch (this.state.view.name) {
      case 'catalog':
        body = <ProductList setView={this.setView} />;
        break;
      case 'details':
        body = <ProductDetails productId={this.state.view.params} setView={this.setView}/>;
        break;
    }

    return (
      <div>
        <div>
          <Header/>
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
