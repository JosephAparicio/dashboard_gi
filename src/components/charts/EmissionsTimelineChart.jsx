"use client"

import { ResponsiveLine } from "@nivo/line"
import { useTheme } from "../theme/ThemeProvider"

// Datos simulados para el gráfico de línea temporal
const generateTimelineData = (scope = "all") => {
  // Datos base para todos los scopes
  const baseData = [
    { year: 2019, value: 35000 },
    { year: 2020, value: 32000 },
    { year: 2021, value: 38000 },
    { year: 2022, value: 37974 },
    { year: 2023, value: 42534 },
  ]

  // Datos para scope 1
  const scope1Data = [
    { year: 2019, value: 11000 },
    { year: 2020, value: 10500 },
    { year: 2021, value: 11200 },
    { year: 2022, value: 11875 },
    { year: 2023, value: 12500 },
  ]

  // Datos para scope 2
  const scope2Data = [
    { year: 2019, value: 16000 },
    { year: 2020, value: 15000 },
    { year: 2021, value: 18500 },
    { year: 2022, value: 19312 },
    { year: 2023, value: 18750 },
  ]

  // Datos para scope 3
  const scope3Data = [
    { year: 2019, value: 8000 },
    { year: 2020, value: 6500 },
    { year: 2021, value: 8300 },
    { year: 2022, value: 6787 },
    { year: 2023, value: 11284 },
  ]

  // Datos de objetivo
  const targetData = [
    { year: 2019, value: 35000 },
    { year: 2023, value: 30000 },
    { year: 2030, value: 15000 },
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
          id: "Objetivo",
          data: targetData.map((d) => ({ x: d.year, y: d.value / 3 })),
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
          id: "Objetivo",
          data: targetData.map((d) => ({ x: d.year, y: d.value / 2 })),
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
          id: "Objetivo",
          data: targetData.map((d) => ({ x: d.year, y: d.value / 4 })),
          dashed: true,
        },
      ]
    default:
      return [
        {
          id: "Total Emisiones",
          data: baseData.map((d) => ({ x: d.year, y: d.value })),
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
          id: "Objetivo",
          data: targetData.map((d) => ({ x: d.year, y: d.value })),
          dashed: true,
        },
      ]
  }
}

const EmissionsTimelineChart = ({ scope = "all" }) => {
  const { theme } = useTheme()
  const data = generateTimelineData(scope)

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 110, bottom: 50, left: 60 }}
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
        legend: "Año",
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
        if (id === "Total Emisiones") return theme.colors.ghg.primary
        if (id === "Scope 1") return theme.charts.scope1
        if (id === "Scope 2") return theme.charts.scope2
        if (id === "Scope 3") return theme.charts.scope3
        if (id === "Objetivo") return theme.charts.target
        return theme.colors.ghg.primary
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      // Líneas punteadas para objetivos
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
    />
  )
}

export default EmissionsTimelineChart