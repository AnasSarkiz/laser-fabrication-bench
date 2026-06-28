import { MathUtils } from "three"

interface FeederWheelsProps {
  rotation: number
}

export function FeederWheels({ rotation }: FeederWheelsProps) {
  const wheelRotation = MathUtils.degToRad(rotation)

  return (
    <group position={[-2.55, 0.58, 0]}>
      {[-0.62, 0.62].map((z) => (
        <mesh
          key={z}
          position={[0, 0, z]}
          rotation={[MathUtils.degToRad(90), 0, wheelRotation]}
        >
          <cylinderGeometry args={[0.44, 0.44, 0.28, 40]} />
          <meshStandardMaterial
            color="#2f3a46"
            roughness={0.35}
            metalness={0.1}
          />
        </mesh>
      ))}
      <mesh position={[0, -0.22, 0]}>
        <boxGeometry args={[0.38, 0.2, 1.7]} />
        <meshStandardMaterial color="#64748b" roughness={0.45} />
      </mesh>
    </group>
  )
}
