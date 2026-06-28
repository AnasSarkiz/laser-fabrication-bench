import { expect, test } from "bun:test"

import {
  LaserFabricationBench,
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
