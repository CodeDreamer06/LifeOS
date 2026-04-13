import { useMemo } from "react";
import { Box } from "@react-three/drei";
import { useGameStore } from "../store";
import FirstPersonController from "./room/FirstPersonController";
import { AmbientDecor, CentralHub, Hallways } from "./room/SceneLayout";
import type { SkillDescriptor } from "./room/types";
import BedroomCore from "./room/rooms/BedroomCore";
import SportsGamesRoom from "./room/rooms/SportsGamesRoom";
import FitnessRoom from "./room/rooms/FitnessRoom";
import DietRoom from "./room/rooms/DietRoom";
import MentalHealthRoom from "./room/rooms/MentalHealthRoom";
import SelfCareRoom from "./room/rooms/SelfCareRoom";
import ArtsRoom from "./room/rooms/ArtsRoom";
import AcademicsRoom from "./room/rooms/AcademicsRoom";
import LifeExperiencesRoom from "./room/rooms/LifeExperiencesRoom";
import PerformativeArtsRoom from "./room/rooms/PerformativeArtsRoom";
import ReadingBooksRoom from "./room/rooms/ReadingBooksRoom";
import LanguageLearningRoom from "./room/rooms/LanguageLearningRoom";
import SocialMediaRoom from "./room/rooms/SocialMediaRoom";
import PracticalSkillsRoom from "./room/rooms/PracticalSkillsRoom";

export default function Room() {
  const level = useGameStore((state) => state.level);
  const potions = useGameStore((state) => state.potions);
  const storeSkills = useGameStore((state) => state.skills);
  const cameraMode = useGameStore((state) => state.cameraMode);

  const skills = useMemo<SkillDescriptor[]>(
    () =>
      storeSkills.map((skill) => ({
        id: skill.id,
        name: skill.name,
        icon: skill.icon,
        category: skill.category,
        color: skill.color.includes("#") ? skill.color : "#60a5fa",
        level: skill.level ?? 1,
        exp: skill.exp,
        maxExp: skill.maxExp,
      })),
    [storeSkills],
  );

  const findSkill = (name: string) =>
    skills.find((skill) => skill.name === name);

  const sportsGames = findSkill("Sports & Games");
  const fitness = findSkill("Fitness");
  const diet = findSkill("Diet");
  const mentalHealth = findSkill("Mental Health");
  const selfCare = findSkill("Self-Care");
  const arts = findSkill("Arts");
  const academics = findSkill("Academics");
  const lifeExperiences = findSkill("Life Experiences");
  const performativeArts = findSkill("Performative Arts");
  const readingBooks = findSkill("Reading Books");
  const languageLearning = findSkill("Language Learning");
  const socialMediaCreation = findSkill("Social Media Creation");
  const practicalSkills = findSkill("Practical Skills");

  return (
    <group>
      <Box args={[100, 0.22, 90]} position={[0, -0.11, 8]} receiveShadow>
        <meshStandardMaterial color="#e7dcc8" />
      </Box>

      <Hallways />
      <AmbientDecor />

      <BedroomCore level={level} potions={potions} />

      {sportsGames && <SportsGamesRoom skill={sportsGames} />}
      {fitness && <FitnessRoom skill={fitness} />}
      {diet && <DietRoom skill={diet} />}
      {mentalHealth && <MentalHealthRoom skill={mentalHealth} />}
      {selfCare && <SelfCareRoom skill={selfCare} />}
      {arts && <ArtsRoom skill={arts} />}
      {academics && <AcademicsRoom skill={academics} />}
      {lifeExperiences && <LifeExperiencesRoom skill={lifeExperiences} />}
      {performativeArts && <PerformativeArtsRoom skill={performativeArts} />}
      {readingBooks && <ReadingBooksRoom skill={readingBooks} />}
      {languageLearning && <LanguageLearningRoom skill={languageLearning} />}
      {socialMediaCreation && <SocialMediaRoom skill={socialMediaCreation} />}
      {practicalSkills && <PracticalSkillsRoom skill={practicalSkills} />}

      <CentralHub skills={skills} />
      <FirstPersonController enabled={cameraMode === "firstPerson"} />

      <ambientLight intensity={0.62} />
      <directionalLight
        position={[18, 24, 12]}
        intensity={1.25}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
      />
      <pointLight position={[0, 8, 0]} intensity={0.5} color="#fff7ed" />
      <pointLight position={[0, 8, 30]} intensity={0.45} color="#dbeafe" />
    </group>
  );
}
