import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Home from './Home';

describe('Home => store', () => {
  let wrapper;
  let ContentStore;

  beforeEach(() => {
    ContentStore = {
      count: 0,
      list: [{}, {}, {}],
      increment: sinon.spy(),
      decrement: sinon.spy(),
      getList: sinon.stub().returns([{}, {}]),
      getList2: sinon.spy(),
    };

    wrapper = mount(<Home ContentStore={ContentStore} />);
  });

  it('render Unit Test words', () => {
    expect(wrapper.find('h1').text()).toEqual('Unit Test');
  });

  it('store counter is 0', () => {
    expect(wrapper.find('.store_counter').text()).toEqual('0');
  });

  it('local ist length is 2', () => {
    expect(wrapper.find('.local_list_length').text()).toEqual('2');
  });

  it('store ist length is 3', () => {
    expect(ContentStore.getList2.called).toBe(true);
    expect(wrapper.find('.store_list_length').text()).toEqual('3');
  });

  it('increment should be clicked', () => {
    expect(ContentStore.increment.called).toBe(false);
    wrapper.find('.store_increment').simulate('click');
    expect(ContentStore.increment.called).toBe(true);
  });

  it('decrement should be clicked', () => {
    expect(ContentStore.decrement.called).toBe(false);
    wrapper.find('.store_decrement').simulate('click');
    expect(ContentStore.decrement.called).toBe(true);
  });
});
