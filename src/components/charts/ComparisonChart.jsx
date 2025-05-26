import { ResponsiveBar } from "@nivo/bar"
import { useTheme } from "../theme/ThemeProvider"

// Datos simulados para el gráfico de comparación
const generateComparisonData = (year, compareYear, scope = "all") => {
  const currentYearData = {
    "Scope 1": 12500,
    "Scope 2": 18750,
    "Scope 3": 11284,
    Total: 42534,
  }

  const compareYearData = {
    "Scope 1": 11875,
    "Scope 2": 19312,
    "Scope 3": 6787,
    Total: 37974,
  }

  const differences = {
    "Scope 1": currentYearData["Scope 1"] - compareYearData["Scope 1"],
    "Scope 2": currentYearData["Scope 2"] - compareYearData["Scope 2"],
    "Scope 3": currentYearData["Scope 3"] - compareYearData["Scope 3"],
    Total: currentYearData["Total"] - compareYearData["Total"],
  }

  const percentages = {
    "Scope 1": (differences["Scope 1"] / compareYearData["Scope 1"]) * 100,
    "Scope 2": (differences["Scope 2"] / compareYearData["Scope 2"]) * 100,
    "Scope 3": (differences["Scope 3"] / compareYearData["Scope 3"]) * 100,
    Total: (differences["Total"] / compareYearData["Total"]) * 100,
  }

  const data = [
    {
      scope: "Total",
      [year]: currentYearData["Total"],
      [compareYear]: compareYearData["Total"],
      Diferencia: differences["Total"],
      "Cambio %": percentages["Total"].toFixed(1),
    },
    {
      scope: "Scope 1",
      [year]: currentYearData["Scope 1"],
      [compareYear]: compareYearData["Scope 1"],
      Diferencia: differences["Scope 1"],
      "Cambio %": percentages["Scope 1"].toFixed(1),
    },
    {
      scope: "Scope 2",
      [year]: currentYearData["Scope 2"],
      [compareYear]: compareYearData["Scope 2"],
      Diferencia: differences["Scope 2"],
      "Cambio %": percentages["Scope 2"].toFixed(1),
    },
    {
      scope: "Scope 3",
      [year]: currentYearData["Scope 3"],
      [compareYear]: compareYearData["Scope 3"],
      Diferencia: differences["Scope 3"],
      "Cambio %": percentages["Scope 3"].toFixed(1),
    },
  ]

  if (scope !== "all") {
    return data.filter((item) => item.scope.toLowerCase() === scope || item.scope === "Total")
  }

  return data
}

const ComparisonChart = ({ year = 2023, compareYear = 2022, scope = "all" }) => {
  const { theme } = useTheme()
  const data = generateComparisonData(year, compareYear, scope)

  return (
    <ResponsiveBar
      data={data}
      keys={[year.toString(), compareYear.toString()]}
      indexBy="scope"
      groupMode="grouped"
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={[theme.colors.ghg.primary, theme.colors.ghg.secondary]}
      margin={{ top: 30, right: 30, bottom: 50, left: 50 }}
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
        const item = data.find((d) => d.scope === indexValue)
        const isCurrentYear = id === year.toString()
        const otherYear = isCurrentYear ? compareYear : year
        const difference = isCurrentYear ? item["Diferencia"] : -item["Diferencia"]
        const changePercent = isCurrentYear ? item["Cambio %"] : (-Number.parseFloat(item["Cambio %"])).toFixed(1)

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
            <div>
              vs {otherYear}: {difference > 0 ? "+" : ""}
              {difference.toLocaleString()} tCO₂e ({changePercent}%)
            </div>
          </div>
        )
      }}
    />
  )
}

export default ComparisonChart