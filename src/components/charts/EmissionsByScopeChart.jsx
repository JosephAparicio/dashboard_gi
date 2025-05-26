import { ResponsivePie } from "@nivo/pie"
import { useTheme } from "../theme/ThemeProvider"

// Datos simulados para el gráfico de distribución por scope
const generateScopeData = (year) => {
  return [
    {
      id: "Scope 1",
      label: "Scope 1",
      value: 12500,
      description: "Emisiones directas de fuentes propias o controladas",
    },
    {
      id: "Scope 2",
      label: "Scope 2",
      value: 18750,
      description: "Emisiones indirectas de la generación de energía comprada",
    },
    {
      id: "Scope 3",
      label: "Scope 3",
      value: 11284,
      description: "Emisiones indirectas de la cadena de valor",
    },
  ]
}

const EmissionsByScopeChart = ({ year }) => {
  const { theme } = useTheme()
  const data = generateScopeData(year)

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={[theme.charts.scope1, theme.charts.scope2, theme.charts.scope3]}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLinkLabel={(datum) => {
        const total = data.reduce((sum, d) => sum + d.value, 0)
        const percentage = ((datum.value / total) * 100).toFixed(1)
        return `${datum.value.toLocaleString()} tCO₂e (${percentage}%)`
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        { match: { id: "Scope 1" }, id: "dots" },
        { match: { id: "Scope 2" }, id: "lines" },
        { match: { id: "Scope 3" }, id: "dots" },
      ]}
      tooltip={({ datum }) => (
        <div
          style={{
            background: "white",
            padding: "9px 12px",
            border: "1px solid #ccc",
            minWidth: "200px",
            borderRadius: "4px",
          }}
        >
          <div>
            <strong>{datum.label}</strong>: {datum.value.toLocaleString()} tCO₂e
          </div>
          <div>{datum.data.description}</div>
          <div>({((datum.value / data.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(1)}%)</div>
        </div>
      )}
    />
  )
}

export default EmissionsByScopeChart