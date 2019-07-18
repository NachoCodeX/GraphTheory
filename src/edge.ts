import { Vertex } from './vertex';

export class Edge {
  constructor(public readonly source: Vertex, public readonly target: Vertex) {}
}
