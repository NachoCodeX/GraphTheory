import { Edge } from './edge';
import { Vertex } from './vertex';

export class Graph {
  private vertices: Map<string, Vertex>;
  private edges: Set<Edge>;

  constructor(vertices: Map<string, Vertex> = new Map(), edges: Set<Edge> = new Set()) {
    this.vertices = vertices;
    this.edges = edges;
  }

  addVertex(label: string) {
    if (!this.getVertex(label)) {
      const v = new Vertex(label);
      this.vertices.set(label, v);
      return v;
    }
    throw new Error(`${label} already exists in the graph`);
  }

  addMultipleVertices(labels: string[]) {
    if (!this.getVertices(labels).length) {
      const vertices = labels.map(label => new Vertex(label));
      vertices.forEach(vertex => this.vertices.set(vertex.label, vertex));
      return vertices;
    }
  }

  addEdge(vLabel1: string, vLabel2: string) {
    const v1 = this.getVertex(vLabel1);
    const v2 = this.getVertex(vLabel2);

    if (!v1 || !v2) throw new Error('Vertex does not exist in the graph');
    else if (vLabel1 === vLabel2) throw new Error(`You cannot connect the vertex with itself`);
    /// Add adjacent vertex
    v1.addAdjacentVertex(v2);
    v2.addAdjacentVertex(v1);
    const e = new Edge(v1, v2);
    this.edges.add(e);
    return e;
  }
  addMultipleEdge(vLabel: string, labels: string[]) {
    const vertices = this.getVertices([vLabel, ...labels]);

    if (labels.includes(vLabel)) throw new Error(`You cannot connect the vertex with itself`);
    else if (labels.length + 1 != vertices.length) throw new Error('Some vertices do not exist in the graph');

    const rootVertex = vertices.shift();
    return vertices
      .map(vertex => this.createEdgeAndAddAdjacent(rootVertex!, vertex))
      .forEach(edge => this.edges.add(edge));
  }

  private createEdgeAndAddAdjacent(rootVertex: Vertex, vertex: Vertex) {
    rootVertex.addAdjacentVertex(vertex);
    vertex.addAdjacentVertex(rootVertex);
    return new Edge(rootVertex, vertex);
  }

  public getVertex(label: string) {
    // return Array.from(this.vertices.values()).filter(vertex => vertex.label === label)[0];
    return [...this.vertices.values()].filter(vertex => vertex.label === label)[0];
  }
  private getVertices(labels: string[]) {
    // return Array.from(this.vertices.values()).filter(vertex => labels.includes(vertex.label));
    return [...this.vertices.values()].filter(vertex => labels.includes(vertex.label));
  }

  // number of vertices |V|
  get order() {
    return this.vertices.size;
  }

  getVertexDegree(vertexLabel: string): number {
    return this.getVertex(vertexLabel).degree;
  }

  // number of edges |E|
  get size() {
    return this.edges.size;
  }
  dfs(startVertexLabel: string = 'A') {
    // get the start vertex by label
    const startVertex = this.getVertex(startVertexLabel);
    // mark starting vertex as visited
    startVertex.isVisited = true;
    // A super awesome array who feels like a Queue  xD
    const queue: Vertex[] = [];
    const visitedVertex: string[] = [];
    // Enqueue the startVertex
    queue.push(startVertex);
    visitedVertex.push(startVertex.label);
    // while queue is not empty continue do stuff
    while (queue.length > 0) {
      // Dequeue and now it is the current vertex
      let currentVertex = queue.shift();
      console.log(`Current vertex: ${currentVertex!.label}`);

      const unvisitedChildren = currentVertex!.adjacents.filter(a => !a.isVisited);

      console.log(`Children of current vertex: ${unvisitedChildren.length}`);

      if (unvisitedChildren.length > 0) {
        console.log(unvisitedChildren.map(v => v.label));
        queue.sort((v1, v2) => (v1.ascciCode > v2.ascciCode ? 1 : -1));
        console.log(queue.map(v => v.label));
      } else {
        console.log(currentVertex!.label);
        visitedVertex.push(currentVertex!.label);
      }
    }
  }
  bfs() {}
}
