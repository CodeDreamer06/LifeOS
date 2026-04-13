# Deferred Pixabay Asset Download Spec

## Context

The app currently references Pixabay-hosted image URLs directly inside the 3D room experience. That causes runtime failures when the remote image host rate-limits requests. The fix is to replace all remote Pixabay image usage with locally downloaded assets stored in the repository and imported by the app.

I attempted the download flow and hit rate-limited responses for the selected assets, so this file records the intended implementation plan and chosen asset targets for later execution.

## Goals

- Eliminate direct runtime dependence on Pixabay image URLs.
- Download selected Pixabay images into `src/assets/`.
- Replace string URL references in room rendering code with static local imports.
- Expand the number of environmental objects in rooms for visual richness.
- Add first-person navigation with walking controls.
- Add visible hands in first-person mode.
- Add click interactions for room objects.
- Split the large room implementation into reusable components.
- Update `README.md` to document the new architecture and controls.

---

## Selected Pixabay Assets To Download

### 1. Gym / fitness poster
- Intended filename: `src/assets/pixabay-gym.jpg`
- Candidate URL:
  - `https://pixabay.com/get/g830224e1d23ff5c4819e602336990fa60324bf2e5b8c027b13da82e7811c9d3c371511dbde73dc87f0c1986884ade16be7a3bbde6283bd667c855dc2810ed46f_640.jpg`
- Intended usage:
  - `SportsGamesRoom`
  - `FitnessRoom`

### 2. Library / books poster
- Intended filename: `src/assets/pixabay-library.jpg`
- Candidate URL:
  - `https://pixabay.com/get/g9393c72349d529a7ab18106d5bc02df8c1f8b03e7c87e393771aabacebfc6917af39af913087e2b418b3e9b689e347683849de837c5b9beba1f2f2d2f6f1eb50_640.jpg`
- Intended usage:
  - `DietRoom` fallback inspiration board if desired
  - `AcademicsRoom`
  - `ReadingBooksRoom`
  - `PracticalSkillsRoom`

### 3. Travel / world map poster
- Intended filename: `src/assets/pixabay-travel-map.jpg`
- Candidate URL:
  - `https://pixabay.com/get/gf3fa97fc22965e55268a58ca186332c1148c43961cc2c7110448563e379732c96f6c40b86586b6d47a45bd57cdfd73a61e2d0a32e11e5abc0cb4e24bd732e6d5_640.jpg`
- Intended usage:
  - `MentalHealthRoom`
  - `LifeExperiencesRoom`
  - `LanguageLearningRoom`

### 4. Art supplies / creative poster
- Intended filename: `src/assets/pixabay-art-supplies.jpg`
- Candidate URL:
  - `https://pixabay.com/get/g50ac09a5196f10cb3dd9dd6a7d1c718ceff5f8e7a18a5206e2727a6ed46f7db029198341131a99f7592fc8fbc3e3a549ace5335141f4f81ceaebcaee8c5efaa7_640.jpg`
- Intended usage:
  - `SelfCareRoom`
  - `ArtsRoom`
  - `PerformativeArtsRoom`
  - `SocialMediaRoom`

---

## Download Requirements

When retries are performed later:

1. Create `src/assets/` if it does not already exist.
2. Download each selected Pixabay image to the filenames listed above.
3. Verify files are real image binaries and not rate-limit/error HTML payloads.
4. If a URL still returns a rate-limit response:
   - try a different Pixabay result for the same theme
   - keep the local filename target stable if possible
5. Do not leave remote Pixabay URLs in runtime-rendered components.

### Validation checklist for each download
- File opens as a valid JPEG/PNG.
- File size is clearly larger than a tiny error payload.
- Asset renders properly in the browser build.
- No hotlinked Pixabay URL remains in the corresponding room component.

---

## Current Code Issues Identified

### Remote URL dependency
The room implementation uses a `PIXABAY_POSTERS` constant with direct external URLs. Those should be removed.

### Monolithic room file
`src/components/Room.tsx` is very large and contains:
- primitive scene helpers
- room shell logic
- room-specific layouts
- environment decor
- main scene composition

This should be split for maintainability.

### Skill-name mismatch risk
The onboarding skill names include:
- `Fitness`
- `Diet`
- `Mental Health`
- `Self-Care`
- `Arts`
- `Academics`
- `Life Experiences`
- `Performative Arts`
- `Reading Books`
- `Language Learning`
- `Practical Skills`

The room scene resolves rooms by exact skill name matching, so any rename must stay aligned across onboarding/store/scene configuration.

---

## Planned Refactor

## 1. Asset module

Create a dedicated asset export file, for example:

- `src/assets/posters.ts`

Responsibility:
- import local image files
- export a typed poster map for room usage

Suggested shape:
- `sports`
- `books`
- `travel`
- `art`

This replaces the in-file remote URL constant.

---

## 2. Split room code into reusable modules

Suggested structure:

- `src/components/room/types.ts`
- `src/components/room/constants.ts`
- `src/components/room/RoomShell.tsx`
- `src/components/room/RoomPrimitives.tsx`
- `src/components/room/InteractiveObject.tsx`
- `src/components/room/FirstPersonController.tsx`
- `src/components/room/Hands.tsx`
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
- `src/components/room/SceneLayout.tsx`
- `src/components/Room.tsx`

### Responsibility split
- `Room.tsx`: top-level composition only
- `RoomShell.tsx`: room envelope, title, hover behavior
- `RoomPrimitives.tsx`: `Poster`, `Desk`, `Plant`, `BookStack`, `Dumbbell`, `Ball`, `Cone`, `FramedMeter`, `Label`, `Tooltip`, etc.
- `SceneLayout.tsx`: hallways, central hub, ambient decor
- `rooms/*`: each room owns only its own visual layout
- `InteractiveObject.tsx`: shared click/hover behavior and metadata
- `FirstPersonController.tsx`: walk/look controls and collision constraints
- `Hands.tsx`: simple stylized hand meshes attached to the first-person camera

---

## 3. First-person mode

## Desired behavior
Add a toggle between:
- orbit/campus overview mode
- first-person walk mode

## Controls
Suggested controls:
- `V` to toggle first-person view
- `W/A/S/D` to move
- mouse drag or pointer lock to look around
- `Shift` to move faster
- `Esc` to exit pointer lock
- optional on-screen button for mobile/non-keyboard discoverability

## Camera behavior
- First-person camera height around `1.6`
- Smooth movement and look sensitivity
- Clamp vertical look angle to avoid flipping
- Disable `OrbitControls` while in first-person mode
- Keep the user above the floor plane
- Add soft collision boundaries so you cannot walk through walls and large props

## Hands
Visible hands should:
- appear only in first-person mode
- be attached near the camera frustum
- sway subtly while walking
- optionally bob with movement speed
- be simple stylized meshes if no hand model is available

Implementation note:
- use two grouped meshes parented to a camera-follow rig
- animate with elapsed time and movement velocity

---

## 4. Click interactions for room objects

## Interaction model
Add reusable click interaction support for notable objects:
- posters
- bed
- desk
- book stacks
- dumbbells
- plants
- globe / stage / ring light / tool bench / shelves / potions / core crystal

## Expected interaction UX
On hover:
- cursor changes
- object highlights subtly
- tooltip or label appears

On click:
- show lightweight info card/modal/popover
- display title + short description + optional related skill/category
- optionally trigger tiny reward/ambient response for some items

## Example interaction copy
- Bed: "Recovery station — sleep and consistency power long-term growth."
- Desk: "Focus desk — where plans become completed quests."
- Dumbbell rack: "Strength station — build discipline through reps."
- Book shelf: "Knowledge archive — reading compounds over time."
- Travel board: "Adventure wall — collect future destinations."
- Life core crystal: "Life Core — your account level and growth energy."

## Suggested implementation
Add an interaction state store or local scene state:
- selected object id
- selected object title
- selected object description
- related skill id/category
- screen position or modal open flag

A shared wrapper component should support:
- hover state
- click handler
- highlight material adjustments
- metadata payload

---

## 5. Add more room objects

The scene needs more density than it currently has. Add more props per room so spaces feel lived-in.

## Suggested additional objects by room

### BedroomCore
- rug
- wall shelves
- alarm clock
- side table
- window
- framed certificates
- laundry basket
- hanging lamp

### SportsGamesRoom
- tennis racket
- basketball stand
- scoreboard panel
- wall jersey
- kettlebells
- water bottles
- yoga mat roll
- training timer

### FitnessRoom
- squat rack
- weight plates
- resistance bands
- bench attachments
- medicine balls
- mirrors
- towel hooks
- shaker bottles

### DietRoom
- fruit bowl
- cutting board
- stovetop props
- pantry shelves
- blender
- meal containers
- spice rack
- recipe board

### MentalHealthRoom
- journal pile
- floor cushions
- candles
- incense holder
- tea set
- diffuser
- calming wall art
- sound bowl

### SelfCareRoom
- towels
- vanity stool
- perfume bottles
- skincare tray
- robe hook
- plant stand
- soft lamp
- mirror accessories

### ArtsRoom
- extra easels
- canvases stacked on wall
- brush jars
- paint palette
- speaker
- sketchbooks
- sculpture pedestal
- drying rack

### AcademicsRoom
- microscope props
- notebook stacks
- calculator
- wall charts
- desk lamp
- filing drawers
- lab glassware
- pinned notes

### LifeExperiencesRoom
- suitcase stack
- passport board
- postcards
- trekking boots
- camera bag
- travel books
- lantern
- souvenir shelf

### PerformativeArtsRoom
- curtain details
- masks
- spotlight controls
- metronome
- instrument case
- practice mirrors
- juggling clubs
- applause meter

### ReadingBooksRoom
- ladder
- reading chair
- side lamp
- rug
- open books
- bookmarks
- catalog desk
- framed literary quotes

### LanguageLearningRoom
- word cards
- map pins
- dual-language books
- headphones
- whiteboard notes
- voice recorder setup
- flags
- flashcard boxes

### SocialMediaRoom
- tripod
- mic arm
- acoustic panels
- editing keyboard
- wall stats board
- softboxes
- memory cards
- creator shelf decor

### PracticalSkillsRoom
- toolbox
- wrench set
- first aid cabinet
- pegboard
- budgeting board
- measuring tape
- utility shelves
- safety manual stand

---

## 6. Data-driven room configuration

To reduce repetition, room definitions should move toward config-driven rendering.

Suggested config shape:
- `id`
- `skillName`
- `position`
- `title`
- `subtitle`
- `theme`
- `posterKey`
- `meterTitle`
- `decorFactory` or room component reference

This makes future room additions easier and lowers duplication.

---

## 7. App-level integration changes

## `App.tsx`
Add state for camera mode:
- `overview`
- `firstPerson`

Required behaviors:
- render orbit controls only in overview mode
- mount first-person controller only in first-person mode
- add UI button to switch modes
- optionally show controls helper overlay in first-person mode

## Store considerations
A small UI/camera state can be added to the central store if desired:
- `cameraMode`
- `selectedRoomObject`
- actions for toggling mode and selecting objects

This is optional; local component state is also acceptable if kept organized.

---

## 8. README updates required

`README.md` should be updated to document:

### New features
- first-person exploration mode
- reusable room architecture
- clickable room objects
- local poster asset strategy
- expanded decorative object system

### Controls
- orbit overview controls
- first-person controls
- interaction click behavior
- keyboard shortcuts

### Project structure
Document the split room component architecture and asset location.

### Asset policy
State clearly:
- poster images are stored locally in `src/assets/`
- runtime should not hotlink to Pixabay
- Pixabay attribution/license handling should be reviewed as needed by the project owner

### Known limitations
- first-person hands are stylized placeholders unless upgraded later
- collisions are approximate
- some object interactions may be informational only

---

## Acceptance Criteria

A future implementation should be considered complete when all of the following are true:

- No room poster uses a direct Pixabay URL at runtime.
- Local image assets exist and load successfully.
- The room code is split into reusable files/modules.
- The app supports switching between overview and first-person mode.
- The user can walk around in first-person mode.
- Visible hands appear in first-person mode and animate subtly.
- Major room props support click interactions.
- Rooms contain noticeably more objects than before.
- `README.md` documents controls, architecture, and asset handling.
- Build passes successfully.

---

## Fallback If Pixabay Continues To Rate-Limit

If the same assets remain unavailable later:

1. Keep this spec as the source of truth.
2. Search again for equivalent Pixabay alternatives by theme:
   - gym
   - books/library
   - travel/map
   - art supplies
3. Download new alternatives locally.
4. Preserve the local import approach even if exact image choices change.

---

## Notes

- `src/assets/` already exists or should be created before retries.
- Previous download attempts returned tiny non-image payloads consistent with rate limiting.
- Do not trust successful HTTP completion alone; verify file contents.