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
import { forwardRef } from "react";
import L from "leaflet";
import { INITIAL_CENTER, INITIAL_ZOOM } from "../utils/mapConstants";

interface MapProps {
  route: [number, number][];
  visitedCities: string[];
  queueCities: string[];
  pathCities: string[];
  isAnimating: boolean;
}

const Map = forwardRef<L.Map | null, MapProps>(
  ({ route, visitedCities, queueCities, pathCities, isAnimating }, ref) => {
    const cityMap: Record<string, [number, number]> = {};
    cities.forEach(c => (cityMap[c.name] = c.coordenadas));

    return (
      <div className="flex-1 relative">
        <MapContainer
          center={INITIAL_CENTER}
          zoom={INITIAL_ZOOM}
          scrollWheelZoom
          className="h-full w-full"
          ref={ref}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          {/* Rotas de fundo */}
          {routes.map((seg, i) => (
            <Polyline key={i} positions={seg} color="#374151" weight={3} opacity={0.25} />
          ))}

          {/* Cidades com cores */}
          {cities.map(city => {
            const n = city.name;
            const isStart = pathCities[0] === n;
            const isEnd = pathCities[pathCities.length - 1] === n;
            const inPath = pathCities.includes(n);
            const visited = visitedCities.includes(n);
            const queued = queueCities.includes(n);

            let fill = "#3b82f6";
            let radius = 7;
            let weight = 2;

            if (isStart) { fill = "#1d4ed8"; radius = 11; weight = 4; }
            else if (isEnd) { fill = "#b91c1c"; radius = 11; weight = 4; }
            else if (inPath) { fill = "#dc2626"; radius = 9; }
            else if (visited) fill = "#16a34a";
            else if (queued) fill = "#ca8a04";

            return (
              <CircleMarker
                key={n}
                center={city.coordenadas}
                radius={radius}
                pathOptions={{
                  color: inPath ? "#7f1d1d" : "#1e40af",
                  weight,
                  fillColor: fill,
                  fillOpacity: 0.95,
                }}
              >
                <Tooltip direction="top" offset={[0, -10]}>
                  <div className="font-bold text-sm">{n}</div>
                  {visited && !inPath && <small>Visitada</small>}
                  {queued && <small>Na fila</small>}
                </Tooltip>
              </CircleMarker>
            );
          })}

          {/* LINHA SENDO DESENHADA PROGRESSIVAMENTE */}
          {route.length > 1 && (
            <>
              <Polyline
                positions={route}
                color="white"
                weight={16}
                opacity={0.7}
              />
              <Polyline
                positions={route}
                color="#ef4444"
                weight={10}
                opacity={1}
              />
              <Polyline
                positions={route}
                color="#dc2626"
                weight={6}
                opacity={1}
                dashArray={isAnimating ? "1, 0" : "15, 15"}
                dashOffset={isAnimating ? "0" : undefined}
              />
            </>
          )}
        </MapContainer>
      </div>
    );
  }
);

Map.displayName = "Map";
export default Map;