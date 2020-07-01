import * as tools from './utils/tool';
import FirstC from './components/first-c';

const ua = tools.getBrowserUA();
const person = tools.person({ firstName: 'j', age: 18 });
new FirstC();
console.info(ua, '----ts----');
console.info(person, '---person---');
console.info(tools.escapeHTML("<script>alert('hhh')</script>"));
console.info(tools.strLen('123abc还好'));