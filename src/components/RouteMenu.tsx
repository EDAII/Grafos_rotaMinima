import { useState } from "react";
import { cities } from "../utils/cities";
import { MapPin, ArrowRight, CheckCircle, RefreshCw } from "lucide-react";

export default function RouteMenu({
  onSearch,
  pathCities = [],
  onResetView,
}: {
  onSearch: (origin: string, destination: string) => void;
  pathCities?: string[];
  onResetView: () => void;
}) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [routeInfo, setRouteInfo] = useState<{
    origin: string;
    destination: string;
  } | null>(null);

  const handleSearch = () => {
    if (origin && destination) {
      onSearch(origin, destination);
      setRouteInfo({ origin, destination });
    }
  };

  const isValid = origin && destination && origin !== destination;

  return (
    <div className="w-96 bg-white shadow-2xl h-screen p-7 flex flex-col overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <MapPin className="w-8 h-8 text-blue-600" />
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
            className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all bg-gray-50/50 text-gray-800 font-medium"
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
          className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-3 transition-all duration-200 shadow-md ${
            isValid
              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 transform hover:-translate-y-0.5 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed opacity-70"
          }`}
        >
          Buscar Menor Rota
          <ArrowRight className="w-5 h-5" />
        </button>

        {routeInfo && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 font-medium text-center">
            Buscando rota: <strong>{routeInfo.origin}</strong> →{" "}
            <strong>{routeInfo.destination}</strong>
          </div>
        )}

        {pathCities.length > 0 && (
          <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl shadow-inner">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-bold text-green-800">
                Menor rota encontrada!
              </h3>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-green-700 font-semibold">
                {pathCities.length - 1} trecho(s) • {pathCities.length}{" "}
                cidade(s)
              </p>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-green-200">
                <div className="flex flex-col gap-2">
                  {pathCities.map((city, index) => (
                    <div
                      key={city}
                      className={`flex items-center gap-3 ${
                        index === 0
                          ? "text-blue-600"
                          : index === pathCities.length - 1
                          ? "text-red-600"
                          : "text-gray-700"
                      }`}
                    >
                      {index === 0 && <MapPin className="w-5 h-5" />}
                      {index > 0 && index < pathCities.length - 1 && (
                        <div className="w-5 h-5 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        </div>
                      )}
                      {index === pathCities.length - 1 && (
                        <MapPin className="w-5 h-5" />
                      )}

                      <span className="font-semibold text-lg">{city}</span>

                      {index < pathCities.length - 1 && (
                        <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {routeInfo &&
          pathCities.length === 0 &&
          origin &&
          destination &&
          origin !== destination && (
            <div className="mt-6 p-6 bg-red-50 border-2 border-red-300 rounded-2xl">
              <p className="text-red-800 font-bold text-center">
                Não há conexão direta ou indireta entre essas cidades no mapa
                atual.
              </p>
            </div>
          )}

        <button
          onClick={onResetView}
          className="w-full py-2 rounded-xl font-semibold text-gray-700 flex items-center justify-center gap-3 transition-all duration-200 border border-gray-300 hover:bg-gray-100 mt-4"
        >
          <RefreshCw className="w-4 h-4" />
          Reecentralizar mapa
        </button>
      </div>
      <div className="mt-8 text-center text-xs text-gray-500">
        Mapa do Distrito Federal • BFS (Busca em Largura)
      </div>
    </div>
  );
}
