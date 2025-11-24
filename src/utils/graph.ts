import { cities } from "./cities";
import { routes } from "./routes";

const coordToCity: Record<string, string> = {};
const cityToCoord: Record<string, [number, number]> = {};
cities.forEach(c => {
  coordToCity[c.coordenadas.join(",")] = c.name;
  cityToCoord[c.name] = c.coordenadas;
});

export const graph: Record<string, string[]> = {};
cities.forEach(c => graph[c.name] = []);

routes.forEach(([a, b]) => {
  const A = coordToCity[a.join(",")];
  const B = coordToCity[b.join(",")];
  if (A && B) {
    graph[A].push(B);
    graph[B].push(A);
  }
});

export interface BFSResult {
  path: string[];
  coordinates: [number, number][];
}

export function findShortestPathWithTracing(start: string, end: string): BFSResult | null {
  if (start === end) {
    return { path: [start], coordinates: [cityToCoord[start]] };
  }

  const queue = [start];
  const visited = new Set<string>([start]);
  const parent: Record<string, string> = { [start]: "" };

  while (queue.length > 0) {
    const curr = queue.shift()!;

    if (curr === end) {
      const path: string[] = [];
      let node: string = curr;
      while (node !== "") {
        path.unshift(node);
        node = parent[node];
      }
      const coordinates = path.map(name => cityToCoord[name]);
      return { path, coordinates };
    }

    for (const neigh of graph[curr] || []) {
      if (!visited.has(neigh)) {
        visited.add(neigh);
        parent[neigh] = curr;
        queue.push(neigh);
      }
    }
  }
  return null;
}

export function pathToCoordinates(path: string[]): [number, number][] {
  return path.map(n => cityToCoord[n]);
}