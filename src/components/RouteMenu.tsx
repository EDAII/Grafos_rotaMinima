import { useState } from "react";
import { cities } from "../utils/cities";
import { MapPin, ArrowRight } from "lucide-react";

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

  const isValid = origin && destination;

  return (
    <div className="w-100 bg-white shadow-2xl h-screen p-7 flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <MapPin className="w-7 h-7 text-blue-600" />
        Busca de Rota
      </h2>

      <div className="space-y-7 flex-1">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <span className="text-blue-600">●</span> Origem
          </label>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-gray-50/50 text-gray-800 font-medium"
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
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <span className="text-red-500">●</span> Destino
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-gray-50/50 text-gray-800 font-medium"
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
          disabled={!isValid}
          className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-200 shadow-md ${
            isValid
              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 transform hover:-translate-y-0.5 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed opacity-70"
          }`}
        >
          Buscar Rota
          <ArrowRight className="w-5 h-5" />
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