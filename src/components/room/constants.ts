import type { RoomConfig, SceneInteraction, SkillDescriptor } from "./types";

export const ROOM_WORLD_BOUNDS = {
  minX: -42,
  maxX: 42,
  minZ: -24,
  maxZ: 40,
} as const;

export const FIRST_PERSON_DEFAULTS = {
  movementSpeed: 8,
  sprintMultiplier: 1.65,
  mouseSensitivity: 0.0022,
  height: 1.62,
} as const;

export const ROOM_CONFIGS: RoomConfig[] = [
  {
    id: "bedroom-core",
    title: "Life Core Bedroom",
    subtitle: "Your home base",
    icon: "💚",
    position: [0, 0, 0],
    theme: {
      color: "#22c55e",
      floorColor: "#dbeafe",
      wallColor: "#bfdbfe",
    },
  },
  {
    id: "sports-games",
    skillName: "Sports & Games",
    title: "Sports & Games",
    subtitle: "Speed, play, and discipline",
    icon: "🏃",
    position: [-16, 0, -14],
    meterTitle: "Athletic Energy",
    theme: {
      color: "#f97316",
      floorColor: "#fde68a",
      wallColor: "#fef3c7",
    },
  },
  {
    id: "fitness",
    skillName: "Fitness",
    title: "Fitness",
    subtitle: "Strength and consistency",
    icon: "💪",
    position: [0, 0, -14],
    meterTitle: "Strength",
    theme: {
      color: "#22c55e",
      floorColor: "#d1fae5",
      wallColor: "#a7f3d0",
    },
  },
  {
    id: "diet",
    skillName: "Diet",
    title: "Diet",
    subtitle: "Fuel your growth",
    icon: "🥗",
    position: [16, 0, -14],
    meterTitle: "Healthy Habits",
    theme: {
      color: "#84cc16",
      floorColor: "#fef9c3",
      wallColor: "#ecfccb",
    },
  },
  {
    id: "mental-health",
    skillName: "Mental Health",
    title: "Mental Health",
    subtitle: "Calm, reflection, resilience",
    icon: "🧠",
    position: [-16, 0, 0],
    meterTitle: "Inner Balance",
    theme: {
      color: "#8b5cf6",
      floorColor: "#ede9fe",
      wallColor: "#ddd6fe",
    },
  },
  {
    id: "self-care",
    skillName: "Self-Care",
    title: "Self-Care",
    subtitle: "Recharge and restore",
    icon: "✨",
    position: [0, 0, 0],
    meterTitle: "Recharge",
    theme: {
      color: "#ec4899",
      floorColor: "#fce7f3",
      wallColor: "#fbcfe8",
    },
  },
  {
    id: "arts",
    skillName: "Arts",
    title: "Arts",
    subtitle: "Create something beautiful",
    icon: "🎨",
    position: [16, 0, 0],
    meterTitle: "Creativity",
    theme: {
      color: "#f43f5e",
      floorColor: "#ffe4e6",
      wallColor: "#fecdd3",
    },
  },
  {
    id: "academics",
    skillName: "Academics",
    title: "Academics",
    subtitle: "Study and synthesis",
    icon: "🔬",
    position: [-16, 0, 14],
    meterTitle: "Study Power",
    theme: {
      color: "#3b82f6",
      floorColor: "#dbeafe",
      wallColor: "#bfdbfe",
    },
  },
  {
    id: "life-experiences",
    skillName: "Life Experiences",
    title: "Life Experiences",
    subtitle: "Adventure and curiosity",
    icon: "🌍",
    position: [0, 0, 14],
    meterTitle: "Adventure",
    theme: {
      color: "#14b8a6",
      floorColor: "#ccfbf1",
      wallColor: "#99f6e4",
    },
  },
  {
    id: "performative-arts",
    skillName: "Performative Arts",
    title: "Performative Arts",
    subtitle: "Confidence on display",
    icon: "🎭",
    position: [16, 0, 14],
    meterTitle: "Performance",
    theme: {
      color: "#eab308",
      floorColor: "#fef3c7",
      wallColor: "#fde68a",
    },
  },
  {
    id: "reading-books",
    skillName: "Reading Books",
    title: "Reading Books",
    subtitle: "Compound knowledge daily",
    icon: "📚",
    position: [-32, 0, 0],
    meterTitle: "Reading Flow",
    theme: {
      color: "#6366f1",
      floorColor: "#ede9fe",
      wallColor: "#c7d2fe",
    },
  },
  {
    id: "language-learning",
    skillName: "Language Learning",
    title: "Language Learning",
    subtitle: "Words unlock worlds",
    icon: "🗣️",
    position: [-32, 0, 14],
    meterTitle: "Vocabulary",
    theme: {
      color: "#4f46e5",
      floorColor: "#e0e7ff",
      wallColor: "#c7d2fe",
    },
  },
  {
    id: "social-media",
    skillName: "Social Media Creation",
    title: "Social Media Creation",
    subtitle: "Create, edit, publish",
    icon: "📱",
    position: [32, 0, 0],
    meterTitle: "Audience",
    theme: {
      color: "#0ea5e9",
      floorColor: "#e0f2fe",
      wallColor: "#bae6fd",
    },
  },
  {
    id: "practical-skills",
    skillName: "Practical Skills",
    title: "Practical Skills",
    subtitle: "Useful systems for life",
    icon: "🛠️",
    position: [32, 0, 14],
    meterTitle: "Capability",
    theme: {
      color: "#475569",
      floorColor: "#e2e8f0",
      wallColor: "#cbd5e1",
    },
  },
  {
    id: "central-hub",
    title: "Skill Campus Hub",
    subtitle: "Your growth map",
    icon: "🌀",
    position: [0, 0, 30],
    theme: {
      color: "#60a5fa",
      floorColor: "#e0f2fe",
      wallColor: "#bae6fd",
    },
  },
];

type InteractionSeed = Omit<SceneInteraction, "id"> & { key: string };

const interaction = (key: string, seed: Omit<SceneInteraction, "id">): SceneInteraction => ({
  id: key,
  ...seed,
});

export const SCENE_INTERACTIONS = {
  lifeCore: interaction("life-core", {
    title: "Life Core",
    description:
      "Your central growth crystal. It reflects your overall LifeOS level and the energy of your current momentum.",
    category: "system",
  }),
  bed: interaction("bed", {
    title: "Recovery Station",
    description:
      "Sleep, recovery, and consistency are the hidden multipliers behind every long-term goal.",
    category: "mentalHealth",
  }),
  desk: interaction("desk", {
    title: "Focus Desk",
    description:
      "This is where plans become quests, and quests become visible progress.",
    category: "productivity",
  }),
  potionShelf: interaction("potion-shelf", {
    title: "Potion Shelf",
    description:
      "Emergency recovery supplies. Potions help you reset after setbacks and keep your streak alive.",
    category: "system",
  }),
  plant: interaction("plant", {
    title: "Growth Plant",
    description:
      "A reminder that steady care beats bursts of intensity. Growth compounds quietly.",
    category: "wellbeing",
  }),
  dumbbell: interaction("dumbbell", {
    title: "Strength Station",
    description:
      "Discipline is built rep by rep. What feels heavy today becomes normal through repetition.",
    category: "fitness",
  }),
  sportsBall: interaction("sports-ball", {
    title: "Practice Ball",
    description:
      "Play keeps training fun. Skill grows faster when practice feels alive instead of purely obligatory.",
    category: "fitness",
  }),
  cone: interaction("training-cone", {
    title: "Agility Marker",
    description:
      "Small drills build quickness, coordination, and the habit of showing up for fundamentals.",
    category: "fitness",
  }),
  kitchenCounter: interaction("kitchen-counter", {
    title: "Nutrition Counter",
    description:
      "Better food choices reduce friction across the rest of your life. Energy is a strategic resource.",
    category: "fitness",
  }),
  fruitBowl: interaction("fruit-bowl", {
    title: "Fruit Bowl",
    description:
      "Visible healthy defaults make good decisions easier when motivation is low.",
    category: "fitness",
  }),
  meditationOrb: interaction("meditation-orb", {
    title: "Calm Focus Orb",
    description:
      "Stillness is a skill. Reflection helps you respond instead of reacting on autopilot.",
    category: "mentalHealth",
  }),
  journalDesk: interaction("journal-desk", {
    title: "Journaling Desk",
    description:
      "Writing clarifies thoughts, reduces mental noise, and reveals patterns you can actually change.",
    category: "mentalHealth",
  }),
  vanity: interaction("vanity", {
    title: "Self-Care Vanity",
    description:
      "Rituals matter. Small acts of care can stabilize mood, identity, and consistency.",
    category: "mentalHealth",
  }),
  bathPod: interaction("bath-pod", {
    title: "Recharge Pod",
    description:
      "Rest and restoration are productive when they help you return stronger and more present.",
    category: "mentalHealth",
  }),
  easel: interaction("easel", {
    title: "Creative Easel",
    description:
      "Art improves by making more art. Output comes before refinement.",
    category: "arts",
  }),
  paintDesk: interaction("paint-desk", {
    title: "Paint Desk",
    description:
      "A workspace stocked with tools lowers the barrier between inspiration and action.",
    category: "arts",
  }),
  chalkboard: interaction("chalkboard", {
    title: "Study Board",
    description:
      "Concepts become useful when you revisit them often enough to explain them simply.",
    category: "reading",
  }),
  academicDesk: interaction("academic-desk", {
    title: "Research Desk",
    description:
      "Focused study sessions turn abstract goals into concrete intellectual leverage.",
    category: "reading",
  }),
  suitcase: interaction("suitcase", {
    title: "Adventure Kit",
    description:
      "Preparedness expands spontaneity. The more ready you are, the easier it is to say yes to experience.",
    category: "travel",
  }),
  compassTable: interaction("compass-table", {
    title: "Compass Table",
    description:
      "Direction matters as much as effort. Choose destinations that make your life feel larger.",
    category: "travel",
  }),
  stage: interaction("stage", {
    title: "Performance Stage",
    description:
      "Confidence grows in public repetitions. Expression becomes natural after enough brave reps.",
    category: "arts",
  }),
  microphone: interaction("microphone", {
    title: "Microphone",
    description:
      "Your voice gets stronger the more often you use it with intention.",
    category: "arts",
  }),
  bookshelf: interaction("bookshelf", {
    title: "Knowledge Archive",
    description:
      "Books hold compressed years of other people's experience. A shelf is basically stored perspective.",
    category: "reading",
  }),
  readingChair: interaction("reading-chair", {
    title: "Reading Nook",
    description:
      "Comfortable environments help long-form attention survive in a distracted world.",
    category: "reading",
  }),
  languageBoard: interaction("language-board", {
    title: "Language Board",
    description:
      "Vocabulary becomes fluency through repetition, context, and speaking before you feel ready.",
    category: "reading",
  }),
  creatorDesk: interaction("creator-desk", {
    title: "Creator Desk",
    description:
      "Publishing regularly beats waiting for perfect ideas. Consistency builds audience trust.",
    category: "social",
  }),
  ringLight: interaction("ring-light", {
    title: "Ring Light",
    description:
      "Presentation matters. Better lighting makes your ideas easier to notice and share.",
    category: "social",
  }),
  toolBench: interaction("tool-bench", {
    title: "Tool Bench",
    description:
      "Practical skills create independence. Useful systems reduce chaos and increase confidence.",
    category: "practical",
  }),
  firstAidKit: interaction("first-aid-kit", {
    title: "First Aid Kit",
    description:
      "Preparedness is a form of care. Knowing basic response skills makes you more capable in real life.",
    category: "practical",
  }),
  hubPedestal: interaction("hub-pedestal", {
    title: "Skill Pedestal",
    description:
      "Each pedestal represents a part of your life that can be deliberately trained instead of left to chance.",
    category: "system",
  }),
} as const satisfies Record<string, SceneInteraction>;

export const INTERACTION_COPY_BY_ROOM: Record<string, SceneInteraction[]> = {
  "bedroom-core": [
    SCENE_INTERACTIONS.lifeCore,
    SCENE_INTERACTIONS.bed,
    SCENE_INTERACTIONS.desk,
    SCENE_INTERACTIONS.potionShelf,
    SCENE_INTERACTIONS.plant,
  ],
  "sports-games": [
    SCENE_INTERACTIONS.sportsBall,
    SCENE_INTERACTIONS.cone,
  ],
  fitness: [
    SCENE_INTERACTIONS.dumbbell,
  ],
  diet: [
    SCENE_INTERACTIONS.kitchenCounter,
    SCENE_INTERACTIONS.fruitBowl,
  ],
  "mental-health": [
    SCENE_INTERACTIONS.meditationOrb,
    SCENE_INTERACTIONS.journalDesk,
  ],
  "self-care": [
    SCENE_INTERACTIONS.vanity,
    SCENE_INTERACTIONS.bathPod,
  ],
  arts: [
    SCENE_INTERACTIONS.easel,
    SCENE_INTERACTIONS.paintDesk,
  ],
  academics: [
    SCENE_INTERACTIONS.chalkboard,
    SCENE_INTERACTIONS.academicDesk,
  ],
  "life-experiences": [
    SCENE_INTERACTIONS.suitcase,
    SCENE_INTERACTIONS.compassTable,
  ],
  "performative-arts": [
    SCENE_INTERACTIONS.stage,
    SCENE_INTERACTIONS.microphone,
  ],
  "reading-books": [
    SCENE_INTERACTIONS.bookshelf,
    SCENE_INTERACTIONS.readingChair,
  ],
  "language-learning": [
    SCENE_INTERACTIONS.languageBoard,
    SCENE_INTERACTIONS.academicDesk,
  ],
  "social-media": [
    SCENE_INTERACTIONS.creatorDesk,
    SCENE_INTERACTIONS.ringLight,
  ],
  "practical-skills": [
    SCENE_INTERACTIONS.toolBench,
    SCENE_INTERACTIONS.firstAidKit,
  ],
  "central-hub": [SCENE_INTERACTIONS.hubPedestal, SCENE_INTERACTIONS.plant],
};

export const ROOM_METER_TITLES: Partial<Record<string, string>> = {
  "Sports & Games": "Athletic Energy",
  Fitness: "Strength",
  Diet: "Healthy Habits",
  "Mental Health": "Inner Balance",
  "Self-Care": "Recharge",
  Arts: "Creativity",
  Academics: "Study Power",
  "Life Experiences": "Adventure",
  "Performative Arts": "Performance",
  "Reading Books": "Reading Flow",
  "Language Learning": "Vocabulary",
  "Social Media Creation": "Audience",
  "Practical Skills": "Capability",
};

export const HALLWAY_PLANT_POSITIONS: Array<[number, number, number]> = [
  [-24, 0, -7],
  [-8, 0, -7],
  [8, 0, -7],
  [24, 0, -7],
  [-24, 0, 7],
  [-8, 0, 7],
  [8, 0, 7],
  [24, 0, 7],
];

export const HUB_PEDESTAL_LIMIT = 6;

export const getRoomConfigBySkill = (skillName: string) =>
  ROOM_CONFIGS.find((room) => room.skillName === skillName);

export const getRoomConfigById = (roomId: string) =>
  ROOM_CONFIGS.find((room) => room.id === roomId);

export const getInteractionListForRoom = (roomId: string) =>
  INTERACTION_COPY_BY_ROOM[roomId] ?? [];

export const getMeterTitleForSkill = (skillName: string) =>
  ROOM_METER_TITLES[skillName] ?? "Progress";

export const toSkillDescriptorMap = (skills: SkillDescriptor[]) =>
  new Map(skills.map((skill) => [skill.name, skill]));
