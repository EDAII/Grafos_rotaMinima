import {
  CircleMarker,
  MapContainer,
  TileLayer,
  Tooltip,
  Polyline,
} from "react-leaflet";
import { cities } from "../utils/cities";
import "leaflet/dist/leaflet.css";
import { routes } from "../utils/routes";

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
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {cities.map((city) => (
          <CircleMarker
            key={city.name}
            center={city.coordenadas}
            radius={7}
            pathOptions={{
              color: "#1e40af",
              weight: 2,
              fillColor: "#3b82f6",
              fillOpacity: 0.8,
            }}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
              {city.name}
            </Tooltip>
          </CircleMarker>
        ))}

        {routes.map((segment, index) => (
          <Polyline
            key={`bg-${index}`}
            positions={segment}
            color="#374151"
            weight={3}
            opacity={0.25}
          />
        ))}

        {route.length > 0 && (
          <>
            <Polyline
              positions={route}
              color="white"
              weight={10}
              opacity={0.7}
            />
            <Polyline
              positions={route}
              color="#ef4444"
              weight={6}
              opacity={0.9}
            />
            <Polyline
              positions={route}
              color="#dc2626"
              weight={6}
              opacity={1}
              dashArray="10, 10"
              dashOffset="0"
            />
          </>
        )}

      </MapContainer>
    </div>
  );
}

export default Map;