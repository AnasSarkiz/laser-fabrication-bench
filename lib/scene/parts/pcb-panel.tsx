import type { BenchPartTransform } from "../transforms"

interface PcbPanelProps {
  transform: BenchPartTransform
}

export function PcbPanel({ transform }: PcbPanelProps) {
  return (
    <group position={transform.position} rotation={transform.rotation}>
      <mesh>
        <boxGeometry args={[2.55, 0.08, 1.16]} />
        <meshStandardMaterial color="#2f9c6b" roughness={0.65} />
      </mesh>
      {[-0.82, -0.28, 0.28, 0.82].map((x) => (
        <mesh key={x} position={[x, 0.055, -0.36]}>
          <boxGeometry args={[0.32, 0.025, 0.08]} />
          <meshStandardMaterial
            color="#d7b65d"
            metalness={0.5}
            roughness={0.32}
          />
        </mesh>
      ))}
      {[-0.82, -0.28, 0.28, 0.82].map((x) => (
        <mesh key={x} position={[x, 0.055, 0.36]}>
          <boxGeometry args={[0.32, 0.025, 0.08]} />
          <meshStandardMaterial
            color="#d7b65d"
            metalness={0.5}
            roughness={0.32}
          />
        </mesh>
      ))}
    </group>
  )
}
