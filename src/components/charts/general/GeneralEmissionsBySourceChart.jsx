import { ResponsiveBar } from "@nivo/bar"
import { useTheme } from "../../theme/ThemeProvider"

// Datos simulados para el gráfico de barras por fuente general
const generateGeneralSourceData = (year) => {
  const dataByYear = {
    2022: [
      { source: "Electricidad", value: 16200, percentage: 42.1 },
      { source: "Combustibles", value: 9800, percentage: 25.5 },
      { source: "Transporte", value: 7200, percentage: 18.7 },
      { source: "Agua", value: 3500, percentage: 9.1 },
    ],
    2023: [
      { source: "Electricidad", value: 17500, percentage: 42.5 },
      { source: "Combustibles", value: 10200, percentage: 24.8 },
      { source: "Transporte", value: 7800, percentage: 18.9 },
      { source: "Agua", value: 3900, percentage: 9.5 },
    ],
    2024: [
      { source: "Electricidad", value: 17500, percentage: 42.2 },
      { source: "Combustibles", value: 9600, percentage: 24.1 },
      { source: "Transporte", value: 7500, percentage: 18.8 },
      { source: "Agua", value: 3700, percentage: 9.3 },
    ],
    2025: [
      { source: "Electricidad", value: 17800, percentage: 42.3 },
      { source: "Combustibles", value: 10100, percentage: 24.0 },
      { source: "Transporte", value: 8200, percentage: 19.5 },
      { source: "Agua", value: 3800, percentage: 9.0 },
    ],
  }

  return dataByYear[year] || dataByYear[2025]
}

const GeneralEmissionsBySourceChart = ({ year = 2025 }) => {
  const { theme } = useTheme()
  const data = generateGeneralSourceData(year)

  const sourceColors = {
    Electricidad: "#24ac54",
    Combustibles: "#5b9c7a", // Verde
    Transporte: "#a4d7bb", // Gris azulado
    Agua: "#345454",
  }

  return (
    <ResponsiveBar
      data={data}
      keys={["value"]}
      indexBy="source"
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={({ indexValue }) => sourceColors[indexValue] || theme.colors.ghg.primary}
      margin={{ top: 30, right: 20, bottom: 30, left: 50 }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendOffset: 36,
        legendPosition: "middle",
        tickValues: "every 1",
        tickTextColor: "#333",
        tickFontSize: 14,
      }}
      theme={{
        axis: {
          ticks: {
            text: {
              fontSize: 13,
              fill: "#333",
            },
          },
        },
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: (value) => (value >= 1000 ? `${Math.round(value / 1000)}k` : value),
      }}
      enableGridX={false}
      labelSkipWidth={999} // Desactiva las etiquetas por defecto
      labelSkipHeight={999}
      layers={[
        "grid",
        "axes",
        "bars",
        "markers",
        "legends",
        "annotations",
        // Capa personalizada para valores encima de las barras
        (props) =>
          props.bars.map((bar) => {
            const label = bar.data.value.toLocaleString()
            const textX = bar.x + bar.width / 2
            const textY = bar.y - 8

            return (
              <g key={bar.key}>
                <rect
                  x={textX - label.length * 3.5}
                  y={textY - 12}
                  width={label.length * 7 + 8}
                  height={20}
                  fill="white"
                  rx={3}
                  ry={3}
                />
                <text
                  x={textX}
                  y={textY + 3}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fontSize={12}
                  fontWeight="bold"
                  fill="#000"
                >
                  {label}
                </text>
              </g>
            )
          }),
      ]}
      tooltip={({ data, value, color }) => (
        <div
          style={{
            background: "white",
            padding: "12px 16px",
            minWidth: "180px",
            fontSize: "14px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <div style={{ color, fontWeight: "bold", marginBottom: "4px" }}>
            {data.source}: {value.toLocaleString()} tCO₂e
          </div>
          <div style={{ fontSize: "13px", color: "#555" }}>
            {data.percentage}% del total
          </div>
        </div>
      )}
    />
  )
}

export default GeneralEmissionsBySourceChart