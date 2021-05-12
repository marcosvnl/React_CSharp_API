import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchProdutc } from './components/FetchProdutc';
import { AddProduct } from './components/AddProducts';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/fetch-product' component={FetchProdutc} />
        <Route path='/add-product' component={AddProduct}/>
        <Route path='/product/edit/:id' component={AddProduct}/>
      </Layout>
    );
  }
}
