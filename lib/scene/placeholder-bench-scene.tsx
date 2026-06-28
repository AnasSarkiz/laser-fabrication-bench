import { MathUtils } from "three"

import { BenchBase } from "./parts/bench-base"
import { FeederWheels } from "./parts/feeder-wheels"
import { JigClamshell } from "./parts/jig-clamshell"
import { LaserHead } from "./parts/laser-head"
import { PcbPanel } from "./parts/pcb-panel"

interface PlaceholderBenchSceneProps {
  jigRotation: number
  feederWheelRotation: number
}

export function PlaceholderBenchScene({
  jigRotation,
  feederWheelRotation,
}: PlaceholderBenchSceneProps) {
  return (
    <group rotation={[0, MathUtils.degToRad(-28), 0]}>
      <BenchBase />
      <JigClamshell rotation={jigRotation} />
      <FeederWheels rotation={feederWheelRotation} />
      <PcbPanel />
      <LaserHead />
    </group>
  )
}
