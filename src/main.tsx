import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import LaserFabricationBenchPage from "../pages/laser-fabrication-bench.page"

const rootElement = document.getElementById("root")

if (!rootElement) {
  throw new Error("Root element #root was not found")
}

createRoot(rootElement).render(
  <StrictMode>
    <LaserFabricationBenchPage />
  </StrictMode>,
)
