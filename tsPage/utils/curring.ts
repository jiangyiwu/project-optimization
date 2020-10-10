// 可保存之前的参数
export const curring = function(func: Function, ...args: []) {
  let arr: any = args;
  return function(..._args: any) {
    arr = arr.concat(_args);
    if (_args.length === 0) {
      return func.apply(null, arr);
    }
  }
}

// 保存固定参数
export const curring_1 = function(func: Function, ...args:any) {
  return function(..._args: any) {
    const allAry = args.concat(_args);
    if (_args.length === 0) {
      return func.apply(null, allAry);
    }
  }
}

export const curring_expand = function(fn: Function) {
  let arr: any = [];
  function next(..._args: any): any {
    arr = arr.concat(_args)
    return next;
  }
  next.toString = function() {
    return fn.apply(null, arr);
  }

  next.valueOf = function() {
    return fn.apply(null, arr);
  }
  // return function next(..._args: any): any {
  //   if (_args.length > 0) {
  //     arr = arr.concat(_args);
  //     return next;
  //   }
  //   return fn.apply(null, arr);
  // }
  return next;
}
