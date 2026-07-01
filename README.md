# @tscircuit/laser-fabrication-bench

React/Three.js visualizer for a laser fabrication bench CAD assembly.

The package renders a Shapr3D-exported bench model in a Cosmos/Vite preview and
exposes controls for the current simulation motions:

- Jig rotation from `0` to `360` degrees.
- PCB feed translation from `-100%` to `100%`.

## How to Use

Install the package in a React app that already supports Three.js canvas
rendering:

```sh
bun add @tscircuit/laser-fabrication-bench
```

Render the bench:

```tsx
import { LaserFabricationBench } from "@tscircuit/laser-fabrication-bench"

export function BenchPreview() {
  return (
    <div style={{ height: 600 }}>
      <LaserFabricationBench
        feederWheelRotation={0}
        jigRotation={0}
      />
    </div>
  )
}
```

Drive the simulation with state:

```tsx
import { useState } from "react"
import { LaserFabricationBench } from "@tscircuit/laser-fabrication-bench"

export function InteractiveBenchPreview() {
  const [jigRotation, setJigRotation] = useState(0)
  const [feederWheelRotation, setFeederWheelRotation] = useState(0)

  return (
    <>
      <input
        max={360}
        min={0}
        onChange={(event) => setJigRotation(Number(event.currentTarget.value))}
        type="range"
        value={jigRotation}
      />
      <input
        max={100}
        min={-100}
        onChange={(event) =>
          setFeederWheelRotation(Number(event.currentTarget.value))
        }
        type="range"
        value={feederWheelRotation}
      />
      <div style={{ height: 600 }}>
        <LaserFabricationBench
          feederWheelRotation={feederWheelRotation}
          jigRotation={jigRotation}
        />
      </div>
    </>
  )
}
```

The `jigRotation` prop is in degrees. The `feederWheelRotation` prop is currently
used as a signed PCB feed percentage from `-100` to `100`.

## Development

Install dependencies:

```sh
bun install
```

Start the Cosmos preview:

```sh
bun run start
```

Build the deployable Vite site in `dist`:

```sh
bun run build
```

Export the Cosmos fixture site when needed:

```sh
bun run cosmos:export
```

Run checks:

```sh
bun run typecheck
bun test
bun run format:check
```

## Package Entry

The package entrypoint is:

```ts
import { LaserFabricationBench } from "@tscircuit/laser-fabrication-bench"
```

Component props:

```ts
interface LaserFabricationBenchProps {
  jigRotation: number
  feederWheelRotation: number
  className?: string
}
```

`feederWheelRotation` is currently kept as the public prop name for compatibility,
but the CAD model uses it as a signed feed control for the PCB.

## Model Assets

CAD assets live in `public/models`:

- `base.glb`
- `jig.glb`
- `Pcb.glb`
- `feeder-wheel-left.glb`
- `feeder-wheel-right.glb`
- `axlemount_motor_isolation.x_t.glb`
- `moter_gear.glb`

The asset manifest and manual layout offsets live in
`lib/scene/model-manifest.ts`.

## Current Motion Model

The separated GLB files are composed back into the assembly with manual offsets.
Because the isolated Shapr3D exports are centered around their own origins, the
jig parts are placed under one shared pivot group before rotating.

Current jig assembly parts:

- `jig`
- `pcb`
- `feeder-wheel-left`
- `feeder-wheel-right`
- `motor-gear`

Current behavior:

- Jig assembly rotates around `jigAssemblyPivot` over the CAD X axis.
- PCB feed translates over the CAD X axis inside the jig assembly.
- Feeder wheel files are not individually spun yet, because each side export
  currently merges multiple gears into a small number of material-based meshes.
- Motor mount is static for now.

## Shapr3D Export Note

For believable gear animation, future exports should preserve each gear as a
separate object with a useful pivot/origin. If Shapr3D merges all green gears or
all purple gears into one mesh, the app cannot spin each gear independently.
