import Observer from './observer';
// import Watcher from './assets/watcher';
// import Compile from './assets/compile';
console.info(Observer, '-----observer---');

class Mvvm {
  constructor() {
    console.info('----mvvm---');
    this.initObserver();
  }

  initObserver() {
    let data = { name: 'zhangsan' };
    new Observer(data);
    data.name = 'lisi';
    const a = data.name;
  }
};

export default Mvvm;