export function BenchBase() {
  return (
    <group>
      <mesh position={[0, -0.14, 0]} receiveShadow>
        <boxGeometry args={[6.4, 0.28, 3.6]} />
        <meshStandardMaterial color="#d8d5c8" roughness={0.75} />
      </mesh>
      <mesh position={[0, 0.08, -1.65]}>
        <boxGeometry args={[6.2, 0.2, 0.2]} />
        <meshStandardMaterial color="#4b5563" roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.08, 1.65]}>
        <boxGeometry args={[6.2, 0.2, 0.2]} />
        <meshStandardMaterial color="#4b5563" roughness={0.55} />
      </mesh>
    </group>
  )
}
