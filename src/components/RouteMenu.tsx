import { useState } from "react";
import { cities } from "../utils/cities";
import { MapPin, ArrowRight, RefreshCw } from "lucide-react";

interface RouteMenuProps {
  onSearch: (origin: string, destination: string) => void;
  pathCities: string[];
  visitedCities: string[];
  queueCities: string[];
  isAnimating: boolean;
  onResetView: () => void;
}

export default function RouteMenu({
  onSearch,
  pathCities,
  visitedCities,
  queueCities,
  isAnimating,
  onResetView,
}: RouteMenuProps) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const isValid = origin && destination && origin !== destination;

  return (
    <div className="w-96 bg-white shadow-2xl h-screen p-7 flex flex-col overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <MapPin className="w-8 h-8 text-blue-600" />
        Busca de Rota
      </h2>

      <div className="space-y-6 flex-1">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <span className="text-blue-600">●</span> Origem
          </label>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 outline-none bg-gray-50"
          >
            <option value="">Selecione a origem</option>
            {cities.map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
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
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-red-500/20 outline-none bg-gray-50"
          >
            <option value="">Selecione o destino</option>
            {cities.map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* BOTÃO ÚNICO COM CURSOR DE MÃOZINHA */}
        <button
          onClick={() => onSearch(origin, destination)}
          disabled={!isValid || isAnimating}
          className={`
           w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-3 transition-all duration-200 shadow-md
            ${isValid && !isAnimating
              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed opacity-70"
            }
          `}
        >
          {isAnimating ? "Buscando..." : "Buscar Menor Rota"}
          <ArrowRight className="w-6 h-6" />
        </button>

        {/* Rota encontrada */}
        {pathCities.length > 0 && !isAnimating && (
          <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl shadow-inner">
            <h3 className="text-xl font-bold text-green-800 mb-3">Rota Encontrada!</h3>
            <p className="text-sm text-green-700 font-semibold">
              {pathCities.length - 1} trecho(s) • {pathCities.length} cidade(s)
            </p>
            <div className="mt-4 bg-white rounded-xl p-5 shadow-sm border border-green-200">
              {pathCities.map((city, i) => (
                <div key={city} className="flex items-center gap-4 py-2">
                  {i === 0 && <MapPin className="w-6 h-6 text-blue-600" />}
                  {i > 0 && i < pathCities.length - 1 && (
                    <div className="w-6 h-6 flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    </div>
                  )}
                  {i === pathCities.length - 1 && <MapPin className="w-6 h-6 text-red-600" />}
                  <span className={`font-bold text-lg ${i === 0 ? "text-blue-600" : i === pathCities.length - 1 ? "text-red-600" : "text-gray-800"}`}>
                    {city}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onResetView}
          className="w-full py-3 mt-6 rounded-xl font-semibold text-gray-700 border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <RefreshCw className="w-5 h-5" />
          Reecentralizar Mapa
        </button>
      </div>

      <div className="mt-8 text-center text-xs text-gray-500">
       Mapa do Distrito Federal • BFS (Busca em Largura)
      </div>
    </div>
  );
}