import { getBrowserUA, escapeHTML, strLen, customNew, transformTree, transformArr } from './utils/tool';
import { curring, curring_expand, curring_1 } from './utils/curring';
import FirstC from './components/first-c';
import './utils/list';
import './utils/doubleList';
import anymatch = require('anymatch');

const ua = getBrowserUA();
new FirstC();
console.info(ua, '----ts----');
console.info(escapeHTML("<script>alert('hhh')</script>"));
console.info(strLen('123abc还好'));

/**
 * tools --test--customNew
 * 测试自定义new关键字
 */

function TestNew(this: any, name: string, age: number) {
  this.name = name;
  this.age = age;
}

TestNew.prototype.getName = function() {
  return this.name;
}

const newTest = customNew(TestNew, 'tom', 12);

console.info(newTest.getName(), newTest.age, '-----getName--');

const add_common = function(...args: Array<number>) {
  let sum:number = 0;
  for (let v of [...args]) sum += v;
  return sum;
}

const add = curring(add_common);

const add_expand = curring_expand(add_common);

const add_1 = curring_1(add_common, 100);
console.info(add_1(1,2,3), add_1(4,5,6), '---test--');

const curring_add = add_expand(1, 2, 3)(4)(5)(6)(7);
console.info(Number(curring_add) === 28, '----add_expand----');
console.info(add(6, 7, 8, 9, 10));
console.info(add(7), add(8));

const arr = [
  {
    value: 1,
    id: 'id1',
    pid: 'id0',
  },
  {
    value: 2,
    id: 'id2',
    pid: 'id1',
  },
  {
    value: 3,
    id: 'id3',
    pid: 'id2',
  },
  {
    value: 4,
    id: 'id4',
    pid: 'id1',
  },
  {
    value: 5,
    id: 'id5',
    pid: 'id2',
  }
]

const tree = transformTree(arr);
const arr_1 = transformArr(JSON.parse(JSON.stringify(tree)));
console.info(tree, arr_1, '---tree---');

