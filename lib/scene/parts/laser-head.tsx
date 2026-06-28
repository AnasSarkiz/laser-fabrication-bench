export function LaserHead() {
  return (
    <group position={[1.9, 1.12, 0]}>
      <mesh position={[0, 0.46, 0]}>
        <boxGeometry args={[0.82, 0.24, 2.3]} />
        <meshStandardMaterial color="#56616f" roughness={0.45} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.52, 0.78, 0.52]} />
        <meshStandardMaterial color="#c95f49" roughness={0.38} />
      </mesh>
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.18, 0.08, 0.52, 32]} />
        <meshStandardMaterial
          color="#222831"
          roughness={0.25}
          metalness={0.2}
        />
      </mesh>
    </group>
  )
}
