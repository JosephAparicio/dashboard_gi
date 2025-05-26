import { useState } from "react"
import { motion } from "framer-motion";
import { getKpiCardsData } from "./kpiCardsData";
import { useTheme } from "../../theme/ThemeProvider"
import KPICard from "../../ui/KPICard"
import EmissionsBySourceChart from "../../charts/EmissionsBySourceChart"
import EmissionsByScopeChart from "../../charts/EmissionsByScopeChart"
import GHGHistoricalChart from "../../charts/ghg/GHGHistoricalChart"
import GHGProjectionChart from "../../charts/ghg/GHGProjectionChart"
import ComparisonChart from "../../charts/ComparisonChart"
import { getGHGKPIData } from "./getGHGKPIData";

const EmisionesGHG = ({ year, setYear, availableYears }) => {
  const { theme } = useTheme()
  const [scope, setScope] = useState("all")
  const [compareMode, setCompareMode] = useState(false)
  const [compareYear, setCompareYear] = useState(year - 1)
  
  const availableCompareYears = availableYears.filter((y) => y !== year)
  const kpiData = getGHGKPIData(year)

  const handleCompareYearChange = (e) => {
    setCompareYear(Number(e.target.value))
  }

  const handleCompareModeChange = () => {
    setCompareMode(!compareMode)
  }

  const handleScopeChange = (e) => {
    setScope(e.target.value)
  }

  const kpiCards = getKpiCardsData(kpiData, year, theme)

  return (
    // Título
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Emisiones de Gases de Efecto Invernadero</h2>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Año:</span>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              {availableYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro de Scope */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Alcance:</span>
            <select
              value={scope}
              onChange={handleScopeChange}
              className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="all">Todos</option>
              <option value="scope1">Scope 1</option>
              <option value="scope2">Scope 2</option>
              <option value="scope3">Scope 3</option>
            </select>
          </div>

          {/* Modo comparación */}
          <div className="flex items-center gap-2">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={compareMode}
                onChange={handleCompareModeChange}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-600">Comparar</span>
            </label>
          </div>

          {/* Selector de año para comparar */}
          {compareMode && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Comparar con:</span>
              <select
                value={compareYear}
                onChange={handleCompareYearChange}
                className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                {availableCompareYears.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Tarjetas KPI */}
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiCards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: index * 0.2,
            type: "spring",
            stiffness: 80,
          }}
        >
          <KPICard {...card} />
        </motion.div>
      ))}
    </div>

      {/* Gráficos principales - 2 por fila */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evolución Histórica GHG */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Evolución Histórica GHG (tCO₂e)</h3>
          <div className="h-80">
            <GHGHistoricalChart scope={scope} />
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
            {scope === "all" ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#4CAF50" }}></div>
                  <span>Emisiones reales</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#D32F2F" }}></div>
                  <span>Scope 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#FFA000" }}></div>
                  <span>Scope 2</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#7B1FA2" }}></div>
                  <span>Scope 3</span>
                </div>
              </>
            ) : (
              <>
                {scope === "scope1" && (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#D32F2F" }}></div>
                    <span>Scope 1</span>
                  </div>
                )}
                {scope === "scope2" && (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#FFA000" }}></div>
                    <span>Scope 2</span>
                  </div>
                )}
                {scope === "scope3" && (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#7B1FA2" }}></div>
                    <span>Scope 3</span>
                  </div>
                )}
              </>
            )}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#FF5722" }}></div>
              <span>Meta Anual</span>
            </div>
          </div>
        </div>

        {/* Proyección GHG a 2030 */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Proyección GHG (tCO₂e) a 2030</h3>
          <div className="h-80">
            <GHGProjectionChart scope={scope} />
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#4CAF50" }}></div>
              <span>Emisiones reales</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#FF9800" }}></div>
              <span>Proyección estimada</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#FF5722" }}></div>
              <span>Meta 2030</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos secundarios - 2 por fila */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Emisiones por Fuente GHG (tCO₂e)</h3>
          <div className="h-80">
            <EmissionsBySourceChart scope={scope} compareMode={compareMode} year={year} compareYear={compareYear} />
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
            {scope === "all" && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#D32F2F" }}></div>
                  <span>Scope 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#FFA000" }}></div>
                  <span>Scope 2</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#7B1FA2" }}></div>
                  <span>Scope 3</span>
                </div>
              </>
            )}
            {scope !== "all" && (
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: scope === "scope1" ? "#D32F2F" : scope === "scope2" ? "#FFA000" : "#7B1FA2",
                  }}
                ></div>
                <span>{scope.charAt(0).toUpperCase() + scope.slice(1)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Distribución por Alcance</h3>
          <div className="h-80">
            <EmissionsByScopeChart year={year} />
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#D32F2F" }}></div>
              <span>Scope 1</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#FFA000" }}></div>
              <span>Scope 2</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#7B1FA2" }}></div>
              <span>Scope 3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de comparación condicional */}
      {compareMode && (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Comparativa GHG  (tCO₂e) - {year} vs {compareYear}
          </h3>
          <div className="h-80">
            <ComparisonChart year={year} compareYear={compareYear} scope={scope} />
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#4CAF50" }}></div>
              <span>{year}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#81C784" }}></div>
              <span>{compareYear}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmisionesGHG