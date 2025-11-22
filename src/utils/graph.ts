import { cities } from "./cities";
import { routes } from "./routes";

const coordToCity = new Map<string, string>();
cities.forEach(city => {
  coordToCity.set(city.coordenadas.join(","), city.name);
});

const cityToCoord = new Map<string, [number, number]>();
cities.forEach(city => {
  cityToCoord.set(city.name, city.coordenadas);
});

export const graph = new Map<string, string[]>();

cities.forEach(city => graph.set(city.name, []));

routes.forEach(([coordA, coordB]) => {
  const a = coordToCity.get(coordA.join(","));
  const b = coordToCity.get(coordB.join(","));
  if (a && b) {
    graph.get(a)!.push(b);
    graph.get(b)!.push(a);
  }
});

// Função BFS para encontrar o menor caminho
export function findShortestPath(start: string, end: string): string[] | null {
  if (start === end) return [start];

  const queue: string[] = [start];
  const visited = new Set<string>();
  const parent = new Map<string, string | null>();

  visited.add(start);
  parent.set(start, null);

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (current === end) {
      const path: string[] = [];
      let node: string | null = current;
      while (node !== null) {
        path.unshift(node);
        node = parent.get(node)!;
      }
      return path;
    }

    const neighbors = graph.get(current) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        parent.set(neighbor, current);
        queue.push(neighbor);
      }
    }
  }

  return null; 
}

export function pathToCoordinates(path: string[]): [number, number][] {
  return path.map(cityName => cityToCoord.get(cityName)!);
}