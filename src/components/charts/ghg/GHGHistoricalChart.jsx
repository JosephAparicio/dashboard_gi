import { ResponsiveLine } from "@nivo/line"
import { useTheme } from "../../theme/ThemeProvider"

// Datos históricos de emisiones GHG (2022-2025)
const generateHistoricalData = (scope = "all") => {
  const totalEmissions = [
    { year: 2022, value: 38500 },
    { year: 2023, value: 41200 },
    { year: 2024, value: 39800 },
    { year: 2025, value: 42100 },
  ]

  // Datos por scope
  const scope1Data = [
    { year: 2022, value: 11800 },
    { year: 2023, value: 12400 },
    { year: 2024, value: 11900 },
    { year: 2025, value: 12600 },
  ]

  const scope2Data = [
    { year: 2022, value: 16200 },
    { year: 2023, value: 17500 },
    { year: 2024, value: 16800 },
    { year: 2025, value: 17800 },
  ]

  const scope3Data = [
    { year: 2022, value: 10500 },
    { year: 2023, value: 11300 },
    { year: 2024, value: 11100 },
    { year: 2025, value: 11700 },
  ]

  // Metas anuales (objetivos que deberían haberse cumplido)
  const annualTargets = [
    { year: 2022, value: 38500 },
    { year: 2023, value: 37730 },
    { year: 2024, value: 36575 }, 
    { year: 2025, value: 35420 },
  ]

  // Retornar los datos según el scope seleccionado
  switch (scope) {
    case "scope1":
      return [
        {
          id: "Scope 1",
          data: scope1Data.map((d) => ({ x: d.year, y: d.value })),
        },
        {
          id: "Meta Scope 1",
          data: annualTargets.map((d) => ({ x: d.year, y: Math.round(d.value * 0.3) })),
          dashed: true,
        },
      ]
    case "scope2":
      return [
        {
          id: "Scope 2",
          data: scope2Data.map((d) => ({ x: d.year, y: d.value })),
        },
        {
          id: "Meta Scope 2",
          data: annualTargets.map((d) => ({ x: d.year, y: Math.round(d.value * 0.42) })),
          dashed: true,
        },
      ]
    case "scope3":
      return [
        {
          id: "Scope 3",
          data: scope3Data.map((d) => ({ x: d.year, y: d.value })),
        },
        {
          id: "Meta Scope 3",
          data: annualTargets.map((d) => ({ x: d.year, y: Math.round(d.value * 0.28) })),
          dashed: true,
        },
      ]
    default:
      return [
        {
          id: "Total Emisiones",
          data: totalEmissions.map((d) => ({ x: d.year, y: d.value })),
        },
        {
          id: "Scope 1",
          data: scope1Data.map((d) => ({ x: d.year, y: d.value })),
        },
        {
          id: "Scope 2",
          data: scope2Data.map((d) => ({ x: d.year, y: d.value })),
        },
        {
          id: "Scope 3",
          data: scope3Data.map((d) => ({ x: d.year, y: d.value })),
        },
        {
          id: "Meta Anual",
          data: annualTargets.map((d) => ({ x: d.year, y: d.value })),
          dashed: true,
        },
      ]
  }
}

const GHGHistoricalChart = ({ scope = "all" }) => {
  const { theme } = useTheme()
  const data = generateHistoricalData(scope)

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 20, bottom: 50, left: 40 }}
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
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: (value) => (value >= 1000 ? `${Math.round(value / 1000)}k` : value),
      }}
      enableGridX={false}
      colors={({ id }) => {
        if (id === "Total Emisiones") return "#4CAF50"
        if (id === "Scope 1") return "#D32F2F"
        if (id === "Scope 2") return "#FFA000"
        if (id === "Scope 3") return "#7B1FA2"
        if (id.includes("Meta")) return "#FF5722"
        return "#4CAF50"
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableSlices="x"
      useMesh={true}
      lineWidth={3}
      defs={[
        {
          id: "dashed",
          type: "patternLines",
          background: "inherit",
          color: "rgba(0, 0, 0, 0.3)",
          rotation: -45,
          lineWidth: 2,
          spacing: 6,
        },
      ]}
      fill={data
        .filter((item) => item.dashed)
        .map((match) => ({
          match: { id: match.id },
          id: "dashed",
        }))}
      tooltip={({ point }) => {
        return (
          <div
            style={{
              background: "white",
              padding: "9px 12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
              {point.seriesId}: {point.data.y.toLocaleString()} tCO₂e
            </div>
            <div>Año: {point.data.x}</div>
          </div>
        )
      }}
    />
  )
}

export default GHGHistoricalChart