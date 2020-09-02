class Observer {
  constructor(data) {
    this.data = data;
    this._observer(this.data);
  }
  _observer(data) {
    if (!data || typeof data !== 'object') return;
    Object.keys(data).forEach((keys) => this.defineReactive(data, keys, data[keys]));
  }

  defineReactive(data, key, val) {
    this._observer(val);
    const dep = new Dep();
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      set(newVal) {
        console.info('---设置数值---', newVal);
        if (val === newVal) return;
        val = newVal;
        dep.notify();
      },
      get() {
        console.info('----获取数值---', val);
        return val;
      }
    });
  }
}

class Dep {
  constructor() {
    this.subs = []
  }

  addSub(watcher) {
    this.subs.push(watcher);
  }

  notify() {
    this.subs.forEach(watcher => watcher.update());
  }
}

export default Observer;
