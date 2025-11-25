import { useRef, useState } from "react";
import Map from "./components/Map";
import RouteMenu from "./components/RouteMenu";
import { findShortestPathWithTracing } from "./utils/graph";
import L from "leaflet";
import { INITIAL_CENTER, INITIAL_ZOOM } from "./utils/mapConstants";

function App() {
  const [finalRoute, setFinalRoute] = useState<[number, number][]>([]);
  const [animatedRoute, setAnimatedRoute] = useState<[number, number][]>([]);
  const [pathCities, setPathCities] = useState<string[]>([]);
  const [visitedCities, setVisitedCities] = useState<string[]>([]);
  const [queueCities, setQueueCities] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const mapRef = useRef<L.Map | null>(null);

  const handleSearchAndAnimate = (origin: string, destination: string) => {
    if (isAnimating) return;

    setAnimatedRoute([]);
    setFinalRoute([]);
    setPathCities([]);
    setVisitedCities([]);
    setQueueCities([]);
    setIsAnimating(true);

    const result = findShortestPathWithTracing(origin, destination);
    if (!result) {
      alert("Não há caminho entre essas cidades!");
      setIsAnimating(false);
      return;
    }

    const path = result.path;
    const coords = result.coordinates;

    let i = 0;
    const visited = new Set<string>([origin]);

    const animate = () => {
      if (i >= path.length) {
        setTimeout(() => {
          setFinalRoute(coords);
          setPathCities(path);
          setIsAnimating(false);
        }, 800);
        return;
      }

      const currentCity = path[i];
      visited.add(currentCity);

      setVisitedCities(Array.from(visited));
      setQueueCities([]);

      if (i > 0) {
        setAnimatedRoute(coords.slice(0, i + 1));
      }

      i++;
      setTimeout(animate, 900);
    };

    animate();
  };

  const handleResetView = () => {
    mapRef.current?.flyTo(INITIAL_CENTER, INITIAL_ZOOM, { duration: 1.5 });
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      <RouteMenu
        onSearch={handleSearchAndAnimate}
        pathCities={pathCities}
        isAnimating={isAnimating}
        onResetView={handleResetView}
      />
      <Map
        route={finalRoute.length > 0 ? finalRoute : animatedRoute}
        ref={mapRef}
        visitedCities={visitedCities}
        queueCities={queueCities}
        pathCities={pathCities}
        isAnimating={isAnimating}
      />
    </div>
  );
}

export default App;