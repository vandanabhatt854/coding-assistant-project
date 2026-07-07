export interface SortingAlgorithm {
  name: string
  description: string
  timeComplexity: {
    best: string
    average: string
    worst: string
  }
  spaceComplexity: string
  stable: boolean
  inPlace: boolean
  code: string
  algorithm: (arr: number[]) => number[]
}

// Bubble Sort
export const bubbleSort = (arr: number[]): number[] => {
  const result = [...arr]
  const n = result.length
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]]
      }
    }
  }
  return result
}

// Selection Sort
export const selectionSort = (arr: number[]): number[] => {
  const result = [...arr]
  const n = result.length
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < n; j++) {
      if (result[j] < result[minIndex]) {
        minIndex = j
      }
    }
    [result[i], result[minIndex]] = [result[minIndex], result[i]]
  }
  return result
}

// Insertion Sort
export const insertionSort = (arr: number[]): number[] => {
  const result = [...arr]
  for (let i = 1; i < result.length; i++) {
    const key = result[i]
    let j = i - 1
    while (j >= 0 && result[j] > key) {
      result[j + 1] = result[j]
      j--
    }
    result[j + 1] = key
  }
  return result
}

// Merge Sort
export const mergeSort = (arr: number[]): number[] => {
  if (arr.length <= 1) return arr

  const mid = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))

  const result: number[] = []
  let i = 0,
    j = 0

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i])
      i++
    } else {
      result.push(right[j])
      j++
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)]
}

// Quick Sort
export const quickSort = (arr: number[]): number[] => {
  if (arr.length <= 1) return arr

  const pivot = arr[Math.floor(arr.length / 2)]
  const left = arr.filter(x => x < pivot)
  const middle = arr.filter(x => x === pivot)
  const right = arr.filter(x => x > pivot)

  return [...quickSort(left), ...middle, ...quickSort(right)]
}

// Heap Sort
export const heapSort = (arr: number[]): number[] => {
  const result = [...arr]
  const n = result.length

  const heapify = (n: number, i: number) => {
    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2

    if (left < n && result[left] > result[largest]) largest = left
    if (right < n && result[right] > result[largest]) largest = right

    if (largest !== i) {
      [result[i], result[largest]] = [result[largest], result[i]]
      heapify(n, largest)
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i)
  }

  for (let i = n - 1; i > 0; i--) {
    [result[0], result[i]] = [result[i], result[0]]
    heapify(i, 0)
  }

  return result
}

// Counting Sort
export const countingSort = (arr: number[]): number[] => {
  if (arr.length === 0) return arr

  const min = Math.min(...arr)
  const max = Math.max(...arr)
  const range = max - min + 1
  const count = new Array(range).fill(0)
  const result: number[] = []

  for (const num of arr) {
    count[num - min]++
  }

  for (let i = 0; i < range; i++) {
    for (let j = 0; j < count[i]; j++) {
      result.push(i + min)
    }
  }

  return result
}

// Radix Sort
export const radixSort = (arr: number[]): number[] => {
  if (arr.length === 0) return arr

  const result = [...arr]
  const max = Math.max(...result)
  let exp = 1

  while (Math.floor(max / exp) > 0) {
    countingSortByDigit(result, exp)
    exp *= 10
  }

  return result
}

const countingSortByDigit = (arr: number[], exp: number) => {
  const count = new Array(10).fill(0)

  for (const num of arr) {
    count[Math.floor(num / exp) % 10]++
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1]
  }

  const output = new Array(arr.length)
  for (let i = arr.length - 1; i >= 0; i--) {
    const index = Math.floor(arr[i] / exp) % 10
    output[count[index] - 1] = arr[i]
    count[index]--
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i]
  }
}

// Bucket Sort
export const bucketSort = (arr: number[]): number[] => {
  if (arr.length === 0) return arr

  const min = Math.min(...arr)
  const max = Math.max(...arr)
  const bucketCount = Math.ceil(Math.sqrt(arr.length))
  const bucketSize = (max - min + 1) / bucketCount
  const buckets: number[][] = Array.from({ length: bucketCount }, () => [])

  for (const num of arr) {
    const bucketIndex = Math.floor((num - min) / bucketSize)
    buckets[Math.min(bucketIndex, bucketCount - 1)].push(num)
  }

  const result: number[] = []
  for (const bucket of buckets) {
    insertionSort(bucket).forEach(num => result.push(num))
  }

  return result
}

// Shell Sort
export const shellSort = (arr: number[]): number[] => {
  const result = [...arr]
  const n = result.length
  let gap = Math.floor(n / 2)

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      const temp = result[i]
      let j = i

      while (j >= gap && result[j - gap] > temp) {
        result[j] = result[j - gap]
        j -= gap
      }

      result[j] = temp
    }

    gap = Math.floor(gap / 2)
  }

  return result
}

// Algorithm definitions with metadata
export const algorithms: Record<string, SortingAlgorithm> = {
  bubbleSort: {
    name: 'Bubble Sort',
    description:
      'Simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
    code: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    algorithm: bubbleSort,
  },
  selectionSort: {
    name: 'Selection Sort',
    description:
      'Divides the array into sorted and unsorted regions, repeatedly selecting the minimum element from the unsorted region.',
    timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true,
    code: `function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}`,
    algorithm: selectionSort,
  },
  insertionSort: {
    name: 'Insertion Sort',
    description:
      'Builds the sorted array one item at a time by inserting elements into their correct position in the sorted portion.',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
    code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    algorithm: insertionSort,
  },
  mergeSort: {
    name: 'Merge Sort',
    description:
      'Divide-and-conquer algorithm that divides the array in half recursively and then merges the sorted halves back together.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: false,
    code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}`,
    algorithm: mergeSort,
  },
  quickSort: {
    name: 'Quick Sort',
    description:
      'Divide-and-conquer algorithm that selects a pivot and partitions the array around it, then recursively sorts the partitions.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    spaceComplexity: 'O(log n)',
    stable: false,
    inPlace: true,
    code: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), ...middle, ...quickSort(right)];
}`,
    algorithm: quickSort,
  },
  heapSort: {
    name: 'Heap Sort',
    description:
      'Uses a heap data structure to sort the array by repeatedly extracting the maximum element and placing it at the end.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true,
    code: `function heapSort(arr) {
  const heapify = (n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(n, largest);
    }
  };
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr.length, i);
  }
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(i, 0);
  }
  return arr;
}`,
    algorithm: heapSort,
  },
  countingSort: {
    name: 'Counting Sort',
    description:
      'Non-comparative algorithm that counts the occurrences of each value and reconstructs the sorted array.',
    timeComplexity: { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n + k)' },
    spaceComplexity: 'O(k)',
    stable: true,
    inPlace: false,
    code: `function countingSort(arr) {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const result = [];
  
  for (const num of arr) {
    count[num - min]++;
  }
  
  for (let i = 0; i < range; i++) {
    for (let j = 0; j < count[i]; j++) {
      result.push(i + min);
    }
  }
  return result;
}`,
    algorithm: countingSort,
  },
  radixSort: {
    name: 'Radix Sort',
    description:
      'Non-comparative algorithm that sorts numbers by processing individual digits, sorting by each digit position.',
    timeComplexity: { best: 'O(nk)', average: 'O(nk)', worst: 'O(nk)' },
    spaceComplexity: 'O(n + k)',
    stable: true,
    inPlace: false,
    code: `function radixSort(arr) {
  const max = Math.max(...arr);
  let exp = 1;
  while (Math.floor(max / exp) > 0) {
    countingSortByDigit(arr, exp);
    exp *= 10;
  }
  return arr;
}`,
    algorithm: radixSort,
  },
  bucketSort: {
    name: 'Bucket Sort',
    description:
      'Distributes elements into buckets, sorts each bucket individually, then concatenates them to get the sorted array.',
    timeComplexity: { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n²)' },
    spaceComplexity: 'O(n + k)',
    stable: true,
    inPlace: false,
    code: `function bucketSort(arr) {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const bucketCount = Math.ceil(Math.sqrt(arr.length));
  const bucketSize = (max - min + 1) / bucketCount;
  const buckets = Array.from({ length: bucketCount }, () => []);
  
  for (const num of arr) {
    const bucketIndex = Math.floor((num - min) / bucketSize);
    buckets[Math.min(bucketIndex, bucketCount - 1)].push(num);
  }
  
  const result = [];
  for (const bucket of buckets) {
    insertionSort(bucket).forEach(num => result.push(num));
  }
  return result;
}`,
    algorithm: bucketSort,
  },
  shellSort: {
    name: 'Shell Sort',
    description:
      'Generalization of insertion sort that allows elements to move multiple positions at a time using a gap sequence.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n^1.5)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true,
    code: `function shellSort(arr) {
  let gap = Math.floor(arr.length / 2);
  while (gap > 0) {
    for (let i = gap; i < arr.length; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
    gap = Math.floor(gap / 2);
  }
  return arr;
}`,
    algorithm: shellSort,
  },
}

export const algorithmKeys = Object.keys(algorithms) as Array<keyof typeof algorithms>
