import { useState } from "react"

import { LaserFabricationBench } from "../lib/index"

const sliderStyle = {
  accentColor: "#c95f49",
  width: "100%",
}

export default function LaserFabricationBenchPage() {
  const [jigRotation, setJigRotation] = useState(0)
  const [feederWheelRotation, setFeederWheelRotation] = useState(0)

  return (
    <main
      style={{
        background: "#efeee7",
        color: "#171717",
        display: "grid",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        gridTemplateColumns: "minmax(220px, 300px) minmax(0, 1fr)",
        minHeight: "100vh",
      }}
    >
      <aside
        style={{
          borderRight: "1px solid #d6d3c7",
          display: "grid",
          gap: 24,
          padding: 24,
          alignContent: "start",
        }}
      >
        <div>
          <p style={{ color: "#6b675c", fontSize: 13, margin: "0 0 8px" }}>
            @tscircuit/laser-fabrication-bench
          </p>
          <h1 style={{ fontSize: 24, lineHeight: 1.15, margin: 0 }}>
            Laser fabrication bench
          </h1>
        </div>
        <label style={{ display: "grid", gap: 8, fontSize: 14 }}>
          <span>Jig rotation: {jigRotation} deg</span>
          <input
            data-testid="jig-rotation-slider"
            max={360}
            min={0}
            onChange={(event) =>
              setJigRotation(Number(event.currentTarget.value))
            }
            step={1}
            style={sliderStyle}
            type="range"
            value={jigRotation}
          />
        </label>
        <label style={{ display: "grid", gap: 8, fontSize: 14 }}>
          <span>Feeder wheel rotation: {feederWheelRotation} deg</span>
          <input
            data-testid="feeder-wheel-rotation-slider"
            max={360}
            min={0}
            onChange={(event) =>
              setFeederWheelRotation(Number(event.currentTarget.value))
            }
            step={1}
            style={sliderStyle}
            type="range"
            value={feederWheelRotation}
          />
        </label>
      </aside>
      <section style={{ minHeight: 520 }}>
        <LaserFabricationBench
          feederWheelRotation={feederWheelRotation}
          jigRotation={jigRotation}
        />
      </section>
    </main>
  )
}
