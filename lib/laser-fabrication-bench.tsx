import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"

import { LaserFabricationBenchModel } from "./scene/laser-fabrication-bench-model"
import { PlaceholderBenchScene } from "./scene/placeholder-bench-scene"

export interface LaserFabricationBenchProps {
  jigRotation: number
  feederWheelRotation: number
  className?: string
}

export function LaserFabricationBench({
  jigRotation,
  feederWheelRotation,
  className,
}: LaserFabricationBenchProps) {
  return (
    <div
      className={className}
      data-testid="laser-fabrication-bench-scene"
      style={{ height: "100%", minHeight: 360 }}
    >
      <Canvas
        camera={{ position: [7, 5, 7], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#f6f5ef"]} />
        <ambientLight intensity={0.7} />
        <directionalLight intensity={1.2} position={[4, 6, 5]} />
        <Suspense>
          <LaserFabricationBenchModel
            feederWheelRotation={feederWheelRotation}
            jigRotation={jigRotation}
          />
        </Suspense>
        <OrbitControls makeDefault enablePan={false} />
      </Canvas>
    </div>
  )
}
