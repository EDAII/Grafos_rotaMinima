import { useState } from "react";
import Map from "./components/Map";
import RouteMenu from "./components/RouteMenu";
import { cities } from "./utils/cities";

function App() {
  
  const [route, setRoute] = useState<[number, number][]>([]); 

  const handleSearch = (origin: string, destination: string) => {
      const originCity = cities.find(c => c.name === origin);
      const destCity = cities.find(c => c.name === destination);
      if (originCity && destCity) {
        setRoute([originCity.coordenadas, destCity.coordenadas]);
      }
    };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      <RouteMenu onSearch={handleSearch} />
      <Map route={route}/>
    </div>
  );
}

export default App;
