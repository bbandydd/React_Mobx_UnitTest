import ContentStore from './CounterStore';

describe('ContentStore count', () => {
  let store;

  beforeEach(() => {
    store = new ContentStore();
  });

  it('count should be 1', () => {
    store.increment();
    expect(store.count).toBe(1);
  });

  it('count should be -1', () => {
    store.decrement();
    expect(store.count).toBe(-1);
  });
});

describe('ContentStore getList', () => {
  const store = new ContentStore();
  fetch.mockResponseOnce(JSON.stringify([{}, {}, {}]));

  it('call getList should be 3', async () => {
    const data = await store.getList();
    expect(data.length).toBe(3);
  });
});

describe('ContentStore getList2', () => {
  const store = new ContentStore();
  fetch.mockResponseOnce(JSON.stringify([{}, {}]));

  it('call getList2 should be 2', () => {
    store.getList2();
  });

  it('getList2 length should be 2', () => {
    expect(store.list.length).toBe(2);
  });
});
