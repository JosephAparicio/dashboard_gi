export const getGHGKPIData = (year) => {
    const dataByYear = {
      2022: {
        totalEmissions: { value: 38500, change: 8, changeValue: 2850, isPositive: false },
        scope1: { value: 11800, change: 5, changeValue: 562, isPositive: false },
        scope2: { value: 16200, change: 12, changeValue: 1743, isPositive: false },
        scope3: { value: 10500, change: 6, changeValue: 595, isPositive: false },
      },
      2023: {
        totalEmissions: { value: 41200, change: 7, changeValue: 2700, isPositive: false },
        scope1: { value: 12400, change: 5.1, changeValue: 600, isPositive: false },
        scope2: { value: 17500, change: 8.0, changeValue: 1300, isPositive: false },
        scope3: { value: 11300, change: 7.6, changeValue: 800, isPositive: false },
      },
      2024: {
        totalEmissions: { value: 39800, change: -3.4, changeValue: -1400, isPositive: true },
        scope1: { value: 11900, change: -4.0, changeValue: -500, isPositive: true },
        scope2: { value: 16800, change: -4.0, changeValue: -700, isPositive: true },
        scope3: { value: 11100, change: -1.8, changeValue: -200, isPositive: true },
      },
      2025: {
        totalEmissions: { value: 42100, change: 5.8, changeValue: 2300, isPositive: false },
        scope1: { value: 12600, change: 5.9, changeValue: 700, isPositive: false },
        scope2: { value: 17800, change: 6.0, changeValue: 1000, isPositive: false },
        scope3: { value: 11700, change: 5.4, changeValue: 600, isPositive: false },
      },
    }
    return dataByYear[year] || dataByYear[2025]
  }