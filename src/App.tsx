import { useRef, useState } from "react";
import Map from "./components/Map";
import RouteMenu from "./components/RouteMenu";
import { findShortestPath, pathToCoordinates } from "./utils/graph";
import L from "leaflet";
import { INITIAL_CENTER, INITIAL_ZOOM } from "./utils/mapConstants";

function App() {
  const [route, setRoute] = useState<[number, number][]>([]);
  const [pathCities, setPathCities] = useState<string[]>([]);
  const mapRef = useRef<L.Map | null>(null);

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

  const handleResetView = () => {
    if (mapRef.current) {
      mapRef.current.flyTo(INITIAL_CENTER, INITIAL_ZOOM);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      <RouteMenu
        onSearch={handleSearch}
        pathCities={pathCities}
        onResetView={handleResetView}
      />
      <Map route={route} ref={mapRef} />
    </div>
  );
}

export default App;
