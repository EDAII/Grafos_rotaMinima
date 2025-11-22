import { useState } from "react";
import Map from "./components/Map";
import RouteMenu from "./components/RouteMenu";
import { findShortestPath, pathToCoordinates } from "./utils/graph";

function App() {
  const [route, setRoute] = useState<[number, number][]>([]);
  const [pathCities, setPathCities] = useState<string[]>([]);

  const handleSearch = (origin: string, destination: string) => {
    const path = findShortestPath(origin, destination);

    if (path) {
      const coordinates = pathToCoordinates(path);
      setRoute(coordinates);
      setPathCities(path);
      console.log("Menor caminho encontrado:", path.join(" → "));
    } else {
      alert("Não há caminho entre essas cidades!");
      setRoute([]);
      setPathCities([]);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      <RouteMenu onSearch={handleSearch} pathCities={pathCities} />
      <Map route={route} />
    </div>
  );
}

export default App;