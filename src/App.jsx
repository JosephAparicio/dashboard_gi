import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import IntroScreen from "./components/intro/IntroScreen"
import Dashboard from "./components/dashboard/Dashboard"
import { ThemeProvider } from "./components/theme/ThemeProvider"

function App() {
  const [skipIntro, setSkipIntro] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleEnterDashboard = () => {
    setSkipIntro(true)
  }

  // No renderizar nada hasta que el componente esté montado en el cliente
  if (!isMounted) {
    return null
  }

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={skipIntro ? <Navigate to="/dashboard" /> : <IntroScreen onEnter={handleEnterDashboard} />}
          />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App