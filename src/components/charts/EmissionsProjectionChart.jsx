"use client"

import { ResponsiveLine } from "@nivo/line"
import { useTheme } from "../theme/ThemeProvider"

// Datos detallados para proyección GHG 2022-2030 con metas anuales
const generateDetailedProjectionData = (scope = "all") => {
  const baseYear = 2022

  // Datos históricos reales (2022-2025)
  const historicalData = [
    { year: 2022, value: 38500, isHistorical: true },
    { year: 2023, value: 41200, isHistorical: true },
    { year: 2024, value: 39800, isHistorical: true },
    { year: 2025, value: 42100, isHistorical: true },
  ]

  // Escenario 1: Tendencia actual (sin cambios significativos)
  const currentTrendData = [
    ...historicalData,
    { year: 2026, value: 43500, isProjection: true },
    { year: 2027, value: 45200, isProjection: true },
    { year: 2028, value: 47100, isProjection: true },
    { year: 2029, value: 49200, isProjection: true },
    { year: 2030, value: 51500, isProjection: true },
  ]

  // Escenario 2: Reducción moderada (5% anual desde 2026)
  const moderateReductionData = [
    ...historicalData,
    { year: 2026, value: 39995, isProjection: true }, // -5% vs 2025
    { year: 2027, value: 37995, isProjection: true }, // -5% vs 2026
    { year: 2028, value: 36095, isProjection: true }, // -5% vs 2027
    { year: 2029, value: 34290, isProjection: true }, // -5% vs 2028
    { year: 2030, value: 32576, isProjection: true }, // -5% vs 2029
  ]

  // Escenario 3: Reducción agresiva (10% anual desde 2026)
  const aggressiveReductionData = [
    ...historicalData,
    { year: 2026, value: 37890, isProjection: true }, // -10% vs 2025
    { year: 2027, value: 34101, isProjection: true }, // -10% vs 2026
    { year: 2028, value: 30691, isProjection: true }, // -10% vs 2027
    { year: 2029, value: 27622, isProjection: true }, // -10% vs 2028
    { year: 2030, value: 24860, isProjection: true }, // -10% vs 2029
  ]

  // Metas anuales (objetivos intermedios hacia 2030)
  const annualTargetsData = [
    { year: 2022, value: 38500 }, // Año base
    { year: 2023, value: 37730 }, // -2% vs 2022
    { year: 2024, value: 36575 }, // -5% vs 2022
    { year: 2025, value: 35420 }, // -8% vs 2022
    { year: 2026, value: 33880 }, // -12% vs 2022
    { year: 2027, value: 31570 }, // -18% vs 2022
    { year: 2028, value: 28875 }, // -25% vs 2022
    { year: 2029, value: 25410 }, // -34% vs 2022
    { year: 2030, value: 19250 }, // -50% vs 2022 (meta final)
  ]

  // Meta final 2030 (línea directa)
  const finalTargetData = [
    { year: 2022, value: 38500 },
    { year: 2030, value: 19250 },
  ]

  // Función para calcular porcentaje de reducción vs año base
  const calculateReductionPercentage = (currentValue, baseValue) => {
    return (((currentValue - baseValue) / baseValue) * 100).toFixed(1)
  }

  // Agregar porcentajes de reducción a los datos
  const addReductionPercentages = (data) => {
    return data.map((point) => ({
      ...point,
      reductionPercent: calculateReductionPercentage(point.value, historicalData[0].value),
    }))
  }

  // Si es un scope específico, ajustar los valores proporcionalmente
  if (scope !== "all") {
    const scopeFactors = {
      scope1: 0.3, // 30% del total
      scope2: 0.42, // 42% del total
      scope3: 0.28, // 28% del total
    }

    const factor = scopeFactors[scope] || 1

    return [
      {
        id: `Tendencia Actual (${scope.toUpperCase()})`,
        data: addReductionPercentages(
          currentTrendData.map((d) => ({
            x: d.year,
            y: Math.round(d.value * factor),
            isHistorical: d.isHistorical,
            isProjection: d.isProjection,
          })),
        ),
      },
      {
        id: `Reducción Moderada (${scope.toUpperCase()})`,
        data: addReductionPercentages(
          moderateReductionData.map((d) => ({
            x: d.year,
            y: Math.round(d.value * factor),
            isHistorical: d.isHistorical,
            isProjection: d.isProjection,
          })),
        ),
      },
      {
        id: `Reducción Agresiva (${scope.toUpperCase()})`,
        data: addReductionPercentages(
          aggressiveReductionData.map((d) => ({
            x: d.year,
            y: Math.round(d.value * factor),
            isHistorical: d.isHistorical,
            isProjection: d.isProjection,
          })),
        ),
      },
      {
        id: `Metas Anuales (${scope.toUpperCase()})`,
        data: addReductionPercentages(
          annualTargetsData.map((d) => ({
            x: d.year,
            y: Math.round(d.value * factor),
          })),
        ),
        dashed: true,
      },
    ]
  }

  return [
    {
      id: "Tendencia Actual",
      data: addReductionPercentages(
        currentTrendData.map((d) => ({
          x: d.year,
          y: d.value,
          isHistorical: d.isHistorical,
          isProjection: d.isProjection,
        })),
      ),
    },
    {
      id: "Reducción Moderada (-5% anual)",
      data: addReductionPercentages(
        moderateReductionData.map((d) => ({
          x: d.year,
          y: d.value,
          isHistorical: d.isHistorical,
          isProjection: d.isProjection,
        })),
      ),
    },
    {
      id: "Reducción Agresiva (-10% anual)",
      data: addReductionPercentages(
        aggressiveReductionData.map((d) => ({
          x: d.year,
          y: d.value,
          isHistorical: d.isHistorical,
          isProjection: d.isProjection,
        })),
      ),
    },
    {
      id: "Metas Anuales",
      data: addReductionPercentages(annualTargetsData.map((d) => ({ x: d.year, y: d.value }))),
      dashed: true,
    },
    {
      id: "Meta Final 2030 (-50%)",
      data: addReductionPercentages(finalTargetData.map((d) => ({ x: d.year, y: d.value }))),
      dashed: true,
    },
  ]
}

const EmissionsProjectionChart = ({ scope = "all" }) => {
  const { theme } = useTheme()
  const data = generateDetailedProjectionData(scope)

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 130, bottom: 60, left: 70 }}
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
        tickRotation: -45,
        legend: "Año",
        legendOffset: 50,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Emisiones GHG (tCO₂e)",
        legendOffset: -60,
        legendPosition: "middle",
        format: (value) => (value >= 1000 ? `${Math.round(value / 1000)}k` : value),
      }}
      colors={({ id }) => {
        if (id.includes("Tendencia Actual")) return theme.indicators.negative
        if (id.includes("Reducción Moderada")) return theme.indicators.warning
        if (id.includes("Reducción Agresiva")) return theme.indicators.positive
        if (id.includes("Metas Anuales")) return theme.charts.target
        if (id.includes("Meta Final")) return "#1565C0"
        return theme.colors.ghg.primary
      }}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemDirection: "left-to-right",
          itemWidth: 110,
          itemHeight: 18,
          itemOpacity: 0.75,
          symbolSize: 10,
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
        const { data: pointData } = point
        const isHistorical = pointData.isHistorical
        const isProjection = pointData.isProjection
        const reductionPercent = pointData.reductionPercent

        let statusText = ""
        if (isHistorical) statusText = " (Histórico)"
        else if (isProjection) statusText = " (Proyección)"

        return (
          <div
            style={{
              background: "white",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>{point.serieId}</div>
            <div>
              <strong>Año:</strong> {pointData.x}
              {statusText}
            </div>
            <div>
              <strong>Emisiones:</strong> {pointData.y.toLocaleString()} tCO₂e
            </div>
            <div
              style={{
                color: Number.parseFloat(reductionPercent) < 0 ? "#4CAF50" : "#F44336",
                fontWeight: "bold",
              }}
            >
              <strong>vs 2022:</strong> {reductionPercent > 0 ? "+" : ""}
              {reductionPercent}%
            </div>
            {pointData.x > 2022 && (
              <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
                {Number.parseFloat(reductionPercent) < 0 ? "✅ Reducción" : "⚠️ Aumento"} respecto al año base
              </div>
            )}
          </div>
        )
      }}
    />
  )
}

export default EmissionsProjectionChart