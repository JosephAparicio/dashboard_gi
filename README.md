# 🌱 Dashboard de Emisiones GHG

Este proyecto es un **dashboard interactivo** desarrollado con **React**, **Tailwind CSS** y **Nivo** (para gráficos), diseñado como parte de una prueba técnica con enfoque en sostenibilidad, visualización de datos y buenas prácticas en desarrollo frontend.

---

## 🎯 Objetivo del Rediseño

El rediseño de este dashboard busca:

- 💥 Ser **visual y atractivo** para nuevos usuarios.
- 📈 Ser **escalable** para incluir más años y nuevas fuentes de emisión como agua, electricidad, transporte, etc.
- 👀 Ser **fácil de leer y navegar**.
- 📱 Ser **completamente responsivo** en distintos dispositivos.
- ♿ Seguir **buenas prácticas de accesibilidad**.

---

## 📊 ¿Qué visualiza?

El dashboard presenta información crítica sobre las emisiones de Gases de Efecto Invernadero (GHG):

- 📅 **Total de emisiones GHG por año**
- 📉 **Reducción porcentual y absoluta**
- 🔍 **Emisiones por fuente y por alcance** (Scope 1, 2 y 3)
- 🧭 **Escenarios proyectados hasta el año 2030**

---

## 🧭 Estructura General

### 🖼️ Introducción
- Una pantalla inicial animada a modo de presentación del proyecto.
- **Objetivo**: dar una primera impresión al usuario la primera vez que ingresa.

---

### 📂 Sidebar de Navegación
Organiza las vistas principales:

- 🏠 **Principal**
  - `Resumen general` y `Vista general` (actualmente muestran lo mismo, pero se diferenciarán en el futuro:  
    > ✨ *"Vista general servirá para comparar múltiples años simultáneamente con filtros avanzados."*)

- 🌍 **Emisiones**
  - `Gases GHG` ✅ *(dashboard funcional ya implementado)*
  - `Agua` 🔧
  - `Energía` 🔧
  - `Transporte` 🔧  
  > 🧩 *Las rutas y estructuras están preparadas para estos dashboards, listos para integrar nuevos datos.*

- 📈 **Análisis** 🚧 *(no implementado aún)*  
  > 🧐 *Este módulo permitiría en un futuro aplicar modelos predictivos, simulaciones o análisis comparativos.*

---

## ⚙️ Tecnologías Utilizadas

- ⚛️ **React** – Para construir una interfaz de usuario dinámica y reactiva, facilitando el manejo del estado y la composición de componentes.  
- 💨 **Tailwind CSS** – Permite crear un diseño limpio, moderno y responsivo de forma rápida, con utilidades listas para usar sin necesidad de escribir CSS personalizado.  
- 📊 **Nivo** – Utilizado para generar gráficos interactivos y visualizaciones de datos claras y personalizables en el dashboard.  
- ✨ **GSAP** – Empleado en la introducción para crear animaciones fluidas e impactantes que mejoran la experiencia visual del usuario.

---

## 🚧 Estado del Proyecto

- `✅ Gases GHG`: implementado.
- `🕐 Agua, Energía, Transporte`: rutas listas, visualización pendiente.
- `📉 Análisis`: planeado para futura expansión.

---

## 📌 Notas Finales

Este proyecto fue realizado como parte de una **prueba técnica** con enfoque en sostenibilidad y calidad visual.  
Cada módulo está diseñado para escalar fácilmente, integrando datos dinámicos y adaptándose a nuevos requerimientos.

