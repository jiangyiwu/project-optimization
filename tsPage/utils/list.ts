class ListNode {
  data: any = null;
  next: any = null;
  constructor(newData: any) {
    this.data = newData;
  }
}

class List {
  head: any = null;
  size: number = 0;
  constructor() {
  }

  insert(newData: any, position?: number) {
    const newNode = new ListNode(newData);
    if (this.head === null) {
      this.head = newNode;
      this.size += 1;
      return;
    }
    let tempNode = this.head;
    if (typeof position === 'undefined') {
      while (tempNode.next !== null) {
        tempNode  = tempNode.next;
      }
      tempNode.next  = newNode;
      this.size += 1;
      return;
    }
    if (position < 0) return;
    if (position === 0) {
      newNode.next = tempNode;
      this.head = newNode;
      this.size += 1;
      return;
    }
    if (position > this.size) position = this.size;
    for (let i = 0; i < position - 1; i++) {
      tempNode = tempNode.next;
    }
    newNode.next = tempNode.next;
    tempNode.next = newNode;
    this.size += 1;
  }

  getData(position: number) {
    if (position >= this.size || position < 0) return  null;
    let tempNode = this.head;
    for (let i = 0; i < position; i++) {
      tempNode = tempNode.next;
    }
    return tempNode.data;
  }

  removeData(position: number) {
    if (position >= this.size || position < 0) return null;
    this.size -= 1;
    let tempNode = this.head;
    if (position === 0) {
      this.head = tempNode.next;
      return this.head;
    }
    for (let i = 0; i < position - 1; i++) {
      tempNode = tempNode.next;
    }
    tempNode.next = tempNode.next.next;
    return tempNode.next;
  }

  print() {
    document.write('elements in <strong>list</strong> as follows: <br>');  
    let tempNode = this.head;
    while(tempNode != null){  
      document.write(tempNode.data + ' ');
      tempNode = tempNode.next;
    }
    document.write('<br>');
  }
}

const list = new List();
const array = new Array(1,2,3,4,5);
array.forEach(item => list.insert(item));
list.insert(3, 8);
list.print();
list.removeData(2);  
list.print();
console.info(list, '----list---');
