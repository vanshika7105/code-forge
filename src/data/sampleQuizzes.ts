
import { QuizQuestion } from "@/types/quiz";

// Sample questions for different topics (fallback if AI generation fails)
const sampleQuizzes: Record<string, QuizQuestion[]> = {
  'JavaScript Basics': [
    {
      id: 'js1',
      question: 'What is the output of: console.log(typeof [])?',
      options: ['array', 'object', 'undefined', 'null'],
      correctAnswer: 'object',
      explanation: 'In JavaScript, arrays are actually objects, so typeof [] returns "object".'
    },
    {
      id: 'js2',
      question: 'Which method is used to add one or more elements to the end of an array?',
      options: ['push()', 'pop()', 'concat()', 'shift()'],
      correctAnswer: 'push()',
      explanation: 'The push() method adds one or more elements to the end of an array and returns the new length.'
    },
    {
      id: 'js3',
      question: 'What is the result of 2 + "2" in JavaScript?',
      options: ['4', '"22"', '22', 'Error'],
      correctAnswer: '"22"',
      explanation: 'When adding a number to a string, JavaScript will convert the number to a string and concatenate them.'
    },
    {
      id: 'js4',
      question: 'What is a closure in JavaScript?',
      options: [
        'A function that returns another function',
        'A function that has access to variables in its outer scope',
        'A way to close a browser window',
        'A method to end a loop'
      ],
      correctAnswer: 'A function that has access to variables in its outer scope',
      explanation: 'A closure is a function that has access to variables in its outer (enclosing) scope, even after the outer function has finished executing.'
    },
    {
      id: 'js5',
      question: 'What is the correct way to create a JavaScript object?',
      options: [
        'var obj = Object();',
        'var obj = new Object();',
        'var obj = {};',
        'Both B and C are correct'
      ],
      correctAnswer: 'Both B and C are correct',
      explanation: 'In JavaScript, you can create objects using the object literal syntax {} or using the Object constructor with new Object().'
    }
  ],
  'Data Structures': [
    {
      id: 'ds1',
      question: 'Which data structure uses LIFO (Last In, First Out)?',
      options: ['Queue', 'Stack', 'Linked List', 'Tree'],
      correctAnswer: 'Stack',
      explanation: 'A stack follows LIFO principle where the last element added is the first one to be removed.'
    },
    {
      id: 'ds2',
      question: 'What is the time complexity of searching in a balanced binary search tree?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
      correctAnswer: 'O(log n)',
      explanation: 'In a balanced binary search tree, each comparison eliminates roughly half of the remaining tree, leading to a logarithmic time complexity.'
    },
    {
      id: 'ds3',
      question: 'Which of the following is NOT a linear data structure?',
      options: ['Array', 'Linked List', 'Queue', 'Tree'],
      correctAnswer: 'Tree',
      explanation: 'A tree is a hierarchical (non-linear) data structure with a root node and child nodes.'
    },
    {
      id: 'ds4',
      question: 'What data structure would be most efficient for implementing a priority queue?',
      options: ['Array', 'Linked List', 'Heap', 'Hash Table'],
      correctAnswer: 'Heap',
      explanation: 'A heap (typically implemented as a binary heap) provides efficient operations for priority queue operations like insertion and extracting the highest/lowest priority element.'
    },
    {
      id: 'ds5',
      question: 'What is the main advantage of a hash table?',
      options: [
        'Ordered elements',
        'Fast average case for insertions and lookups',
        'Memory efficiency',
        'Simplicity of implementation'
      ],
      correctAnswer: 'Fast average case for insertions and lookups',
      explanation: 'Hash tables provide O(1) average time complexity for insertions, deletions, and lookups, making them very efficient for these operations.'
    }
  ],
  'Algorithms': [
    {
      id: 'algo1',
      question: 'What is the time complexity of quicksort in the average case?',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
      correctAnswer: 'O(n log n)',
      explanation: 'Quicksort has an average time complexity of O(n log n), making it efficient for large datasets. However, its worst-case complexity is O(n²).'
    },
    {
      id: 'algo2',
      question: 'Which algorithm is used to find the shortest path in a weighted graph?',
      options: ['Depth-First Search', 'Breadth-First Search', "Dijkstra's Algorithm", "Kruskal's Algorithm"],
      correctAnswer: "Dijkstra's Algorithm",
      explanation: "Dijkstra's algorithm finds the shortest path from a starting node to all other nodes in a weighted graph with non-negative weights."
    },
    {
      id: 'algo3',
      question: 'What problem does dynamic programming solve?',
      options: [
        'Finding the longest path in a graph',
        'Optimization problems with overlapping subproblems',
        'Sorting arrays efficiently',
        'Finding prime numbers'
      ],
      correctAnswer: 'Optimization problems with overlapping subproblems',
      explanation: 'Dynamic programming is used for optimization problems where the same subproblems are solved multiple times, by storing results of subproblems to avoid redundant computation.'
    },
    {
      id: 'algo4',
      question: 'Which sorting algorithm is known for its stability?',
      options: ['Quicksort', 'Merge Sort', 'Heap Sort', 'Selection Sort'],
      correctAnswer: 'Merge Sort',
      explanation: 'Merge sort is a stable sorting algorithm, meaning it preserves the relative order of equal elements in the sorted output.'
    },
    {
      id: 'algo5',
      question: 'What is the space complexity of Breadth-First Search?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      correctAnswer: 'O(n)',
      explanation: 'BFS requires a queue to store nodes to visit next, which in the worst case can contain all nodes in the graph, leading to O(n) space complexity.'
    }
  ],
  'React': [
    {
      id: 'react1',
      question: 'What is JSX in React?',
      options: [
        'A JavaScript library',
        'A syntax extension that allows writing HTML-like code in JavaScript',
        'A build tool',
        'A React component'
      ],
      correctAnswer: 'A syntax extension that allows writing HTML-like code in JavaScript',
      explanation: 'JSX is a syntax extension for JavaScript that looks similar to HTML and makes it easier to write and understand the structure of UI components in React.'
    },
    {
      id: 'react2',
      question: 'What is the purpose of the useState hook?',
      options: [
        'To perform side effects in functional components',
        'To manage state in functional components',
        'To handle form submissions',
        'To create custom hooks'
      ],
      correctAnswer: 'To manage state in functional components',
      explanation: 'useState is a React Hook that allows functional components to have local state, returning the current state value and a function to update it.'
    },
    {
      id: 'react3',
      question: 'What is a "key" prop in React lists?',
      options: [
        'A prop that encrypts component data',
        'A special prop that helps React identify which items have changed, been added, or removed',
        'A prop that defines CSS keys for styling',
        'A prop that manages keyboard events'
      ],
      correctAnswer: 'A special prop that helps React identify which items have changed, been added, or removed',
      explanation: 'The "key" prop is a special attribute that helps React efficiently update the DOM when the list changes by uniquely identifying elements.'
    },
    {
      id: 'react4',
      question: 'What is the correct lifecycle method to make API calls in class components?',
      options: [
        'componentWillMount',
        'componentDidMount',
        'componentWillUpdate',
        'render'
      ],
      correctAnswer: 'componentDidMount',
      explanation: 'componentDidMount is called after a component is mounted to the DOM, making it the ideal place to perform initial API calls or subscriptions.'
    },
    {
      id: 'react5',
      question: 'What is the equivalent of componentDidMount when using hooks?',
      options: [
        'useEffect(() => {}, [])',
        'useState()',
        'useContext()',
        'useReducer()'
      ],
      correctAnswer: 'useEffect(() => {}, [])',
      explanation: 'useEffect with an empty dependency array runs once after the initial render, similar to componentDidMount in class components.'
    }
  ]
};

export default sampleQuizzes;
