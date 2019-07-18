import { Graph } from './graph';

const graph = new Graph();

// graph.addMultipleVertices(

// );
const letters = Array.from({ length: 22 }, (v, k) => k + 1)
  .map(v => v + 64)
  .map(v => String.fromCharCode(v));

// console.log(letters);

graph.addMultipleVertices(letters);

graph.addEdge('A', 'B');
graph.addMultipleEdge('B', ['C', 'F']);
graph.addMultipleEdge('C', ['D', 'E']);
graph.addEdge('E', 'I');
graph.addEdge('F', 'G');
graph.addMultipleEdge('G', ['H', 'L', 'K', 'I']);
graph.addMultipleEdge('I', ['K', 'J']);
graph.addMultipleEdge('J', ['O', 'P']);
graph.addEdge('L', 'N');
graph.addEdge('M', 'N');
graph.addMultipleEdge('N', ['T', 'O']);
graph.addEdge('O', 'R');
graph.addMultipleEdge('P', ['R', 'Q', 'V']);
graph.addEdge('R', 'U');
graph.addEdge('S', 'T');
graph.addEdge('T', 'U');

graph.dfs();
