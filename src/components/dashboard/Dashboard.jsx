import { useState } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import Sidebar from "./Sidebar"
import ResumenGeneral from "./ResumenGeneral/ResumenGeneral"
import EmisionesGHG from "./EmisionesGHG/EmisionesGHG"
import { useTheme } from "../theme/ThemeProvider"

const Dashboard = () => {
  const [year, setYear] = useState(2025) // Actualizado a 2025
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const { theme } = useTheme()

  // Años disponibles para filtrar (actualizado para reflejar que estamos en 2025)
  const availableYears = [2022, 2023, 2024, 2025]

  // Determinar la sección actual basada en la ruta
  const getCurrentSection = () => {
    const path = location.pathname.split("/").filter(Boolean)[1] || "resumen"
    return path
  }

  // Obtener el color del tema basado en la sección actual
  const getThemeColor = () => {
    const section = getCurrentSection()
    switch (section) {
      case "ghg":
        return theme.colors.ghg
      case "agua":
        return theme.colors.water
      case "energia":
        return theme.colors.energy
      case "transporte":
        return theme.colors.transport
      default:
        return theme.colors.ghg
    }
  }

  const themeColor = getThemeColor()

  return (
    <div className="flex h-screen" style={{ backgroundColor: "#E6F5E5" }}>
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        currentSection={getCurrentSection()}
        themeColor={themeColor}
      />

      {/* Contenido principal */}
      <main className="flex-1 overflow-auto">
        {/* Header simplificado - sin título */}
        {/* <header className="sticky top-0 z-10 flex items-center justify-between p-3 shadow-sm bg-white">
          <div className="flex items-center">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 mr-4 rounded-md hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header> */}

        {/* Contenido dinámico basado en la ruta */}
        <div className="p-6">
          <Routes>
            <Route
              path="/"
              element={<ResumenGeneral year={year} setYear={setYear} availableYears={availableYears} />}
            />
            <Route
              path="/overview"
              element={<ResumenGeneral year={year} setYear={setYear} availableYears={availableYears} />}
            />
            <Route
              path="/ghg"
              element={<EmisionesGHG year={year} setYear={setYear} availableYears={availableYears} />}
            />
            <Route path="/agua" element={<div>Emisiones de Agua (En desarrollo)</div>} />
            <Route path="/energia" element={<div>Emisiones de Energía (En desarrollo)</div>} />
            <Route path="/transporte" element={<div>Emisiones de Transporte (En desarrollo)</div>} />
            <Route path="/tendencias" element={<div>Análisis de Tendencias (En desarrollo)</div>} />
            <Route path="/configuracion" element={<div>Configuración (En desarrollo)</div>} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
