import { useState } from "react";
import { cities } from "../utils/cities";

export default function RouteMenu({
  onSearch,
}: {
  onSearch: (origin: string, destination: string) => void;
}) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [routeInfo, setRouteInfo] = useState<{ origin: string; destination: string } | null>(null);

  const handleSearch = () => {
    if (origin && destination) {
      onSearch(origin, destination);
      setRouteInfo({ origin, destination });
    }
  };

  return (
    <div className="w-80 bg-white shadow-xl h-screen p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">Busca de Rota</h2>
      <div className="space-y-6 flex-1">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Origem
          </label>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          >
            <option value="">Selecione a cidade de origem</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destino
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          >
            <option value="">Selecione a cidade de destino</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSearch}
          disabled={!origin || !destination}
          className={`w-full py-4 rounded-lg font-semibold cursor-pointer text-white transition ${
            origin && destination
              ? "bg-blue-600 hover:bg-blue-700 shadow-lg"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Buscar Rota
        </button>

        {routeInfo && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 font-medium text-center">
            Rota solicitada: {routeInfo.origin} → {routeInfo.destination}
          </div>
        )}
      </div>
    </div>
  );
}