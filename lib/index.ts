export const packageName = "@tscircuit/laser-fabrication-bench"

export function helloLaserFabricationBench() {
  return "hello from laser fabrication bench"
}

export {
  LaserFabricationBench,
  type LaserFabricationBenchProps,
} from "./laser-fabrication-bench"
export {
  getBenchTransforms,
  getFeederWheelTransforms,
  getJigTransform,
  getPcbTransform,
  type BenchPartTransform,
  type BenchTransforms,
  type Vector3Tuple,
} from "./scene/transforms"
