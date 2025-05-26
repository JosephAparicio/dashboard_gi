import { ResponsiveBar } from "@nivo/bar"
import { useTheme } from "../../theme/ThemeProvider"

// Datos simulados para comparación general entre años
const generateGeneralComparisonData = (year, compareYear) => {
  const yearData = {
    2022: { total: 38500, electricity: 16200, fuels: 9800, transport: 7200, water: 3500 },
    2023: { total: 41200, electricity: 17500, fuels: 10200, transport: 7800, water: 3900 },
    2024: { total: 39800, electricity: 16800, fuels: 9600, transport: 7500, water: 3700 },
    2025: { total: 42100, electricity: 17800, fuels: 10100, transport: 8200, water: 3800 },
  }

  const currentData = yearData[year] || yearData[2025]
  const compareData = yearData[compareYear] || yearData[2024]

  return [
    {
      category: "Total",
      [year]: currentData.total,
      [compareYear]: compareData.total,
      difference: currentData.total - compareData.total,
      percentChange: (((currentData.total - compareData.total) / compareData.total) * 100).toFixed(1),
    },
    {
      category: "Electricidad",
      [year]: currentData.electricity,
      [compareYear]: compareData.electricity,
      difference: currentData.electricity - compareData.electricity,
      percentChange: (((currentData.electricity - compareData.electricity) / compareData.electricity) * 100).toFixed(1),
    },
    {
      category: "Combustibles",
      [year]: currentData.fuels,
      [compareYear]: compareData.fuels,
      difference: currentData.fuels - compareData.fuels,
      percentChange: (((currentData.fuels - compareData.fuels) / compareData.fuels) * 100).toFixed(1),
    },
    {
      category: "Transportes",
      [year]: currentData.transport,
      [compareYear]: compareData.transport,
      difference: currentData.transport - compareData.transport,
      percentChange: (((currentData.transport - compareData.transport) / compareData.transport) * 100).toFixed(1),
    },
    {
      category: "Agua",
      [year]: currentData.water,
      [compareYear]: compareData.water,
      difference: currentData.water - compareData.water,
      percentChange: (((currentData.water - compareData.water) / compareData.water) * 100).toFixed(1),
    },
  ]
}

const GeneralComparisonChart = ({ year = 2025, compareYear = 2024 }) => {
  const { theme } = useTheme()
  const data = generateGeneralComparisonData(year, compareYear)

    return (
    <ResponsiveBar
      data={data}
      keys={[year.toString(), compareYear.toString()]}
      indexBy="category"
      groupMode="grouped"
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={["#24ac54", "#a4d7bb"]}
      margin={{ top: 60, right: 20, bottom: 50, left: 50 }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendOffset: 32,
        legendPosition: "middle",
        tickValues: "every 1",
        tickTextColor: "#333",
        tickFontSize: 14,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: (value) => (value >= 1000 ? `${Math.round(value / 1000)}k` : value),
      }}
      enableGridX={false}
      labelSkipWidth={999}
      labelSkipHeight={999}
      layers={[
        "grid",
        "axes",
        "bars",
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
      tooltip={({ id, value, color, indexValue }) => {
        const item = data.find((d) => d.category === indexValue)
        const isCurrentYear = id === year.toString()
        const difference = isCurrentYear ? item.difference : -item.difference
        const changePercent = isCurrentYear
          ? item.percentChange
          : (-Number.parseFloat(item.percentChange)).toFixed(1)

        return (
          <div
            style={{
              background: "white",
              padding: "9px 12px",
              minWidth: "180px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <div style={{ color }}>
              <strong>{indexValue}</strong> ({id}): {value.toLocaleString()} tCO₂e
            </div>
            <div
              style={{
                color: difference > 0 ? "#F44336" : "#4CAF50",
                fontWeight: "bold",
              }}
            >
              Cambio: {difference > 0 ? "+" : ""}
              {difference.toLocaleString()} tCO₂e ({changePercent}%)
            </div>
          </div>
        )
      }}
    />
  )
}

export default GeneralComparisonChart