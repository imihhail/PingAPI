class Node {
    constructor(value) {
        this.value = value
        this.next  = null
        this.prev  = null
    }
}

class LinkedList {
    constructor() {
        this.end = null
        this.start = null
        this.length = 0
    }

  append(value) {
    const node = new Node(value);

    if (!this.start) {
      this.start = node;
      this.end = node;
    } else {
      node.prev = this.end
      this.end.next = node;
      this.end = node;
    }
  }

  removeEnd() {
    this.end = this.end.prev
    this.end.next = null
  }

  removeStart() {
    this.start = this.start.next
    this.start.prev = null
    console.log("START", this.start);
    
  }

  toArray() {
  const arr = [];
  let cur = this.start;

  while (cur) {
    arr.push(cur.value);
    cur = cur.next;
  }
  return arr;
  }
}

const list = new LinkedList

list.append(3)
list.append(5)
list.append(7)
list.append(8)
list.append(9)
list.append(10)
list.removeStart()
list.removeEnd()
for (const v of list) console.log(v)
