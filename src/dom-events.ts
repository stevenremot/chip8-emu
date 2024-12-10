import { State } from "./state";

export type GameStartEvent = CustomEvent<{ gameState: State }>
