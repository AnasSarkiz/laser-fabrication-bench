import { expect, test } from "bun:test"

import {
  LaserFabricationBench,
  getBenchTransforms,
  getCadXAxisRotation,
  getCadJigRotation,
  getCadPcbFeedOffset,
  getCadYAxisRotation,
  getCadZAxisRotation,
  getFeederWheelTransforms,
  getJigTransform,
  getPcbTransform,
  helloLaserFabricationBench,
  jigAssemblyPivot,
  jigAssemblyModelPartKeys,
  laserFabricationBenchModelParts,
  packageName,
} from "../lib/index"
import { expectedHelloMessage } from "./fixtures/hello-fixture"

test("exports the package name", () => {
  expect(packageName).toBe("@tscircuit/laser-fabrication-bench")
})

test("returns the hello-world message", () => {
  expect(helloLaserFabricationBench()).toBe(expectedHelloMessage)
})

test("exports the LaserFabricationBench component", () => {
  expect(typeof LaserFabricationBench).toBe("function")
})

test("lists separated GLB model parts", () => {
  expect(
    laserFabricationBenchModelParts.map((part) => ({
      key: part.key,
      path: part.path,
    })),
  ).toEqual([
    { key: "base", path: "/models/base.glb" },
    { key: "jig", path: "/models/jig.glb" },
    { key: "pcb", path: "/models/Pcb.glb" },
    { key: "feeder-wheel-left", path: "/models/feeder-wheel-left.glb" },
    { key: "feeder-wheel-right", path: "/models/feeder-wheel-right.glb" },
    {
      key: "axlemount-motor-isolation",
      path: "/models/axlemount_motor_isolation.x_t.glb",
    },
    { key: "motor-gear", path: "/models/moter_gear.glb" },
  ])
})

test("separated GLB model parts include static layout positions", () => {
  const nonBaseParts = laserFabricationBenchModelParts.filter(
    (part) => part.key !== "base",
  )

  expect(nonBaseParts.every((part) => part.position.length === 3)).toBe(true)
  expect(nonBaseParts.every((part) => part.position.some(Boolean))).toBe(true)
})

test("jig assembly includes parts held by the rotating jig", () => {
  expect(jigAssemblyModelPartKeys).toEqual([
    "jig",
    "pcb",
    "feeder-wheel-left",
    "feeder-wheel-right",
    "motor-gear",
  ])
})

test("jig assembly has one shared rotation pivot", () => {
  expect(jigAssemblyPivot).toEqual([-0.11, -0.132, -0.105])
})

test("jig rotation changes when the prop changes", () => {
  const neutralJigTransform = getJigTransform(0)
  const rotatedJigTransform = getJigTransform(45)

  expect(neutralJigTransform.rotation[1]).toBe(0)
  expect(rotatedJigTransform.rotation[1]).toBeCloseTo(Math.PI / 4)
})

test("feeder wheel rotation changes when the prop changes", () => {
  const neutralFeederTransforms = getFeederWheelTransforms(0)
  const rotatedFeederTransforms = getFeederWheelTransforms(180)

  expect(neutralFeederTransforms.feederWheelLeft.rotation[2]).toBe(0)
  expect(rotatedFeederTransforms.feederWheelLeft.rotation[2]).toBeCloseTo(
    Math.PI,
  )
  expect(rotatedFeederTransforms.feederWheelRight.rotation[2]).toBeCloseTo(
    Math.PI,
  )
})

test("PCB feed position changes predictably from feeder wheel rotation", () => {
  const startingPcbTransform = getPcbTransform(0)
  const quarterTurnPcbTransform = getPcbTransform(90)
  const halfTurnPcbTransform = getPcbTransform(180)

  expect(quarterTurnPcbTransform.position[0]).toBeCloseTo(
    startingPcbTransform.position[0] + 0.18,
  )
  expect(halfTurnPcbTransform.position[0]).toBeCloseTo(
    startingPcbTransform.position[0] + 0.36,
  )
})

test("CAD jig rotation changes predictably from jig rotation", () => {
  expect(getCadJigRotation(0)).toEqual([0, 0, 0])
  expect(getCadJigRotation(45)[0]).toBeCloseTo(Math.PI / 4)
  expect(getCadJigRotation(360)[0]).toBeCloseTo(Math.PI * 2)
})

test("CAD axis rotation helpers rotate around one explicit axis", () => {
  expect(getCadXAxisRotation(90)).toEqual([Math.PI / 2, 0, 0])
  expect(getCadYAxisRotation(90)).toEqual([0, Math.PI / 2, 0])
  expect(getCadZAxisRotation(90)).toEqual([0, 0, Math.PI / 2])
})

test("CAD PCB feed offset translates over X axis", () => {
  expect(getCadPcbFeedOffset(0)).toEqual([0, 0, 0])
  expect(getCadPcbFeedOffset(180)[0]).toBeCloseTo(0.05)
  expect(getCadPcbFeedOffset(360)[0]).toBeCloseTo(0.1)
})

test("bench transforms use explicit prop unit names", () => {
  const transforms = getBenchTransforms({
    jigRotationDegrees: 30,
    feederWheelRotationDegrees: 90,
  })

  expect(transforms.jig.rotation[1]).toBeCloseTo(Math.PI / 6)
  expect(transforms.feederWheelLeft.rotation[2]).toBeCloseTo(Math.PI / 2)
  expect(transforms.pcb.position[0]).toBeCloseTo(0.6)
})
