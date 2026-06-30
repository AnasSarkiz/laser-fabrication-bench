export type Vector3Tuple = readonly [number, number, number]

export interface BenchPartTransform {
  position: Vector3Tuple
  rotation: Vector3Tuple
}

export interface BenchTransforms {
  scene: BenchPartTransform
  jig: BenchPartTransform
  feederWheelLeft: BenchPartTransform
  feederWheelRight: BenchPartTransform
  feederWheelBase: BenchPartTransform
  pcb: BenchPartTransform
}

const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180

const SCENE_ROTATION_DEGREES = -28
const JIG_POSITION: Vector3Tuple = [0, 0.18, 0]
const FEEDER_WHEEL_BASE_POSITION: Vector3Tuple = [-2.55, 0.36, 0]
const FEEDER_WHEEL_LEFT_POSITION: Vector3Tuple = [-2.55, 0.58, -0.62]
const FEEDER_WHEEL_RIGHT_POSITION: Vector3Tuple = [-2.55, 0.58, 0.62]
const PCB_BASE_POSITION: Vector3Tuple = [0.42, 0.38, 0]
const PCB_FEED_DISTANCE_PER_REVOLUTION = 0.72

export function getJigTransform(
  jigRotationDegrees: number,
): BenchPartTransform {
  return {
    position: JIG_POSITION,
    rotation: [0, degreesToRadians(jigRotationDegrees), 0],
  }
}

export function getFeederWheelTransforms(
  feederWheelRotationDegrees: number,
): Pick<
  BenchTransforms,
  "feederWheelLeft" | "feederWheelRight" | "feederWheelBase"
> {
  const feederWheelRotationRadians = degreesToRadians(
    feederWheelRotationDegrees,
  )
  const wheelRotation: Vector3Tuple = [
    degreesToRadians(90),
    0,
    feederWheelRotationRadians,
  ]

  return {
    feederWheelLeft: {
      position: FEEDER_WHEEL_LEFT_POSITION,
      rotation: wheelRotation,
    },
    feederWheelRight: {
      position: FEEDER_WHEEL_RIGHT_POSITION,
      rotation: wheelRotation,
    },
    feederWheelBase: {
      position: FEEDER_WHEEL_BASE_POSITION,
      rotation: [0, 0, 0],
    },
  }
}

export function getPcbTransform(
  feederWheelRotationDegrees: number,
): BenchPartTransform {
  const feedPosition =
    (feederWheelRotationDegrees / 360) * PCB_FEED_DISTANCE_PER_REVOLUTION

  return {
    position: [
      PCB_BASE_POSITION[0] + feedPosition,
      PCB_BASE_POSITION[1],
      PCB_BASE_POSITION[2],
    ],
    rotation: [0, 0, 0],
  }
}

export function getCadXAxisRotation(rotationDegrees: number): Vector3Tuple {
  return [degreesToRadians(rotationDegrees), 0, 0]
}

export function getCadYAxisRotation(rotationDegrees: number): Vector3Tuple {
  return [0, degreesToRadians(rotationDegrees), 0]
}

export function getCadZAxisRotation(rotationDegrees: number): Vector3Tuple {
  return [0, 0, degreesToRadians(rotationDegrees)]
}

export function getCadJigRotation(jigRotationDegrees: number): Vector3Tuple {
  return getCadXAxisRotation(jigRotationDegrees)
}

export function getBenchTransforms({
  jigRotationDegrees,
  feederWheelRotationDegrees,
}: {
  jigRotationDegrees: number
  feederWheelRotationDegrees: number
}): BenchTransforms {
  return {
    scene: {
      position: [0, 0, 0],
      rotation: [0, degreesToRadians(SCENE_ROTATION_DEGREES), 0],
    },
    jig: getJigTransform(jigRotationDegrees),
    ...getFeederWheelTransforms(feederWheelRotationDegrees),
    pcb: getPcbTransform(feederWheelRotationDegrees),
  }
}
