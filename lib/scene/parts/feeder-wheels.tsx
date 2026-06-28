import type { BenchPartTransform } from "../transforms"

interface FeederWheelsProps {
  baseTransform: BenchPartTransform
  leftWheelTransform: BenchPartTransform
  rightWheelTransform: BenchPartTransform
}

export function FeederWheels({
  baseTransform,
  leftWheelTransform,
  rightWheelTransform,
}: FeederWheelsProps) {
  return (
    <group>
      {[leftWheelTransform, rightWheelTransform].map((transform) => (
        <mesh
          key={transform.position[2]}
          position={transform.position}
          rotation={transform.rotation}
        >
          <cylinderGeometry args={[0.44, 0.44, 0.28, 40]} />
          <meshStandardMaterial
            color="#2f3a46"
            roughness={0.35}
            metalness={0.1}
          />
        </mesh>
      ))}
      <mesh position={baseTransform.position} rotation={baseTransform.rotation}>
        <boxGeometry args={[0.38, 0.2, 1.7]} />
        <meshStandardMaterial color="#64748b" roughness={0.45} />
      </mesh>
    </group>
  )
}
