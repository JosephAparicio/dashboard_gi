"use client"

import { ResponsiveLine } from "@nivo/line"

// Datos simplificados para proyección GHG a 2030
const generateSimplifiedProjectionData = (scope = "all") => {
  // Factor para ajustar valores según el scope
  const getScopeFactor = (scopeType) => {
    switch (scopeType) {
      case "scope1":
        return 0.3
      case "scope2":
        return 0.42
      case "scope3":
        return 0.28
      default:
        return 1
    }
  }

  const factor = getScopeFactor(scope)

  const historicalData = [
    { year: 2022, value: Math.round(38500 * factor) },
    { year: 2023, value: Math.round(41200 * factor) },
    { year: 2024, value: Math.round(39800 * factor) },
    { year: 2025, value: Math.round(42100 * factor) },
  ]

  // Proyección estimada (2025-2030) - tendencia moderada
  const projectionData = [
    ...historicalData,
    { year: 2025, value: Math.round(37000 * factor) },
    { year: 2026, value: Math.round(40000 * factor) },
    { year: 2027, value: Math.round(38000 * factor) },
    { year: 2028, value: Math.round(36000 * factor) },
    { year: 2029, value: Math.round(33000 * factor) },
    { year: 2030, value: Math.round(30000 * factor) },
  ]

  // Meta 2030 (línea directa desde 2025)
  const targetData = [
    { year: 2025, value: Math.round(42100 * factor) },
    { year: 2030, value: Math.round(19250 * factor) },
  ]

  const baseValue = historicalData[0].value
  const addReductionPercentage = (data) => {
    return data.map((point) => ({
      ...point,
      reductionPercent: (((point.value - baseValue) / baseValue) * 100).toFixed(1),
    }))
  }

  return [
    {
      id: "Emisiones Reales",
      data: addReductionPercentage(historicalData).map((d) => ({
        x: d.year,
        y: d.value,
        reductionPercent: d.reductionPercent,
        isHistorical: true,
      })),
    },
    {
      id: "Proyección Estimada",
      data: addReductionPercentage(projectionData.filter((d) => d.year > 2025)).map((d) => ({
        x: d.year,
        y: d.value,
        reductionPercent: d.reductionPercent,
        isProjection: true,
      })),
    },
    {
      id: "Meta 2030",
      data: addReductionPercentage(targetData).map((d) => ({
        x: d.year,
        y: d.value,
        reductionPercent: d.reductionPercent,
        isTarget: true,
      })),
      dashed: true,
    },
  ]
}

const GHGProjectionChart = ({ scope = "all" }) => {
  const data = generateSimplifiedProjectionData(scope)

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
        if (id === "Emisiones Reales") return "#4CAF50"
        if (id === "Proyección Estimada") return "#FF9800"
        if (id === "Meta 2030") return "#FF5722"
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
            {point.data.reductionPercent && (
              <div
                style={{
                  color: Number.parseFloat(point.data.reductionPercent) < 0 ? "#4CAF50" : "#F44336",
                  fontWeight: "bold",
                }}
              >
                vs 2022: {point.data.reductionPercent > 0 ? "+" : ""}
                {point.data.reductionPercent}%
              </div>
            )}
          </div>
        )
      }}
    />
  )
}

export default GHGProjectionChart