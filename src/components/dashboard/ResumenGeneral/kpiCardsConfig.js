// kpiCardsConfig.js

export const getKpiCardsConfig = (kpiData, year) => [
  {
    title: "Emisiones Totales",
    data: kpiData.totalEmissions,
    icon: "chart",
    changeText: (data) =>
      `${data.change > 0 ? "+" : ""}${data.change}% vs ${year - 1}`,
    changeValue: (data) =>
      `${data.changeValue > 0 ? "+" : ""}${data.changeValue.toLocaleString()} tCO₂e`,
  },
  {
    title: "Objetivo 2030",
    data: kpiData.target2030,
    icon: "target",
    changeText: (data) =>
      `Reducción necesaria: ${data.percentToTarget}%`,
    changeValue: () => {
      const current = kpiData.totalEmissions.value;
      const target = kpiData.target2030.value;
      const diff = current - target;
      return diff > 0
        ? `Faltan ${diff.toLocaleString()} tCO₂e`
        : `Meta superada por ${Math.abs(diff).toLocaleString()} tCO₂e`;
    },
  },
  {
    title: "Mayor Fuente Emisora",
    data: kpiData.majorSource,
    icon: "fire",
    changeText: (data) =>
      `${data.change > 0 ? "+" : ""}${data.change}% vs ${year - 1}`,
    changeValue: (data) =>
      `${data.changeValue > 0 ? "+" : ""}${data.changeValue.toLocaleString()} tCO₂e`,
    isPositive: (data) => data.isPositive,
  },
  {
    title: "Tasa de Reducción",
    data: kpiData.reductionRate,
    icon: "trending",
    change: kpiData.reductionRate.target - kpiData.reductionRate.value,
    changeText: (data) =>
      `Meta: ${data.target}% anual`,
    changeValue: (data) => {
      const diff = data.target - data.value;
      return diff > 0
        ? `Faltan ${diff.toFixed(1)} %`
        : `Superado por ${Math.abs(diff).toFixed(1)} %`;
    },
  },
]