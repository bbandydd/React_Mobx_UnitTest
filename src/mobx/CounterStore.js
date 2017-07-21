import { observable, action, runInAction } from 'mobx';

const getData = url => fetch(url).then(response => response.json());

class ContentStore {
  @observable count = 0;
  @observable list = [];

  @action increment = () => {
    this.count += 1;
  }

  @action decrement = () => {
    this.count -= 1;
  }

  getList = async () => {
    const data = await getData('https://demojson.herokuapp.com/cart');

    runInAction('get api', () => {
      this.list = data;
    });
  }
}

export default new ContentStore();
