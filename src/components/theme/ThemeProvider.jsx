import { createContext, useContext, useState } from "react"

const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    colors: {
      ghg: {
        primary: "#4CAF50",
        secondary: "#81C784",
        light: "#E8F5E9",
        dark: "#2E7D32",
        text: "#E8F5E9",
        black: "#000000",
      },
      water: {
        primary: "#1976D2",
        secondary: "#64B5F6",
        light: "#E3F2FD",
        dark: "#0D47A1",
        text: "#E3F2FD",
      },
      energy: {
        primary: "#FBC02D",
        secondary: "#FFE082",
        light: "#FFF8E1",
        dark: "#F57F17",
        text: "#FFFDE7",
      },
      transport: {
        primary: "#757575",
        secondary: "#BDBDBD",
        light: "#FAFAFA",
        dark: "#424242",
        text: "#FAFAFA",
      },
      waste: {
        primary: "#795548",
        secondary: "#A1887F",
        light: "#EFEBE9",
        dark: "#4E342E",
        text: "#EFEBE9",
      },
      solid: {
        black: "#000000",
        white: "#FFFFFF",
      }
    },
    indicators: {
      positive: "#4CAF50",
      negative: "#F44336",
      neutral: "#9E9E9E",
      warning: "#FF9800",
    },
    charts: {
      scope1: "#D32F2F", // Rojo
      scope2: "#FFA000", // Ámbar
      scope3: "#7B1FA2", // Púrpura
      projection: "#0288D1", // Azul
      target: "#FF5722", // Naranja
    },
    graphic_lines: {
      actual: "#ff7f7f", // rojo suave
      optimistic: "#7ecf9c", // verde natural
      target: "#6aaed6", // azul marino suave
    }
  })

  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
}