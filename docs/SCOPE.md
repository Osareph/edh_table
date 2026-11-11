# Scope

## Purpose

This project is a lightweight EDH Commander companion app for tracking game state during a table match. The product goal is to make common Commander table actions fast, readable, and low-friction without becoming a full rules engine or deck management suite.

## In Scope

- 2-player, 3-player, and 4-player Commander match tracking
- Life total management
- Poison counter tracking
- Experience counter tracking
- Commander damage tracking per attacker/target pair
- Random start-player selection for determining turn order
- Quick reset controls for round and full game state
- Mobile-first UI optimized for tabletop use
- Small, focused UX improvements that improve gameplay flow

## Out of Scope

- Card database lookup
- Deck lists or deck building tools
- Searchable card rules reference
- Tournament validation or official rules enforcement
- Multiplayer sync or online game sessions
- Cloud save or account system
- Deck import/export
- Analytics dashboards or player statistics beyond current match state
- Complex AI, coaching, or recommendation systems
- Large dice or coin utility features that duplicate the start-player selector

## Product Principles

- Keep the app fast to learn and quick to use during a live match
- Prefer clear actions over hidden configuration
- Keep gameplay state visible and directly editable
- Make the interface readable at a distance on a table
- Prefer focused match tools over broad app features
- Preserve simplicity over feature breadth

## Quality Bar

Any work in scope should:

- support the core Commander loop without friction
- maintain mobile-first readability and layout stability
- avoid introducing state bugs that leave the match in an inconsistent state
- keep logic separated from UI where practical
- remain easy to test and extend without large refactors

## Decision Rules

- Features that add table utility but do not change match state are in scope if they improve play flow.
- Features that attempt to simulate rules interpretation, card legality, or deck construction are out of scope.
- New features should be small and composable, not large platform expansions.
- If a request would require multiplayer infrastructure or persistent account systems, it is outside scope.
- A request is in scope when it helps a table quickly determine turn order, manage combat state, and reset cleanly between rounds.

## Triage Guidance

Use this file to judge whether a request belongs in the project.

- If it directly helps a player run a Commander match, it is likely in scope.
- If it requires a second app layer, remote services, deck databases, or full game management, it is out of scope.
- If a request is broad, speculative, or would add a large feature surface, it should be rejected as "not planned" unless it clearly remains within the core tabletop utility goal.
- Requests for a single, table-friendly random start-player selector remain in scope because they directly support turn order without broadening the product into utility game systems.
