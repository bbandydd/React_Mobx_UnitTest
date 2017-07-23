import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observable, action, runInAction } from 'mobx';
import { observer, inject } from 'mobx-react';
import './Home.less';

@inject('ContentStore')
@observer
export default class Home extends Component {
  static propTypes = {
    ContentStore: PropTypes.object,
  }

  componentDidMount = async () => {
    const data = await this.props.ContentStore.getList();

    runInAction('get api', () => {
      this.list = data;
    });

    await this.props.ContentStore.getList2();
  }

  @observable list = [];

  render() {
    return (
      <div id="pageHome">
        <h1>Unit Test</h1>
        <div>
          <p>store</p>
          <div>
            <p>counter</p>
            <span className="store_counter">{this.props.ContentStore.count}</span>
            <button className="store_increment" onClick={this.props.ContentStore.increment}>+</button>
            <button className="store_decrement" onClick={this.props.ContentStore.decrement}>-</button>
          </div>
          <div>
            <p>local list length</p>
            <p className="local_list_length">{this.list.length}</p>
            <p>store list length</p>
            <p className="store_list_length">{this.props.ContentStore.list.length}</p>
          </div>
        </div>
      </div>
    );
  }
}
