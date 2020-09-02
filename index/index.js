// import HelloReact from './HelloReact.jsx';
// import React from 'react';
// import ReactDom from 'react-dom';
// import './assets/css/test.scss';
// import print from './assets/common/print';
// // const index = () => {
// //   console.info('---index--');
// // }

// const sayhello = async () => {
//   // await fetch('https://www.baidu.com');
//   console.info('----hello world 12---');
// }
// sayhello();

// print();

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve()
//   }, 1000);
// });

// promise.then(() => console.info(3234));

// ReactDom.render(<HelloReact />, document.getElementById('app'));

// // 发布订阅者模式

// // const obj = {
// //   name: 'zhangsan',
// //   age: 18
// // };



// // setTimeout(() => {
// //   obj.name = 'lisi';
// //   const a = obj.age;
// // }, 1000);

// class Observer {
//   constructor(data) {
//     this.data = data;
//     Object.keys(data).forEach((key) => {
//       this.defineReactive(this.data, key, data[key]);
//     })
//   }

//   defineReactive(data, key, val) {
//     const dep = new Dep();
//     Object.defineProperty(data, key, {
//       enumerable: true,
//       configurable: true,
//       get() {
//         if (dep.target) dep.addSub(Dep.target);
//         return val;
//       },
//       set(newValue) {
//         if (newValue === val) return;
//         val = newValue;
//         dep.notify();
//       }
//     });
//   }
// }

// // 发布者
// class Dep {
//   constructor() {
//     this.subs = [];
//   }

//   addSub(watcher) {
//     this.subs.push(watcher);
//     console.info(this.subs)
//   }

//   notify() {
//     this.subs.forEach((item) => {
//       console.info(item, '----item---');
//       item.update();
//     })
//   }
// }

// // 订阅者
// class Watcher {
//   constructor(name) {
//     this.name = name;
//   }

//   update() {
//     console.info(this.name + '发生update');
//     // this.name = val;
//   }
// }
// const dep = new Dep();

// const watcher1 = new Watcher('张三');
// const watcher2 = new Watcher('李四');

// dep.addSub(watcher1);
// dep.addSub(watcher2);

// dep.notify();

console.info('----111---');

setTimeout(() => {
  console.info('settimeout2000');
}, 2000);

setTimeout(() => {
  console.info('settimeout1000');
}, 1000);

new Promise((resolve) => {
  for (let i = 0; i < 5; i++) {
    console.info(i)
  }
  resolve();
}).then(() => console.info('---then---'));
