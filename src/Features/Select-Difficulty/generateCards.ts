import { SelectDifficultyImages } from "./Assets/SelectDifficultyImages";
const { easy, medium, hard } = SelectDifficultyImages;

import type { CardType } from "Components/CardSwiper/CardType";

export function generateCards(): CardType[] {
  return [
    {
      id: 1,
      image: easy,
      text: "Uma jornada tranquila para quem está começando. Menos pressão, foco total e aprendizado",
      title: "Fácil",
    },
    {
      id: 2,
      image: medium,
      text: " O desafio equilibrado. Aqui as questões exigem mais atenção para manter suas vidas e progredir nas unidades",
      title: "Médio",
    },
    {
      id: 3,
      image: hard,
      text: "Questões complexas e ritmo acelerado para quem quer conquistar as recompensas mais altas do ranking",
      title: "Difícil",
    },
  ];
}
