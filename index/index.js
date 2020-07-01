import HelloReact from './HelloReact.jsx';
import React from 'react';
import ReactDom from 'react-dom';
import './assets/css/test.scss';
import print from './assets/common/print';
// const index = () => {
//   console.info('---index--');
// }

const sayhello = async () => {
  // await fetch('https://www.baidu.com');
  console.info('----hello world 12---');
}
sayhello();

print();

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, 1000);
});

promise.then(() => console.info(3234));

ReactDom.render(<HelloReact />, document.getElementById('app'));
