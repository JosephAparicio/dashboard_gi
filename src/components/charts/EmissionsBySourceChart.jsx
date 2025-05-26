import { ResponsiveBar } from "@nivo/bar"
import { useTheme } from "../theme/ThemeProvider"

// Datos simulados para el gráfico de barras por fuente
const generateSourceData = (year, scope = "all", compareMode = false, compareYear = null) => {
  const baseData = [
    {
      source: "Electricidad",
      "Scope 1": 0,
      "Scope 2": 15000,
      "Scope 3": 2000,
    },
    {
      source: "Combustibles",
      "Scope 1": 8500,
      "Scope 2": 0,
      "Scope 3": 1500,
    },
    {
      source: "Transporte",
      "Scope 1": 4000,
      "Scope 2": 0,
      "Scope 3": 3500,
    },
    {
      source: "Procesos",
      "Scope 1": 0,
      "Scope 2": 3750,
      "Scope 3": 1284,
    },
    {
      source: "Cadena de Suministro",
      "Scope 1": 0,
      "Scope 2": 0,
      "Scope 3": 3000,
    },
  ]

  // Datos para el año de comparación
  const compareData = [
    {
      source: "Electricidad",
      "Scope 1": 0,
      "Scope 2": 16000,
      "Scope 3": 1800,
    },
    {
      source: "Combustibles",
      "Scope 1": 8000,
      "Scope 2": 0,
      "Scope 3": 1200,
    },
    {
      source: "Transporte",
      "Scope 1": 3875,
      "Scope 2": 0,
      "Scope 3": 2000,
    },
    {
      source: "Procesos",
      "Scope 1": 0,
      "Scope 2": 3312,
      "Scope 3": 987,
    },
    {
      source: "Cadena de Suministro",
      "Scope 1": 0,
      "Scope 2": 0,
      "Scope 3": 800,
    },
  ]

  if (scope !== "all") {
    const scopeKey = scope.charAt(0).toUpperCase() + scope.slice(1)

    baseData.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key !== "source" && key !== scopeKey) {
          item[key] = 0
        }
      })
    })

    if (compareMode && compareYear) {
      compareData.forEach((item) => {
        Object.keys(item).forEach((key) => {
          if (key !== "source" && key !== scopeKey) {
            item[key] = 0
          }
        })
      })
    }
  }

  if (compareMode && compareYear) {
    return {
      currentYear: baseData,
      compareYear: compareData,
    }
  }
  return baseData
}

const EmissionsBySourceChart = ({ year = 2023, scope = "all", compareMode = false, compareYear = null }) => {
  const { theme } = useTheme()
  const data = generateSourceData(year, scope, compareMode, compareYear)

  const getColors = () => {
    if (scope === "scope1") return [theme.charts.scope1]
    if (scope === "scope2") return [theme.charts.scope2]
    if (scope === "scope3") return [theme.charts.scope3]
    return [theme.charts.scope1, theme.charts.scope2, theme.charts.scope3]
  }

  const getKeys = () => {
    if (scope === "scope1") return ["Scope 1"]
    if (scope === "scope2") return ["Scope 2"]
    if (scope === "scope3") return ["Scope 3"]
    return ["Scope 1", "Scope 2", "Scope 3"]
  }

  // Si estamos en modo comparación, mostrar un gráfico agrupado
  if (compareMode && compareYear) {
    return (
      <ResponsiveBar
        data={[
          ...data.currentYear.map((d) => ({ ...d, year: year.toString() })),
          ...data.compareYear.map((d) => ({ ...d, year: compareYear.toString() })),
        ]}
        keys={getKeys()}
        indexBy="source"
        groupMode="grouped"
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={getColors()}
        margin={{ top: 20, right: 30, bottom: 50, left: 40 }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: (value) => (value >= 1000 ? `${Math.round(value / 1000)}k` : value),
        }}
        label={null}
      />
    )
  }

  // Gráfico sin comparación
  return (
    <ResponsiveBar
      data={data}
      keys={getKeys()}
      indexBy="source"
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={getColors()}
      margin={{ top: 20, right: 20, bottom: 50, left: 40 }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: (value) => (value >= 1000 ? `${Math.round(value / 1000)}k` : value),
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor="#ffffff"
      labelStyle={{
        fontWeight: "bold",
        fontSize: 12,
      }}
      label={(d) => `${d.value.toLocaleString()}`}
    />
  )
}

export default EmissionsBySourceChart