console.info('----test 被加载---');

export function add(...args) {
  return args.reduce((p,n) => p + n, 0);
}

export function mul(x, y) {
  return x * y;
}
