export class Vertex {
  private readonly adjacentVertices: Vertex[] = [];
  public isVisited: boolean = false;

  constructor(public readonly label: string) {}

  get degree() {
    return this.adjacentVertices.length;
  }

  get ascciCode() {
    return this.label.charCodeAt(0);
  }

  public addAdjacentVertex(v: Vertex) {
    this.adjacentVertices.push(v);
  }
  public get adjacents() {
    return this.adjacentVertices;
  }
}
