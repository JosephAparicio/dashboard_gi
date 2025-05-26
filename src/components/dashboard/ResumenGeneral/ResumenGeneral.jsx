import { useTheme } from "../../theme/ThemeProvider"
import { useMemo } from "react"
import { motion } from "framer-motion"
import KPICard from "../../ui/KPICard"
import GeneralEmissionsTimelineChart from "../../charts/general/GeneralEmissionsTimelineChart"
import GeneralEmissionsBySourceChart from "../../charts/general/GeneralEmissionsBySourceChart"
import GeneralComparisonChart from "../../charts/general/GeneralComparisonChart"
import { getKPIData } from "./getKPIData"
import { getKpiCardsConfig } from "./kpiCardsConfig"

const ResumenGeneral = ({ year, setYear, availableYears }) => {
  const { theme } = useTheme()
  const kpiData = useMemo(() => getKPIData(year), [year])
  const kpiCards = useMemo(() => getKpiCardsConfig(kpiData, year), [kpiData, year])

  return (
    // Título
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Resumen General</h2>

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
      </div>

      {/* Tarjetas KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map(({ title, data, icon, change, changeText, changeValue }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: i * 0.2,
              type: "spring",
              stiffness: 80,
            }}
          >
            <KPICard
              title={title}
              value={
                title === "Tasa de Reducción"
                  ? `${data.value}% anual`
                  : `${data.value.toLocaleString()} tCO₂e`
              }
              change={change ?? data.change}
              changeText={changeText ? changeText(data) : undefined}
              changeValue={changeValue ? changeValue(data) : undefined}
              isPositive={data.isPositive ?? data.isOnTrack}
              icon={icon}
              color={theme.colors.solid.black}
            />
          </motion.div>
        ))}
      </div>

      {/* Gráficos principales - 2 por fila */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Evolución de Emisiones GHG (tCO₂e) y Escenarios 2030</h3>
          <div className="h-80">
            <GeneralEmissionsTimelineChart />
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.graphic_lines.actual }}></div>
              <span className="text-xs">Emisiones reales (tCO₂e)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.graphic_lines.optimistic }}></div>
              <span className="text-xs">Proyección optimista</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.graphic_lines.target }}></div>
              <span className="text-xs">Meta 2030</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Emisiones por Fuente {year} (tCO₂e)</h3>
          <div className="h-80">
            <GeneralEmissionsBySourceChart year={year} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Variación Interanual de Emisiones GHG (tCO₂e) - {year} vs {year - 1}
        </h3>
        <div className="h-80">
          <GeneralComparisonChart year={year} compareYear={year - 1} />
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#24ac54" }}></div>
            <span>{year}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#a4d7bb" }}></div>
            <span>{year - 1}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumenGeneral