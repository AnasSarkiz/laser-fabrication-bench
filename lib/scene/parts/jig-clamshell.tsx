import { MathUtils } from "three"

interface JigClamshellProps {
  rotation: number
}

export function JigClamshell({ rotation }: JigClamshellProps) {
  return (
    <group
      position={[0, 0.18, 0]}
      rotation={[0, MathUtils.degToRad(rotation), 0]}
    >
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
