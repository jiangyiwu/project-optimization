interface Person {
  firstName: string,
  lastName?: string,
  age: number,
  [propName: string]: string | number | undefined
}

interface Object {
  id: any;
  value: any;
  children?: any;
  pid: string;
}

interface Map {
  [propName: string]: string
}

export const getInfo = (): void => {
  console.info('----test---');
}

export const getBrowserUA = (ua?: any): string => {
  if (!ua && typeof navigator !== 'undefined') {
    ua = navigator.userAgent;
  }
  return ua;
};

export const person = (person: Person): string => {
  return `My firstname is ${person.firstName}, and I'm ${person.age} years old`;
};

export const escapeHTML = (str: string): string => {
  const map: Map = {
    '"': '&quot;',
    '\'': '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  };
  return str.replace(/["'&<>]/g, match => map[match]);
};

export const removeTags = (str: string): string => {
  return str.replace(/<.+?>/g, '');
}

export const strLen = (str: string, mode: number = 2): number => {
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i) > 255 ? mode : 1;
  }
  return result;
}

// 防抖
export const debounce = (fn: any, time: number = 300) => {
  let timer: any;
  return (...args: string[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), time);
  }
}
// 节流
export const throttle = (fn: Function, delay = 300) => {
  let startTime = 0;
  return (...args: string[]) => {
    const now = Date.now();
    if (now - startTime >= delay) {
      fn(...args);
      startTime = now;
    }
  }
}
// 转驼峰命名
export const humpName = (str: string): string => {
  const arr = str.split('-');
  return arr.reduce((pre, next, index) => {
    if (index === 0) return pre += next;
    return pre += next.charAt(0).toUpperCase() + next.substr(1);
  }, '');
}

export const countDown = (cb: Function, time: number = 10) => {
  let timer: any = null;
  cb(time);
  if (time <= 0) {
    clearTimeout(timer);
    return;
  }
  timer = setTimeout(() => {
    countDown(cb, --time);
  }, 300);
}

export const customNew = function(fn: any, ...args: any) {
  const obj = Object.create(fn.prototype);
  fn.apply(obj, args);
  return obj;
}

// 扁平数组转树状数组
export const transformTree = function(arr: Array<any>, options: any = {}) {
  const map: any = {};
  const tree = [];
  const { 
    id = 'id',
    pid = 'pid',
    children = 'children',
    rootId = 'id0'
  } = options;
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const cid = item[id];
    if (map[cid]) {
      item[children] = map[cid];
    } else {
      item[children] = map[cid] = [];
    }

    if (item[pid] !== rootId) {
      map[item[pid]].push(item);
    } else {
      tree.push(item);
    }
  }

  return tree;
}

export const transformArr = function(tree: Array<any> = []) {
  let queen = tree;
  const out = [];
  while (queen.length) {
    const first = queen.shift();
    if (first.children) {
      queen = queen.concat(first.children);
      delete first.children;
    }
    out.push(first);
  }
  return out;
}
