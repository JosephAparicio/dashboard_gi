"use client"
import { Link, useLocation } from "react-router-dom"
import {
  BarChart3,
  Leaf,
  Droplets,
  Zap,
  Truck,
  Home,
  Settings,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const Sidebar = ({ open, setOpen, currentSection, themeColor }) => {
  const location = useLocation()
  const currentPath = location.pathname

  const mainItems = [
    { id: "resumen", name: "Resumen General", icon: Home, path: "/dashboard" },
    { id: "overview", name: "Vista General", icon: BarChart3, path: "/dashboard/overview" },
  ]

  const emissionItems = [
    { id: "ghg", name: "Gases GHG", icon: Leaf, path: "/dashboard/ghg", color: "#4CAF50" },
    { id: "agua", name: "Agua", icon: Droplets, path: "/dashboard/agua", color: "#1976D2" },
    { id: "energia", name: "Energía", icon: Zap, path: "/dashboard/energia", color: "#FBC02D" },
    { id: "transporte", name: "Transporte", icon: Truck, path: "/dashboard/transporte", color: "#757575" },
  ]

  const analyticsItems = [
    { id: "tendencias", name: "Tendencias", icon: TrendingDown, path: "/dashboard/tendencias" },
    { id: "configuracion", name: "Configuración", icon: Settings, path: "/dashboard/configuracion" },
  ]

  const isActive = (path) => currentPath === path

  const getNavClass = (path, color) => {
    const baseClass = "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200"

    if (isActive(path)) {
      return `${baseClass} bg-opacity-20 font-medium border-r-2`
    }

    if (color) {
      return `${baseClass} hover:bg-opacity-10 text-gray-700 group`
    }

    return `${baseClass} hover:bg-gray-100 text-gray-700`
  }

  // Función para obtener el color del ícono basado en la sección
  const getIconColor = (item) => {
    if (item.color && isActive(item.path)) {
      return item.color
    }
    return isActive(item.path) ? themeColor.primary : "#64748b"
  }

  // Función para obtener el color del borde para elementos activos
  const getBorderColor = (item) => {
    if (item.color && isActive(item.path)) {
      return item.color
    }
    return isActive(item.path) ? themeColor.primary : "transparent"
  }

  return (
    <>
      {/* Overlay para cerrar en móvil */}
      {open && <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-screen bg-white transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          open ? "translate-x-0 w-64" : "-translate-x-full w-0 lg:w-20"
        } border-r border-gray-200`}
      >
        {/* Logo y título */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {open && (
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#4CAF50" }}
              >
                <Leaf size={18} color="white" />
              </div>
              <h2 className="text-2xl font-semibold font-montserrat">
                <span style={{ color: '#358554' }}>green</span>
                <span style={{ color: '#74C37F' }}>initiative</span>
              </h2>
            </div>
          )}
          <button onClick={() => setOpen(!open)} className="p-1 rounded-md hover:bg-gray-100 text-gray-500">
            {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Navegación */}
        <nav className="p-4">
          {/* Sección Principal */}
          <div className="mb-6">
            <h3 className={`text-xs font-medium text-gray-500 mb-2 ${!open && "text-center"}`}>
              {open ? "Principal" : ""}
            </h3>
            <ul className="space-y-1">
              {mainItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={getNavClass(item.path)}
                    style={{ borderRightColor: getBorderColor(item) }}
                    onClick={() => window.innerWidth < 1024 && setOpen(false)}
                  >
                    <item.icon size={18} color={getIconColor(item)} />
                    {open && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sección Emisiones */}
          <div className="mb-6">
            <h3 className={`text-xs font-medium text-gray-500 mb-2 ${!open && "text-center"}`}>
              {open ? "Emisiones" : ""}
            </h3>
            <ul className="space-y-1">
              {emissionItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={`${getNavClass(item.path, item.color)} hover:bg-opacity-10`}
                    style={{
                      borderRightColor: getBorderColor(item),
                      "--hover-bg": `${item.color}20`,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive(item.path)) {
                        e.target.style.backgroundColor = `${item.color}15`
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive(item.path)) {
                        e.target.style.backgroundColor = "transparent"
                      }
                    }}
                    onClick={() => window.innerWidth < 1024 && setOpen(false)}
                  >
                    <item.icon
                      size={18}
                      color={isActive(item.path) ? item.color : "#64748b"}
                      className="transition-colors duration-200 group-hover:text-current"
                      style={{
                        color: isActive(item.path) ? item.color : undefined,
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive(item.path)) {
                          e.target.style.color = item.color
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive(item.path)) {
                          e.target.style.color = "#64748b"
                        }
                      }}
                    />
                    {open && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sección Análisis */}
          <div className="mb-6">
            <h3 className={`text-xs font-medium text-gray-500 mb-2 ${!open && "text-center"}`}>
              {open ? "Análisis" : ""}
            </h3>
            <ul className="space-y-1">
              {analyticsItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={getNavClass(item.path)}
                    style={{ borderRightColor: getBorderColor(item) }}
                    onClick={() => window.innerWidth < 1024 && setOpen(false)}
                  >
                    <item.icon size={18} color={getIconColor(item)} />
                    {open && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Footer */}
        {open && (
          <div className="absolute bottom-0 left-0 right-0 p-4 text-xs text-center border-t border-gray-200">
            <p>GreenInitiative Dashboard v1.0</p>
            <p className="mt-1 text-gray-500">© 2025 Prueba Ténica</p>
          </div>
        )}
      </aside>
    </>
  )
}

export default Sidebar