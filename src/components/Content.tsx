import { MapContainer, TileLayer } from 'react-leaflet'

function Content() {
  return (
   <div>
      <MapContainer 
        center={[ -15.793889, -47.882778 ]}
        zoom={10} 
        scrollWheelZoom={false}
        className="h-175"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

export default Content;