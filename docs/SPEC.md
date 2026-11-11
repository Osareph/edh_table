# EDH Table App Specification

## Overview

EDH Table is a mobile-first companion app for Magic: The Gathering Commander games. The app helps players track life totals, poison counters, experience counters, and commander damage across 2 to 4 players. It also includes a quick random start-player selector so the table can determine the first turn without separate dice or coin tools.

## Goals

- Let players start a game quickly with a small number of taps
- Keep game state visible and easy to update during play
- Support 2, 3, and 4-player Commander matches
- Minimize accidental state changes while keeping interaction fast
- Make the app readable in a normal tabletop setting
- Let players randomly choose a starting player from the active table

## Non-Goals

- Full deck management
- Drafting or deck building tools
- Multiplayer networking or cloud sync
- Card search or rule lookup
- Tournament-grade compliance features
- Dice or coin-based utility features beyond the start-player selector

## User Flow

### 1. Home screen

The app opens on a home screen with a title and two primary actions:

- Start Game
- Settings

The Start Game action navigates to the player-count selection screen.

### 2. Player selection screen

The user chooses the game size:

- 2 Players
- 3 Players
- 4 Players

The selected option is highlighted. The Start action is only enabled when a valid selection has been made. If the user tries to start without selecting a count, the app prompts them to choose a player count.

### 3. Table screen

The app displays one card per player. Each card includes:

- Player label
- Current life total
- Poison counter
- Experience counter
- Commander damage rows against other players
- Visible start-player badge when the player has been selected to begin

The app also has global controls for:

- choose random start player
- reset round
- reset game

## Functional Requirements

### Player setup

- The app supports exactly 2, 3, or 4 players.
- Default starting life is 40.
- Players can set a custom starting life to 20, 40, or 60.
- Changing starting life updates the current life total for that player.
- The app can randomly choose a start player from the active player count.

### Life tracking

- Players can increase or decrease life by 1 per tap.
- The life total cannot fall below 0.
- Life changes are visible immediately.

### Poison tracking

- Each player has a poison counter value.
- A tap adds 1 poison counter.
- A long press resets the poison counter to 0.
- Poison is displayed as a single compact counter value.

### Experience tracking

- Each player has an experience counter value.
- A tap adds 1 experience counter.
- A long press resets the experience counter to 0.
- Experience is displayed as a single compact counter value.

### Commander damage

- Each player tracks damage dealt by every other player.
- Damage is adjusted independently per attacker/target pair.
- Damage cannot go below 0.
- Increasing commander damage reduces the target player's life by the actual damage delta, and decreasing it restores life accordingly.
- Commander damage is visually grouped under each player card.

### Game reset controls

- Reset round restores each player to their starting life and clears poison and commander damage while preserving experience value.
- Reset game restores each player to default starting conditions and clears the current random start-player selection.
- Reset actions should be explicit and easy to trigger.

### Start-player tool

- The app provides a single action to choose a random player from 1 to the active player count.
- The selected player is highlighted in the table and marked as the starting player.
- Re-triggering the action picks a fresh random player.

## Data Model

Each player has the following state:

- life: number
- poison: number
- experience: number
- startingLife: number
- commanderDamage: Record<number, number>

The app stores a record of all active players keyed by player number. The table session also tracks:

- startingPlayer: number | null

## UI Behaviour

### Layout

- The app is optimized for light mobile/tabletop use.
- Each player card is a compact, readable panel.
- The row layout keeps labels and counters aligned on one line where appropriate.
- Global tools are visible above the player grid.
- The active starting player is visually emphasized with a clear badge and animation.

### Interaction rules

- Tap controls should be fast and responsive.
- Long press should be reserved for reset actions for poison and experience counters.
- Buttons should communicate intent clearly without requiring extra tutorial steps.
- The start-player tool should be a single, obvious action that can be used without extra setup.

## Edge Cases

- If a player chooses a number of players that is invalid, default to the safe fallback path.
- If the player tries to start without choosing a count, show an alert.
- If a player is missing from state, create a default player state for them.
- If commander damage data is undefined, treat it as 0.
- If the user resets the game while no players are selected, the app should recover gracefully.
- If no start player has been chosen yet, the start-player visual state should be hidden.

## Acceptance Criteria

1. User can start a game by selecting 2, 3, or 4 players.
2. User cannot start without a valid selection.
3. User can adjust each player’s life with +/- actions.
4. User can tap a poison counter to increment and long press to reset to 0.
5. User can tap an experience counter to increment and long press to reset to 0.
6. User can set starting life to 20, 40, or 60.
7. User can adjust commander damage for each opposing player.
8. User can randomly choose the starting player from the active table.
9. User can reset round or reset game.
10. Build passes TypeScript and Expo web export checks.

## Future Enhancements

- Undo/redo history
- Player name editing
- Custom counter presets
- Accessibility improvements including larger touch targets and screen-reader labels
- Save/load game state for mid-match continuation
- Additional table tools beyond life, poison, experience, and commander damage
