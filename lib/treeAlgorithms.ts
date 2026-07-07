export interface TreeAlgorithm {
  name: string
  description: string
  timeComplexity: {
    search?: string
    insert?: string
    delete?: string
  }
  spaceComplexity: string
  code: string
}

export const algorithms: Record<string, TreeAlgorithm> = {
  binaryTree: {
    name: 'Binary Tree',
    description: 'A tree data structure where each node has at most two children. Used as a foundation for more specialized tree structures. Supports traversals like inorder, preorder, and postorder.',
    timeComplexity: {
      search: 'O(n)',
      insert: 'O(n)',
      delete: 'O(n)',
    },
    spaceComplexity: 'O(n)',
    code: `class Node {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}

class BinaryTree {
  constructor() {
    this.root = null
  }

  insert(val) {
    const node = new Node(val)
    if (this.root === null) {
      this.root = node
      return this
    }
    
    const queue = [this.root]
    while (queue.length) {
      const current = queue.shift()
      
      if (current.left === null) {
        current.left = node
        return this
      } else {
        queue.push(current.left)
      }
      
      if (current.right === null) {
        current.right = node
        return this
      } else {
        queue.push(current.right)
      }
    }
  }

  inorderTraversal(node = this.root, result = []) {
    if (node === null) return result
    
    this.inorderTraversal(node.left, result)
    result.push(node.val)
    this.inorderTraversal(node.right, result)
    
    return result
  }
}

// Example usage
const tree = new BinaryTree()
tree.insert(1)
tree.insert(2)
tree.insert(3)
console.log(tree.inorderTraversal())  // Output: [2, 1, 3]`,
  },
  bst: {
    name: 'Binary Search Tree (BST)',
    description: 'A binary tree where left child values are less than parent, and right child values are greater. Enables efficient searching and sorting. Unbalanced trees can degrade to O(n) performance.',
    timeComplexity: {
      search: 'O(log n) avg, O(n) worst',
      insert: 'O(log n) avg, O(n) worst',
      delete: 'O(log n) avg, O(n) worst',
    },
    spaceComplexity: 'O(n)',
    code: `class TreeNode {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}

class BST {
  constructor() {
    this.root = null
  }

  insert(val) {
    const node = new TreeNode(val)
    if (this.root === null) {
      this.root = node
      return this
    }
    
    let current = this.root
    while (true) {
      if (val === current.val) return undefined
      
      if (val < current.val) {
        if (current.left === null) {
          current.left = node
          return this
        }
        current = current.left
      } else {
        if (current.right === null) {
          current.right = node
          return this
        }
        current = current.right
      }
    }
  }

  search(val) {
    let current = this.root
    while (current !== null) {
      if (val === current.val) return true
      if (val < current.val) {
        current = current.left
      } else {
        current = current.right
      }
    }
    return false
  }
}

// Example usage
const bst = new BST()
bst.insert(10)
bst.insert(5)
bst.insert(15)
console.log(bst.search(5))   // Output: true
console.log(bst.search(20))  // Output: false`,
  },
  avlTree: {
    name: 'AVL Tree',
    description: 'A self-balancing binary search tree that maintains balance through rotations. Guarantees O(log n) time for search, insert, and delete operations regardless of input order.',
    timeComplexity: {
      search: 'O(log n)',
      insert: 'O(log n)',
      delete: 'O(log n)',
    },
    spaceComplexity: 'O(n)',
    code: `class AVLNode {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
    this.height = 1
  }
}

class AVLTree {
  constructor() {
    this.root = null
  }

  getHeight(node) {
    return node === null ? 0 : node.height
  }

  getBalance(node) {
    return node === null ? 0 : this.getHeight(node.left) - this.getHeight(node.right)
  }

  rotateRight(y) {
    const x = y.left
    const T2 = x.right
    
    x.right = y
    y.left = T2
    
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1
    
    return x
  }

  rotateLeft(x) {
    const y = x.right
    const T2 = y.left
    
    y.left = x
    x.right = T2
    
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1
    
    return y
  }

  insert(val) {
    this.root = this._insertNode(this.root, val)
  }

  _insertNode(node, val) {
    if (node === null) return new AVLNode(val)
    
    if (val < node.val) {
      node.left = this._insertNode(node.left, val)
    } else if (val > node.val) {
      node.right = this._insertNode(node.right, val)
    } else {
      return node
    }
    
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1
    const balance = this.getBalance(node)
    
    // Left Left Case
    if (balance > 1 && val < node.left.val) {
      return this.rotateRight(node)
    }
    
    // Right Right Case
    if (balance < -1 && val > node.right.val) {
      return this.rotateLeft(node)
    }
    
    // Left Right Case
    if (balance > 1 && val > node.left.val) {
      node.left = this.rotateLeft(node.left)
      return this.rotateRight(node)
    }
    
    // Right Left Case
    if (balance < -1 && val < node.right.val) {
      node.right = this.rotateRight(node.right)
      return this.rotateLeft(node)
    }
    
    return node
  }
}

// Example usage
const avl = new AVLTree()
avl.insert(10)
avl.insert(5)
avl.insert(15)
avl.insert(2)
avl.insert(7)`,
  },
  segmentTree: {
    name: 'Segment Tree',
    description: 'A tree structure for storing intervals and performing efficient range queries and updates. Commonly used for range sum, min, max queries. Often used in competitive programming.',
    timeComplexity: {
      search: 'O(log n)',
      insert: 'O(log n)',
    },
    spaceComplexity: 'O(n)',
    code: `class SegmentTree {
  constructor(arr) {
    this.n = arr.length
    this.tree = new Array(4 * this.n).fill(0)
    this.build(arr, 0, 0, this.n - 1)
  }

  build(arr, node, start, end) {
    if (start === end) {
      this.tree[node] = arr[start]
    } else {
      const mid = Math.floor((start + end) / 2)
      const leftChild = 2 * node + 1
      const rightChild = 2 * node + 2
      
      this.build(arr, leftChild, start, mid)
      this.build(arr, rightChild, mid + 1, end)
      
      this.tree[node] = this.tree[leftChild] + this.tree[rightChild]
    }
  }

  rangeQuery(node, start, end, l, r) {
    if (r < start || end < l) return 0
    
    if (l <= start && end <= r) {
      return this.tree[node]
    }
    
    const mid = Math.floor((start + end) / 2)
    const leftSum = this.rangeQuery(2 * node + 1, start, mid, l, r)
    const rightSum = this.rangeQuery(2 * node + 2, mid + 1, end, l, r)
    
    return leftSum + rightSum
  }

  query(l, r) {
    return this.rangeQuery(0, 0, this.n - 1, l, r)
  }

  updateRange(node, start, end, idx, val) {
    if (start === end) {
      this.tree[node] = val
    } else {
      const mid = Math.floor((start + end) / 2)
      if (idx <= mid) {
        this.updateRange(2 * node + 1, start, mid, idx, val)
      } else {
        this.updateRange(2 * node + 2, mid + 1, end, idx, val)
      }
      
      this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2]
    }
  }

  update(idx, val) {
    this.updateRange(0, 0, this.n - 1, idx, val)
  }
}

// Example usage
const arr = [1, 3, 5, 7, 9, 11]
const segTree = new SegmentTree(arr)
console.log(segTree.query(1, 4))  // Range sum from index 1 to 4
segTree.update(2, 10)
console.log(segTree.query(1, 4))  // Updated range sum`,
  },
  fenwickTree: {
    name: 'Fenwick Tree (Binary Indexed Tree)',
    description: 'Also called Binary Indexed Tree. Efficient for prefix sum queries and updates. More space-efficient than segment trees. Commonly used in competitive programming and data analysis.',
    timeComplexity: {
      search: 'O(log n)',
      insert: 'O(log n)',
    },
    spaceComplexity: 'O(n)',
    code: `class FenwickTree {
  constructor(n) {
    this.n = n
    this.tree = new Array(n + 1).fill(0)
  }

  update(idx, delta) {
    idx++  // 1-indexed
    while (idx <= this.n) {
      this.tree[idx] += delta
      idx += idx & (-idx)
    }
  }

  query(idx) {
    idx++  // 1-indexed
    let sum = 0
    while (idx > 0) {
      sum += this.tree[idx]
      idx -= idx & (-idx)
    }
    return sum
  }

  rangeQuery(l, r) {
    if (l === 0) return this.query(r)
    return this.query(r) - this.query(l - 1)
  }
}

// Example usage
const ft = new FenwickTree(6)
ft.update(0, 1)
ft.update(1, 3)
ft.update(2, 5)
ft.update(3, 7)
ft.update(4, 9)
ft.update(5, 11)

console.log(ft.rangeQuery(1, 4))  // Sum from index 1 to 4 = 24
console.log(ft.rangeQuery(0, 2))  // Sum from index 0 to 2 = 9`,
  },
  trie: {
    name: 'Trie (Prefix Tree)',
    description: 'A tree structure for storing strings where each node represents a character. Efficient for autocomplete, spell checking, and prefix matching. O(m) where m is length of string.',
    timeComplexity: {
      search: 'O(m)',
      insert: 'O(m)',
      delete: 'O(m)',
    },
    spaceComplexity: 'O(ALPHABET_SIZE * N * M)',
    code: `class TrieNode {
  constructor() {
    this.children = {}
    this.isEndOfWord = false
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode()
  }

  insert(word) {
    let node = this.root
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode()
      }
      node = node.children[char]
    }
    node.isEndOfWord = true
  }

  search(word) {
    const node = this._findNode(word)
    return node !== null && node.isEndOfWord
  }

  startsWith(prefix) {
    return this._findNode(prefix) !== null
  }

  _findNode(word) {
    let node = this.root
    for (const char of word) {
      if (!node.children[char]) {
        return null
      }
      node = node.children[char]
    }
    return node
  }

  autocomplete(prefix) {
    const node = this._findNode(prefix)
    if (node === null) return []
    
    const results = []
    this._dfs(node, prefix, results)
    return results
  }

  _dfs(node, current, results) {
    if (node.isEndOfWord) {
      results.push(current)
    }
    
    for (const char in node.children) {
      this._dfs(node.children[char], current + char, results)
    }
  }
}

// Example usage
const trie = new Trie()
trie.insert('apple')
trie.insert('app')
trie.insert('application')

console.log(trie.search('app'))        // true
console.log(trie.startsWith('app'))    // true
console.log(trie.autocomplete('app'))  // ["app", "apple", "application"]`,
  },
}

export const algorithmKeys = Object.keys(algorithms) as Array<keyof typeof algorithms>
