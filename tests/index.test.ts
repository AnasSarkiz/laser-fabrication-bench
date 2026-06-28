import { expect, test } from "bun:test"

import {
  LaserFabricationBench,
  getBenchTransforms,
  getFeederWheelTransforms,
  getJigTransform,
  getPcbTransform,
  helloLaserFabricationBench,
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

test("bench transforms use explicit prop unit names", () => {
  const transforms = getBenchTransforms({
    jigRotationDegrees: 30,
    feederWheelRotationDegrees: 90,
  })

  expect(transforms.jig.rotation[1]).toBeCloseTo(Math.PI / 6)
  expect(transforms.feederWheelLeft.rotation[2]).toBeCloseTo(Math.PI / 2)
  expect(transforms.pcb.position[0]).toBeCloseTo(0.6)
})
