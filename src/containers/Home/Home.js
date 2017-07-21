import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observable, action, runInAction } from 'mobx';
import { observer, inject } from 'mobx-react';
import './Home.less';

const getData = url => fetch(url).then(response => response.json());

@inject('ContentStore')
@observer
export default class Home extends Component {
  static propTypes = {
    ContentStore: PropTypes.object,
  }

  componentDidMount = () => {
    this.getList();
    this.props.ContentStore.getList();
  }

  getList = async () => {
    const data = await getData('https://demojson.herokuapp.com/cart');

    runInAction('get api', () => {
      this.list = data;
    });
  }

  @observable count = 0;
  @observable list = [];

  @action increment = () => {
    this.count += 1;
  }

  @action decrement = () => {
    this.count -= 1;
  }

  render() {
    return (
      <div id="pageHome">
        <h1>Unit Test</h1>
        <div>
          <p>local</p>
          <div>
            <p>counter</p>
            <span>{this.count}</span>
            <button onClick={this.increment}>+</button>
            <button onClick={this.decrement}>-</button>
          </div>
          <div>
            <p>list length</p>
            <p>{this.list.length}</p>
          </div>
        </div>
        <div>
          <p>store</p>
          <div>
            <p>counter</p>
            <span>{this.props.ContentStore.count}</span>
            <button onClick={this.props.ContentStore.increment}>+</button>
            <button onClick={this.props.ContentStore.decrement}>-</button>
          </div>
          <div>
            <p>list length</p>
            <p>{this.props.ContentStore.list.length}</p>
          </div>
        </div>
      </div>
    );
  }
}
