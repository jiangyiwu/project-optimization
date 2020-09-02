console.info('---index 被加载---');

document.getElementById('btn').onclick = function() {
  import(/* webpackChunkName: 'lazytest', webpackPrefetch: true */'./test').then(({ mul }) => {
    console.info(mul(3, 4));
  });
}


/**
 * 请在 sum函数中调用此函数，完成数值计算
 * @param {*} a 要相加的第一个值
 * @param {*} b 要相加的第二个值
 * @param {*} callback 相加之后的回调函数
 */
function asyncAdd(a,b,callback) {
  setTimeout(function(){
   callback(null, a+b)
  },100)
}

/**
 * 请在此方法中调用asyncAdd方法，完成数值计算
 * @param  {...any} rest 传入的参数
 */
// async function sum(...rest) {
//   // 请在此处完善代码
//   let result = 0;
//   for (let num of rest) {
//     result = await new Promise((resolve) => {
//       asyncAdd(result, num, (_, res) => {
//         resolve(res);
//       });
//     });
//   }
//   return result;
// }

// async function sum(...rest) {
//   if (rest.length <= 1) return rest[0];
//   const promises = [];
//   for (let i = 0; i < rest.length; i += 2) {
//     promises.push(
//       new Promise((resolve) => {
//         if (rest[i + 1] === undefined) resolve(rest[i]);
//         asyncAdd(rest[i], rest[i + 1], (_, res) => {
//           resolve(res);
//         });
//       })
//     );
//   }
//   const result = await Promise.all(promises);
//   return await sum(...result);
// }

async function sum(...rest) {
  let result = 0;
  const obj = {};
  obj.toString = function() {
    return result;
  }
  const promises = [];
  for (let num of rest) {
    promises.push(
      new Promise((resolve) => {
        asyncAdd(obj, num, (_, res) => {
          resolve(res);
        });
      }).then((res) => {
        result = res;
      })
    )
  }
  await Promise.all(promises);
  return result;
}

// let start = window.performance.now()
// sum(1, 2, 3, 4, 5, 6, 7, 8, 9).then(res => {
//   // 请保证在调用sum方法之后，返回结果21
//   console.log(res)
//   console.log(`程序执行共耗时: ${window.performance.now() - start}`)
// });


/**
 自定义instanceof 
*/
function instanceOf(left, right) {
  let proto = left.__proto__;
  while (proto) {
    if (proto === right.prototype) return true;
    proto = proto.__proto__;
  }
  return false;
}

class A{}
class B extends A {}
class C{}

const b = new B()
// 输出 true
console.log(instanceOf(b,B))
// 输出 true
console.log(instanceOf(b,A))
// 输出 false
console.log(instanceOf(b,C))

console.log(instanceOf('ad', String))
console.log(instanceOf(new Date(), String))

function myNew(constructor, ...rest) {
  // 请在此处完善代码，不能直接使用 new 操作符
  if (typeof constructor !== 'function') return constructor;
  const _constructor = Object.create(constructor.prototype);
  const obj = constructor.apply(_constructor, rest);
  if (typeof obj === 'object') return obj;
  return _constructor;
 }
 function Fun(name,sex) {
   this.name = name
   this.sex = sex
 }
 Fun.prototype.getUserInfo = function() {
   return `我的姓名${this.name},我的性别${this.sex}`
 }
 
 const fun = myNew(Fun,'子君','男')
 console.info(fun, '---fun--');
 // 我的姓名子君，我的性别男
 console.log(fun.getUserInfo())
 

