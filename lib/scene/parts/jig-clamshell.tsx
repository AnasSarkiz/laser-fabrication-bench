import { MathUtils } from "three"

import type { BenchPartTransform } from "../transforms"

interface JigClamshellProps {
  transform: BenchPartTransform
}

export function JigClamshell({ transform }: JigClamshellProps) {
  return (
    <group position={transform.position} rotation={transform.rotation}>
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[3.2, 0.18, 1.45]} />
        <meshStandardMaterial color="#89939f" roughness={0.5} />
      </mesh>
      <mesh
        position={[0, 0.32, -0.66]}
        rotation={[MathUtils.degToRad(-18), 0, 0]}
      >
        <boxGeometry args={[3.1, 0.12, 0.42]} />
        <meshStandardMaterial color="#f2b84b" roughness={0.42} />
      </mesh>
      <mesh
        position={[0, 0.32, 0.66]}
        rotation={[MathUtils.degToRad(18), 0, 0]}
      >
        <boxGeometry args={[3.1, 0.12, 0.42]} />
        <meshStandardMaterial color="#f2b84b" roughness={0.42} />
      </mesh>
    </group>
  )
}
