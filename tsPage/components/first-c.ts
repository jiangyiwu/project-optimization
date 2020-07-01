class FirstC {
  age: number | string | (number | string)[] = ['12', 1];
  constructor() {
    console.info(this.age, '---age---');
  }
}

export default FirstC;
