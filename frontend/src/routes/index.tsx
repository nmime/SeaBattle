import { useSearchParams } from "@solidjs/router"
import { createSignal } from "solid-js"
import { MyState } from "backend/src/typings/game"
import { Room } from "colyseus.js"
import { Game } from "~/typings/Game"
import { ShipsProps } from "~/components/ships"
import { NotStarted } from "~/components/NotStarted"
import { BattleMapProps } from "~/components/map"
import { DimensionProvider } from "~/contexts/Dimension"

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [game, setGame] = createSignal<Game>({} as Game)
  const [room, setRoom] = createSignal<Room<MyState>>({} as Room<MyState>)
  const [gameId, setGameId] = createSignal(searchParams.tgWebAppStartParam)

  const battleMap = [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
    { x: 4, y: 4 },
    { x: 5, y: 5, miss: true },
    { x: 6, y: 6 },
    { x: 7, y: 7 },
    { x: 8, y: 8 },
    { x: 9, y: 9 }
  ] as unknown as BattleMapProps["battleMap"]
  const ships = [
    { x: 0, y: 0, length: 2, direction: "horizontal" }
  ] as ShipsProps["ships"]

  return (
    <main>
      <DimensionProvider>
        <NotStarted battleMap={battleMap} ships={ships} />
      </DimensionProvider>
    </main>
  )
}
