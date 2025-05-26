"use client"

import { ResponsiveLine } from "@nivo/line"
import { useTheme } from "../../theme/ThemeProvider"

// Datos simulados específicos para GHG (2022-2030)
const generateGHGTimelineData = (scope = "all") => {
  // Datos base para todos los scopes
  const baseData = [
    { year: 2022, value: 38500 },
    { year: 2023, value: 41200 },
    { year: 2024, value: 39800 },
    { year: 2025, value: 42100 },
    { year: 2026, value: 38900 },
  ]

  // Datos para scope 1 (emisiones directas)
  const scope1Data = [
    { year: 2022, value: 11800 },
    { year: 2023, value: 12400 },
    { year: 2024, value: 11900 },
    { year: 2025, value: 12600 },
    { year: 2026, value: 11700 },
  ]

  // Datos para scope 2 (emisiones indirectas de energía)
  const scope2Data = [
    { year: 2022, value: 16200 },
    { year: 2023, value: 17500 },
    { year: 2024, value: 16800 },
    { year: 2025, value: 17800 },
    { year: 2026, value: 16200 },
  ]

  // Datos para scope 3 (emisiones de cadena de valor)
  const scope3Data = [
    { year: 2022, value: 10500 },
    { year: 2023, value: 11300 },
    { year: 2024, value: 11100 },
    { year: 2025, value: 11700 },
    { year: 2026, value: 11000 },
  ]

  // Escenarios de proyección hasta 2030
  const projectionData = [
    ...baseData,
    { year: 2027, value: 36200 },
    { year: 2028, value: 32800 },
    { year: 2029, value: 28500 },
    { year: 2030, value: 24000 },
  ]

  // Datos de objetivo
  const targetData = [
    { year: 2025, value: 42100 },
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
          id: "Proyección Scope 1",
          data: [
            ...scope1Data,
            { year: 2027, value: 10800 },
            { year: 2028, value: 9600 },
            { year: 2029, value: 8200 },
            { year: 2030, value: 6800 },
          ].map((d) => ({ x: d.year, y: d.value })),
        },
      ]
    case "scope2":
      return [
        {
          id: "Scope 2",
          data: scope2Data.map((d) => ({ x: d.year, y: d.value })),
        },
        {
          id: "Proyección Scope 2",
          data: [
            ...scope2Data,
            { year: 2027, value: 15000 },
            { year: 2028, value: 13200 },
            { year: 2029, value: 11000 },
            { year: 2030, value: 8500 },
          ].map((d) => ({ x: d.year, y: d.value })),
        },
      ]
    case "scope3":
      return [
        {
          id: "Scope 3",
          data: scope3Data.map((d) => ({ x: d.year, y: d.value })),
        },
        {
          id: "Proyección Scope 3",
          data: [
            ...scope3Data,
            { year: 2027, value: 10400 },
            { year: 2028, value: 10000 },
            { year: 2029, value: 9300 },
            { year: 2030, value: 8700 },
          ].map((d) => ({ x: d.year, y: d.value })),
        },
      ]
    default:
      return [
        {
          id: "Total GHG",
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
          id: "Proyección 2030",
          data: projectionData.map((d) => ({ x: d.year, y: d.value })),
        },
        {
          id: "Meta 2030",
          data: targetData.map((d) => ({ x: d.year, y: d.value })),
          dashed: true,
        },
      ]
  }
}

const GHGEmissionsTimelineChart = ({ scope = "all" }) => {
  const { theme } = useTheme()
  const data = generateGHGTimelineData(scope)

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
        legend: "Emisiones GHG (tCO₂e)",
        legendOffset: -50,
        legendPosition: "middle",
        format: (value) => (value >= 1000 ? `${Math.round(value / 1000)}k` : value),
      }}
      colors={({ id }) => {
        if (id === "Total GHG" || id === "Proyección 2030") return theme.colors.ghg.primary
        if (id === "Scope 1" || id === "Proyección Scope 1") return theme.charts.scope1
        if (id === "Scope 2" || id === "Proyección Scope 2") return theme.charts.scope2
        if (id === "Scope 3" || id === "Proyección Scope 3") return theme.charts.scope3
        if (id === "Meta 2030") return theme.charts.target
        return theme.colors.ghg.primary
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
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

export default GHGEmissionsTimelineChart