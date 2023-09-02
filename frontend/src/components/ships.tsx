import { For } from "solid-js"
import { PlayerDataClass, ShipDirection } from "backend/src/typings/player"

export interface Ship {
  x: number
  y: number
  length: number
  direction: ShipDirection
  hit?: boolean
  sunk?: boolean
}

export interface ShipsProps {
  ships: PlayerDataClass["ships"] | Ship[]
  fieldSize: number
  scale: number
}

export function Ships(props: ShipsProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <For each={props.ships}>
      {(item) => {
        const shift =
          item.length === 4
            ? 0
            : item.length === 3
            ? 132
            : item.length === 2
            ? 231
            : 297

        return (
          <div
            style={{
              "background-image": `url('/sprite.png')`,
              "background-position": `${shift * -props.scale}px ${0}px`,
              "background-size": `${props.scale * 396}px ${props.scale * 99}px`,
              "background-repeat": "no-repeat",
              width: `${props.fieldSize * item.length}px`,
              height: `${props.fieldSize}px`,
              position: "absolute",
              left: `${(item.x + 1) * props.fieldSize}px`,
              top: `${(item.y + 1) * props.fieldSize}px`,
              transform:
                item.direction === "vertical"
                  ? "rotate(-90deg) translate(-25%, -50%)"
                  : ""
            }}
          />
        )
      }}
    </For>
  )
}
