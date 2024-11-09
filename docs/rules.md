# War of Colours - Game Rules

## Game Setup

1. **Map Size**: The default map size is 10x10 hexagonal grid.
2. **Players**: The game supports up to 6 players, which can be either human or AI-controlled.
3. **Hex Tiles**: Each hex tile can be empty, inaccessible, or occupied by a player with an integer number of forces.
4. **Map Generation**: The map is randomly generated, but all accessible hex tiles must be reachable from each other, ensuring no separated islands.

## Player Turns

1. **Turn Order**: Players take turns in a predefined order.
2. **Actions**: During their turn, a player can:
   - Select a hex and move all units but one to a neighboring empty hex.
   - Attack a neighboring hex occupied by a different player.
   - Choose Peace or War for each other player at the end of their turn.

## Movement

1. **Move Units**: A player can move all units but one from a hex to a neighboring empty hex.
2. **Restrictions**: Units cannot move to inaccessible hexes.

## Attacks

1. **Attack Calculation**: The attack is calculated by taking the number of attacking units (minus one) vs. defending units.
2. **Random Removal**: Units are randomly removed from either the attacker or defender until one side has below half of what they started with.
3. **Multiple Attacks**: The attacking player can attack again in the same turn if they choose.
4. **Diplomatic Status**: If one player attacks another, their status immediately becomes War.

## AI Behavior

1. **Movement**: AI players move all units until no other moves are possible.
2. **Preference**: AI players prefer to move to an empty hex or attack the weakest neighboring hex.
3. **Unit Distribution**: When distributing new units, AI players place them according to the number of enemy units in adjacent hexes.
4. **Diplomatic Status**: AI players do not attack players they are at peace with unless there are no other options. AI players always choose war with the strongest player on the board.

## Game End

1. **Victory Condition**: The game ends when one player has occupied the entire map.

## Graphics and Implementation

1. **Graphics**: Simple and fast graphics are used, implemented using PixiJS.
2. **Language**: The game is implemented in TypeScript to run in the browser.

## Start Screen

1. **UI Elements**: The start screen allows the human player to choose the number of AI and human players and the size of the map.
2. **Transition**: The game transitions from the start screen to the main game screen when the user starts the game.
