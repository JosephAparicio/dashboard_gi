export const getKPIData = (year) => {
  const dataByYear = {
    2022: {
      totalEmissions: { value: 38500, change: 8, changeValue: 2850, isPositive: false },
      target2030: { value: 15000, percentToTarget: 61.0, isOnTrack: false },
      perEmployee: { value: 3.2, change: 3, changeValue: 0.1, isPositive: false },
      reductionRate: { value: 1.8, target: 7.5, isPositive: false },
      majorSource: {
        source: "Electricidad",
        value: 16200,
        percentage: 42.1,
        change: 8.0,       // +8% respecto a 2021 (o lo que quieras indicar)
        changeValue: 1200, // Ejemplo de cambio absoluto (hardcodeado)
        isPositive: false,
      },
    },
    2023: {
      totalEmissions: { value: 41200, change: 7, changeValue: 2700, isPositive: false },
      target2030: { value: 15000, percentToTarget: 63.6, isOnTrack: false },
      perEmployee: { value: 3.4, change: 6, changeValue: 0.2, isPositive: false },
      reductionRate: { value: 8.1, target: 7.5, isPositive: true },
      majorSource: {
        source: "Electricidad",
        value: 17500,
        percentage: 42.5,
        change: 8.0,       // Ejemplo hardcodeado (de 16200 a 17500 => aprox +8%)
        changeValue: 1300,
        isPositive: false,
      },
    },
    2024: {
      totalEmissions: { value: 39800, change: -3.4, changeValue: -1400, isPositive: true },
      target2030: { value: 15000, percentToTarget: 62.3, isOnTrack: true },
      perEmployee: { value: 3.3, change: -3, changeValue: -0.1, isPositive: true },
      reductionRate: { value: 3.4, target: 7.5, isPositive: false },
      majorSource: {
        source: "Electricidad",
        value: 17500,
        percentage: 42.2,
        change: 0.0,       // Sin cambio respecto al año anterior
        changeValue: 0,
        isPositive: false,
      },
    },
    2025: {
      totalEmissions: { value: 42100, change: 5.8, changeValue: 2300, isPositive: false },
      target2030: { value: 15000, percentToTarget: 64.4, isOnTrack: false },
      perEmployee: { value: 3.5, change: 6, changeValue: 0.2, isPositive: false },
      reductionRate: { value: 2.8, target: 7.5, isPositive: false },
      majorSource: {
        source: "Electricidad",
        value: 17800,
        percentage: 42.3,
        change: 1.7,       // Ejemplo hardcodeado
        changeValue: 300,
        isPositive: false,
      },
    },
  };

  return dataByYear[year] || dataByYear[2025];
}