# LifeOS: Your Personal Growth & Goal Tracking OS

LifeOS is a gamified personal growth app that turns your goals, habits, and skill-building into a living 3D campus. You can explore your progress visually, inspect themed rooms for different life areas, manage quests and wishlist items, and focus the camera on individual rooms for a closer look.

## Overview

LifeOS is built around a simple idea: big life goals become easier to achieve when you break them into specific skills, sub-goals, and repeatable actions.

The app combines:

- a 3-step onboarding wizard for defining skill areas, vices, and sub-goals
- RPG-style leveling and progression with an AI-generated avatar
- quest tracking (daily, side, and experiment quests)
- a 3D room-based environment representing different growth categories
- interactive scene objects with descriptive overlays
- camera focus on individual rooms
- dark/light theme toggle

## Core Features

### Onboarding

When you first launch LifeOS, a 3-step wizard guides you through:

1. **Select Skills** — pick from 13 skill areas you want to improve
2. **Identify Vices** — choose up to 3 vices to track and overcome
3. **Define Sub-Goals** — add personal sub-goals for each selected skill

Your selections replace the defaults and persist across sessions.

### Skill areas

You define the areas of life you want to improve, such as:

- Sports & Games
- Fitness
- Diet
- Mental Health
- Self-Care
- Arts
- Academics
- Life Experiences
- Performative Arts
- Reading Books
- Language Learning
- Social Media Creation
- Practical Skills

Each skill can level up over time as you complete quests and make progress. Level titles progress from Fledgling through Novice, Apprentice, Adept, Expert, Master, Grandmaster, to Legend.

### Character system

LifeOS includes an RPG character card with:

- level and EXP tracking with animated bars
- HP (health points) with potion-based recovery
- dollar/currency system
- health potions (earned from quests, used to heal HP or cure vices)
- AI-generated avatar that evolves when you level up

### Quests and progression

Three quest types are available:

- **daily quests** — recurring tasks
- **side quests** — optional challenges
- **experiments** — try-something-new tasks

Completing a quest awards:

- EXP (with possible level-up)
- dollars
- skill XP in the quest's category
- random potion drops (30% chance)
- random collectible item drops (10% chance)

You can also create custom quests with title, description, category, EXP reward, and sub-goal link.

### Vices and recovery

Three vice types are tracked:

- Doomscrolling
- Binge Eating
- Burnout

Vices are measured on a 0–100 scale. Using a potion reduces a vice by 40%.

### Wishlist and savings

Set savings goals with target amounts. Spend dollars to advance wishlist progress toward your rewards.

### Collectibles

Completing quests has a chance to drop collectible items. A collection system tracks what you've gathered.

### AI Avatar Evolution

When you level up, LifeOS can generate a new RPG avatar using Google Gemini AI. The avatar reflects your current level and stats, styled like a cozy indie game character. This requires a `GEMINI_API_KEY` environment variable.

### Dark/Light theme

Toggle between light and dark modes. Your preference persists across sessions.

## 3D Campus

The 3D scene is organized like a personal development campus with themed rooms for each skill area.

Examples:

- a gym-like strength room
- a study/academic room
- a reading library
- a travel and adventure room
- a creative arts studio
- a practical skills workshop

### Camera controls

- **Overview mode** — orbit around the scene, zoom in/out, pan and inspect rooms from above
- **Room focus** — click a room to focus the camera on it with a closer view; click "Reset camera" to return to overview

### Object interactions

Many room objects are clickable. When you click an object, LifeOS shows an interaction card with:

- object title
- short description
- related category context

Examples of interactive objects include:

- life core crystal
- bed / recovery station
- desks
- potion shelf
- sports props
- dumbbells
- kitchen counter
- fruit bowl
- meditation orb
- vanity / self-care props
- easel
- study board
- suitcase / travel props
- stage and microphone
- bookshelves
- language board
- creator desk
- ring light
- tool bench
- first aid kit
- skill pedestals in the central hub

### First-person mode (experimental)

First-person exploration code is implemented but not yet wired to a UI toggle. The controller supports:

- pointer lock on scene click
- `W / A / S / D` or arrow keys to move
- mouse look with pitch/yaw
- hold `Shift` to sprint
- bounded movement within the scene area
- stylized animated hands

This mode can be activated programmatically via the store's `setCameraMode('firstPerson')` action and will be exposed in the UI in a future update.

## Asset Handling

### Local poster assets

Poster-style imagery is downloaded into the local project under `src/assets/`:

- `pixabay-gym.jpg`
- `pixabay-library.jpg`
- `pixabay-travel-map.jpg`
- `pixabay-art-supplies.jpg`

These assets are available locally but are not yet wired into room wall textures. A centralized poster module (`src/assets/posters.ts`) is planned but not yet created.

### Deferred download spec

If asset downloading is blocked or rate-limited, see:

- `src/assets/pixabay-download-spec.md`

That file documents intended asset choices, fallback download plan, and validation requirements.

## Project Structure

### Key files

- `src/App.tsx`
  App shell, canvas setup, UI overlay, camera focus logic, theme toggling, avatar evolution trigger

- `src/main.tsx`
  React entry point

- `src/store.ts`
  Global game state with Zustand + persist middleware, onboarding, skills, vices, quests, wishlist, collectibles, camera mode, interactions

- `src/index.css`
  Global styles with Tailwind

### UI components

- `src/components/CharacterCard.tsx`
  RPG character card with level, EXP, HP, potions, avatar

- `src/components/StatsPanel.tsx`
  Category-grouped stats, skill levels, theme toggle, skills modal trigger

- `src/components/SkillsModal.tsx`
  Detailed skill view with vice management and level titles

- `src/components/QuestList.tsx`
  Quest management, completion, and custom quest creation

- `src/components/Wishlist.tsx`
  Savings goals with progress tracking

- `src/components/Onboarding.tsx`
  3-step onboarding wizard

- `src/components/AvatarEvolution.tsx`
  AI avatar generation via Google Gemini

- `src/components/Room.tsx`
  Top-level 3D scene composition, room mounting, lights, interaction overlay

### Room system modules

- `src/components/room/types.ts`
  Shared scene and room types

- `src/components/room/constants.ts`
  Room metadata, interaction copy, camera defaults, world bounds

- `src/components/room/RoomShell.tsx`
  Shared room envelope, wall/floor shell, room title header, hover tooltip behavior

- `src/components/room/RoomPrimitives.tsx`
  Reusable scene primitives and interactive wrappers such as:
  - plants
  - desks
  - shelves
  - book stacks
  - dumbbells
  - balls
  - cones
  - framed meters
  - potions
  - skill pedestals
  - interactive object wrappers with click cards and sparkle effects

- `src/components/room/FirstPersonController.tsx`
  Walking controller, pointer lock behavior, mouse look, movement bounds

- `src/components/room/Hands.tsx`
  Stylized visible first-person hands with movement sway

- `src/components/room/SceneLayout.tsx`
  Hallways, central hub, ambient decor, shared scene layout helpers

### Extracted room components

- `src/components/room/rooms/BedroomCore.tsx`
- `src/components/room/rooms/SportsGamesRoom.tsx`
- `src/components/room/rooms/FitnessRoom.tsx`
- `src/components/room/rooms/DietRoom.tsx`
- `src/components/room/rooms/MentalHealthRoom.tsx`
- `src/components/room/rooms/SelfCareRoom.tsx`
- `src/components/room/rooms/ArtsRoom.tsx`
- `src/components/room/rooms/AcademicsRoom.tsx`
- `src/components/room/rooms/LifeExperiencesRoom.tsx`
- `src/components/room/rooms/PerformativeArtsRoom.tsx`
- `src/components/room/rooms/ReadingBooksRoom.tsx`
- `src/components/room/rooms/LanguageLearningRoom.tsx`
- `src/components/room/rooms/SocialMediaRoom.tsx`
- `src/components/room/rooms/PracticalSkillsRoom.tsx`

Each room lives in its own file for reuse and easier iteration, while shared structure stays centralized in `RoomShell.tsx` and reusable props stay in `RoomPrimitives.tsx`.

### Assets

- `src/assets/pixabay-gym.jpg`
- `src/assets/pixabay-library.jpg`
- `src/assets/pixabay-travel-map.jpg`
- `src/assets/pixabay-art-supplies.jpg`
- `src/assets/pixabay-download-spec.md`

## Interaction Model

Scene interactions are data-backed. The store tracks:

- focused room (for camera positioning)
- selected scene interaction

This supports future growth like:

- richer modal content
- quest triggers from object interactions
- room-specific action buttons
- mini activities inside rooms

## Data Persistence

All game state is persisted to `localStorage` via Zustand's persist middleware under the key `lifeos-storage`. This includes skills, quests, wishlist, vices, onboarding state, theme preference, and more.

## Development

### Prerequisites

- Node.js
- A `GEMINI_API_KEY` in your environment (optional, for AI avatar generation)

### Install dependencies

```sh
npm install
```

### Run development server

```sh
npm run dev
```

The dev server runs on port 3000 by default.

### Build for production

```sh
npm run build
```

### Type-check

```sh
npm run lint
```

### Preview production build

```sh
npm run preview
```

## Tech Stack

- **React 19** — UI framework
- **Three.js** + **React Three Fiber** + **Drei** — 3D rendering
- **Zustand** — state management with localStorage persistence
- **Framer Motion** — UI animations
- **Tailwind CSS v4** — styling
- **Lucide React** — icons
- **Google Gemini AI** — avatar generation
- **Vite** — build tool
- **TypeScript** — type safety

## Design Notes

### Why split room logic?

The room scene was becoming too large to maintain in a single file. Splitting reusable scene elements helps with:

- readability
- iteration speed
- testing and debugging
- adding new rooms without duplicating too much code
- keeping interaction behavior consistent

### Why clickable objects?

Clickable objects turn decorative props into meaningful UI. Instead of just seeing a bed, desk, bookshelf, or ring light, you can inspect what each one represents in your system of growth.

### Why AI avatar evolution?

Generating a new avatar when you level up makes progression feel tangible and personal. Seeing your character visually change as you improve is a powerful motivator.

## Known Limitations

- first-person mode is implemented but not yet exposed via a UI toggle
- poster/texture images exist locally but are not yet applied as room wall textures
- `src/assets/posters.ts` (centralized poster module) is planned but not yet created
- first-person hands are stylized mesh hands, not detailed character hands
- movement bounds are simple scene bounds, not full collision geometry
- some interactions are informational only and do not trigger gameplay actions yet
- `express` and `dotenv` are listed as dependencies but not currently used in the app

## Future Improvements

Potential next steps:

- expose first-person mode via a UI toggle button or keyboard shortcut
- wire poster textures into room walls via a centralized poster module
- data-driven room registration so `Room.tsx` can map configs directly to room components
- better collision handling in first-person mode
- object-specific actions, not just descriptions
- audio and ambient room sound
- animated NPCs or avatars in the campus
- richer hand/character body representation in first person
- room-specific quest boards and actionable stations
- minimap or teleport navigation between rooms
- remove unused dependencies (`express`, `dotenv`)

## Philosophy

LifeOS is not just about tracking habits. It is about making your growth visible.

By turning your goals into spaces, stations, rooms, and systems, LifeOS helps you experience progress as something you can walk through, inspect, and improve intentionally.