import { Bounds, Clone, useGLTF } from "@react-three/drei"
import type { Object3D } from "three"

import {
  type LaserFabricationBenchModelPartKey,
  type LaserFabricationBenchModelPart,
  jigAssemblyPivot,
  jigAssemblyModelPartKeys,
  laserFabricationBenchModelParts,
} from "./model-manifest"
import {
  getCadPcbFeedOffset,
  getCadXAxisRotation,
  type Vector3Tuple,
} from "./transforms"

type LoadedModelPart = LaserFabricationBenchModelPart & {
  scene: Object3D
}

const jigAssemblyModelPartKeySet = new Set<LaserFabricationBenchModelPartKey>(
  jigAssemblyModelPartKeys,
)

interface LaserFabricationBenchModelProps {
  jigRotation: number
  feederWheelRotation: number
}

export function LaserFabricationBenchModel({
  jigRotation,
  feederWheelRotation,
}: LaserFabricationBenchModelProps) {
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
  const jigXAxisRotation = getCadXAxisRotation(jigRotation)
  const pcbFeedOffset = getCadPcbFeedOffset(feederWheelRotation)
  const staticParts = loadedParts.filter(
    (part) => !jigAssemblyModelPartKeySet.has(part.key),
  )
  const jigAssemblyParts = loadedParts.filter((part) =>
    jigAssemblyModelPartKeySet.has(part.key),
  )

  return (
    <Bounds fit clip margin={1.2}>
      <group>
        {staticParts.map((part) => (
          <Clone key={part.key} object={part.scene} position={part.position} />
        ))}
        <group position={jigAssemblyPivot} rotation={jigXAxisRotation}>
          {jigAssemblyParts.map((part) => (
            <Clone
              key={part.key}
              object={part.scene}
              position={getJigAssemblyPartPosition(part, pcbFeedOffset)}
            />
          ))}
        </group>
      </group>
    </Bounds>
  )
}

function getPositionRelativeToPivot(position: Vector3Tuple): Vector3Tuple {
  return [
    position[0] - jigAssemblyPivot[0],
    position[1] - jigAssemblyPivot[1],
    position[2] - jigAssemblyPivot[2],
  ]
}

function getJigAssemblyPartPosition(
  part: LaserFabricationBenchModelPart,
  pcbFeedOffset: Vector3Tuple,
): Vector3Tuple {
  const position = getPositionRelativeToPivot(part.position)

  if (part.key !== "pcb") {
    return position
  }

  return [
    position[0] + pcbFeedOffset[0],
    position[1] + pcbFeedOffset[1],
    position[2] + pcbFeedOffset[2],
  ]
}

for (const modelPart of laserFabricationBenchModelParts) {
  useGLTF.preload(modelPart.path)
}
