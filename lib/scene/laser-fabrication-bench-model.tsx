import { Bounds, Clone, useGLTF } from "@react-three/drei"
import type { Object3D } from "three"

import {
  type LaserFabricationBenchModelPart,
  laserFabricationBenchModelParts,
} from "./model-manifest"

type LoadedModelPart = LaserFabricationBenchModelPart & {
  scene: Object3D
}

export function LaserFabricationBenchModel() {
  const base = useGLTF("/models/base.glb")
  const jig = useGLTF("/models/jig.glb")
  const pcb = useGLTF("/models/Pcb.glb")
  const feederWheelLeft = useGLTF("/models/feeder-wheel-left.glb")
  const feederWheelRight = useGLTF("/models/feeder-wheel-right.glb")
  const axlemountMotorIsolation = useGLTF(
    "/models/axlemount_motor_isolation.x_t.glb",
  )
  const motorGear = useGLTF("/models/moter_gear.glb")
  const loadedParts: LoadedModelPart[] = [
    {
      ...laserFabricationBenchModelParts[0],
      scene: base.scene,
    },
    {
      ...laserFabricationBenchModelParts[1],
      scene: jig.scene,
    },
    {
      ...laserFabricationBenchModelParts[2],
      scene: pcb.scene,
    },
    {
      ...laserFabricationBenchModelParts[3],
      scene: feederWheelLeft.scene,
    },
    {
      ...laserFabricationBenchModelParts[4],
      scene: feederWheelRight.scene,
    },
    {
      ...laserFabricationBenchModelParts[5],
      scene: axlemountMotorIsolation.scene,
    },
    {
      ...laserFabricationBenchModelParts[6],
      scene: motorGear.scene,
    },
  ]

  return (
    <Bounds fit clip margin={1.2}>
      <group>
        {loadedParts.map((part) => (
          <Clone key={part.key} object={part.scene} position={part.position} />
        ))}
      </group>
    </Bounds>
  )
}

for (const modelPart of laserFabricationBenchModelParts) {
  useGLTF.preload(modelPart.path)
}
