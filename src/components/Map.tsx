import {
  CircleMarker,
  MapContainer,
  TileLayer,
  Tooltip,
  Polyline,
} from "react-leaflet";
import { cities } from "../utils/cities";
import "leaflet/dist/leaflet.css";

function Map({ route }: { route: [number, number][] }) {
  return (
    <div className="flex-1 relative">
      <MapContainer
        center={[-15.783889, -47.812778]}
        zoom={11}
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
            pathOptions={{
              color: "blue",
              fillColor: "blue",
              fillOpacity: 0.6,
            }}
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
  );
}

export default Map;
