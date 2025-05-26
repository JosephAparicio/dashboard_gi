import { ResponsiveLine } from "@nivo/line"
import { useTheme } from "../../theme/ThemeProvider"

// Datos simulados para el gráfico de línea temporal general (2022-2030)
const generateGeneralTimelineData = () => {
  // Datos históricos y proyectados
  const totalEmissionsData = [
    { year: 2022, value: 38500 },
    { year: 2023, value: 41200 },
    { year: 2024, value: 39800 }, // Reducción inicial
    { year: 2025, value: 42100 }, // Año actual
    { year: 2026, value: 38900 }, // Proyección con mejoras
  ]

  // Escenarios hasta 2030
  const currentTrendData = [
    ...totalEmissionsData,
    { year: 2027, value: 43500 },
    { year: 2028, value: 45200 },
    { year: 2029, value: 47100 },
    { year: 2030, value: 49200 },
  ]

  const optimisticScenario = [
    ...totalEmissionsData,
    { year: 2027, value: 36200 },
    { year: 2028, value: 32800 },
    { year: 2029, value: 28500 },
    { year: 2030, value: 24000 },
  ]

  const targetScenario = [
    { year: 2025, value: 42100 },
    { year: 2030, value: 15000 }, // Meta objetivo
  ]

  return [
    {
      id: "Tendencia Actual",
      data: currentTrendData.map((d) => ({ x: d.year, y: d.value })),
    },
    {
      id: "Escenario Optimista",
      data: optimisticScenario.map((d) => ({ x: d.year, y: d.value })),
    },
    {
      id: "Meta 2030",
      data: targetScenario.map((d) => ({ x: d.year, y: d.value })),
      dashed: true,
    },
  ]
}

const GeneralEmissionsTimelineChart = () => {
  const { theme } = useTheme()
  const data = generateGeneralTimelineData()

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 18, bottom: 50, left: 40 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
        max: "auto",
      }}
      yFormat=" >-,.0f"
      curve="monotoneX"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Emisiones (tCO₂e)",
        legendOffset: -50,
        legendPosition: "middle",
        format: (value) => (value >= 1000 ? `${Math.round(value / 1000)}k` : value),
      }}
      colors={({ id }) => {
        if (id === "Tendencia Actual") return theme.graphic_lines.actual
        if (id === "Escenario Optimista") return theme.graphic_lines.optimistic
        if (id === "Meta 2030") return theme.graphic_lines.target
        return theme.colors.ghg.primary
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      useMesh={true}
      lineWidth={3}
      defs={[
        {
          id: "dashed",
          type: "patternLines",
          background: "inherit",
          color: "rgba(0, 0, 0, 0.2)",
          rotation: -45,
          lineWidth: 4,
          spacing: 8,
        },
      ]}
      fill={data
        .filter((item) => item.dashed)
        .map((match) => ({
          match: { id: match.id },
          id: "dashed",
        }))}
      
      tooltip={({ point }) => (
        <div
          style={{
            background: "white",
            padding: "9px 12px",
            border:"1px solid",
            color: point.seriesColor,
            minWidth: "130px",
            borderRadius: "4px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          {point.data.y.toLocaleString()} tCO₂e ({point.data.x})
        </div>
      )}
    />
  )
}

export default GeneralEmissionsTimelineChart