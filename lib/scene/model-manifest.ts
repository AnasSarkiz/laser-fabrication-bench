export const laserFabricationBenchModelParts = [
  {
    key: "base",
    path: "/models/base.glb",
    position: [0, 0, 0],
  },
  {
    key: "jig",
    path: "/models/jig.glb",
    position: [0, -0.15, -0.1039],
  },
  {
    key: "pcb",
    path: "/models/Pcb.glb",
    position: [0.01, -0.133, -0.1],
  },
  {
    key: "feeder-wheel-left",
    path: "/models/feeder-wheel-left.glb",
    position: [0.061, -0.138, -0.1],
  },
  {
    key: "feeder-wheel-right",
    path: "/models/feeder-wheel-right.glb",
    position: [-0.041, -0.138, -0.1],
  },
  {
    key: "axlemount-motor-isolation",
    path: "/models/axlemount_motor_isolation.x_t.glb",
    position: [-0.12, -0.173, -0.084],
  },
  {
    key: "motor-gear",
    path: "/models/moter_gear.glb",
    position: [-0.11, -0.132, -0.105],
  },
] as const

export type LaserFabricationBenchModelPart =
  (typeof laserFabricationBenchModelParts)[number]

export type LaserFabricationBenchModelPartKey =
  LaserFabricationBenchModelPart["key"]

export const jigAssemblyPivot = [-0.11, -0.132, -0.105] as const

export const jigAssemblyModelPartKeys = [
  "jig",
  "pcb",
  "feeder-wheel-left",
  "feeder-wheel-right",
  "motor-gear",
] as const satisfies readonly LaserFabricationBenchModelPartKey[]
