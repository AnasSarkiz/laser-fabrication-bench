import { BenchBase } from "./parts/bench-base"
import { FeederWheels } from "./parts/feeder-wheels"
import { JigClamshell } from "./parts/jig-clamshell"
import { LaserHead } from "./parts/laser-head"
import { PcbPanel } from "./parts/pcb-panel"
import { getBenchTransforms } from "./transforms"

interface PlaceholderBenchSceneProps {
  jigRotation: number
  feederWheelRotation: number
}

export function PlaceholderBenchScene({
  jigRotation,
  feederWheelRotation,
}: PlaceholderBenchSceneProps) {
  const transforms = getBenchTransforms({
    jigRotationDegrees: jigRotation,
    feederWheelRotationDegrees: feederWheelRotation,
  })

  return (
    <group
      position={transforms.scene.position}
      rotation={transforms.scene.rotation}
    >
      <BenchBase />
      <JigClamshell transform={transforms.jig} />
      <FeederWheels
        baseTransform={transforms.feederWheelBase}
        leftWheelTransform={transforms.feederWheelLeft}
        rightWheelTransform={transforms.feederWheelRight}
      />
      <PcbPanel transform={transforms.pcb} />
      <LaserHead />
    </group>
  )
}
