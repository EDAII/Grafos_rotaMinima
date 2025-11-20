import { CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet";
import { cities } from "../utils/cities";

function Content() {
  return (
    <div>
      <MapContainer
        center={[-15.793889, -47.882778]}
        zoom={11}
        scrollWheelZoom={false}
        className="h-175"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {cities.map((city, index) => (
          <CircleMarker
            key={index}
            center={city.coordenadas}
            radius={4}
            pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.6 }}
          >
            <Tooltip
              direction="top"
              offset={[0, -5]}
              opacity={1}
              permanent={false}
            >
              {city.name}
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Content;
