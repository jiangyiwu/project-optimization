console.info('---index 被加载---');

document.getElementById('btn').onclick = function() {
  import(/* webpackChunkName: 'lazytest', webpackPrefetch: true */'./test').then(({ mul }) => {
    console.info(mul(3, 4));
  });
}
