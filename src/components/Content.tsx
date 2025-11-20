import { useState } from "react";
import { CircleMarker, MapContainer, TileLayer, Tooltip, Polyline } from "react-leaflet";
import { cities } from "../utils/cities";
import RouteMenu from "./RouteMenu";
import "leaflet/dist/leaflet.css";

function Content() {
  const [route, setRoute] = useState<[number, number][]>([]); 

  const handleSearch = (origin: string, destination: string) => {
    console.log("Buscando rota de", origin, "para", destination);
    // exemplo de linha reta entre as duas cidades:
    const originCity = cities.find(c => c.name === origin);
    const destCity = cities.find(c => c.name === destination);
    if (originCity && destCity) {
      setRoute([originCity.coordenadas, destCity.coordenadas]);
    }
  };

  return (
    <div className="flex h-screen">
      <RouteMenu onSearch={handleSearch} />

      <div className="flex-1 relative">
        <MapContainer
          center={[-15.793889, -47.882778]}
          zoom={10}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          {cities.map((city) => (
            <CircleMarker
              key={city.name}
              center={city.coordenadas}
              radius={6}
               pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.6 }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                {city.name}
              </Tooltip>
            </CircleMarker>
          ))}

          {/* Rota temporária (linha reta) */}
          {route.length === 2 && (
            <Polyline
              positions={route}
              color="#ef4444"
              weight={5}
              opacity={0.8}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default Content;