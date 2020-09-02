import { timingSafeEqual } from "crypto";

class DoubleListNode {
  next: any = null; // 下一项
  prev: any = null; // 上一项
  data: any = null; // 值
  constructor(data: any) {
    this.data = data;
  }
}

class DoubleList {
  head: any = null;
  tail: any = null; // 末项
  size: number = 0;
  constructor() {
  }

  getData(position: number) {
    if (position >= this.size || position < 0) return  null;
    let tempNode = this.head;
    for (let i = 0; i < position; i++) {
      tempNode = tempNode.next;
    }
    return tempNode.data;
  }

  insert(data: any, position?: number) {
    const newNode = new DoubleListNode(data);
    let tempNode = this.head;
    let index = 0;
    let previous = null;

    if (typeof position === 'undefined') {
      // 空链表
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        tempNode = this.tail;
        tempNode.next = newNode;
        newNode.prev = tempNode;
        this.tail = newNode;
      }
    } else {
      if (position < 0) return;
      if (position === 0) {
        if (!this.head) {
          this.head = newNode;
          this.tail = newNode;
        } else {
          newNode.next = tempNode;
          tempNode.prev = newNode;
          this.head = newNode;
        }
      } else {
        if (position >= this.size) {
          tempNode = this.tail;
          tempNode.next = newNode;
          newNode.prev = tempNode;
          this.tail = newNode;
        }
        while (index++ < position) {
          previous = tempNode;
          tempNode = tempNode.next;
        }
        newNode.next = tempNode;
        previous.next = newNode;
      }
    }

    this.size += 1;
  }

  remove(position: number) {
    if (position < 0) return null;
    let tempNode = this.head;
    let index = 0;
    let previous = null;
    if (position === 0) {
      this.head = tempNode.next;
      if (this.size === 0) {
        this.tail = null;
      } else {
        this.head.prev = null;
      }
    } else if (position === this.size) {
      tempNode = this.tail;
      this.tail = tempNode.prev;
      this.tail.next = null;
    } else {
      while (index++ < position) {
        previous = tempNode;
        tempNode = tempNode.next;
      }
      previous.next = tempNode.next;
      tempNode.next.prev = previous;
    }
    this.size -= 1;
  }

  print() {
    console.info(this.head, '----head---');
    document.write('elements in <strong>double-list</strong> as follows: <br>'); 
    let tempNode = this.head;
    while(tempNode != null){  
      document.write(tempNode.data + ' ');
      tempNode = tempNode.next;
    }
    document.write('<br>');
  }
}

const doubleList = new DoubleList();
const arr = [1,2,3,4,5,6];

arr.forEach(item => doubleList.insert(item));
doubleList.print();

doubleList.insert('a', 0);
doubleList.print();

doubleList.remove(0);
doubleList.print();
