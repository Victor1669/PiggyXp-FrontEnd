import { SplashScreenImages } from "@Assets/SwiperImages";

import { CardType } from "@Components/CardSwiper/CardType";

const { caminhos, estudante, entendendoDinheiro } = SplashScreenImages;

export const cards: CardType[] = [
  {
    id: 1,
    title: "Aprender é transformar.",
    text: "Pequenos conhecimentos geram grandes mudanças nas suas escolhas e no seu futuro.",
    image: estudante,
  },
  {
    id: 2,
    title: "Conhecimento muda escolhas.",
    text: "Quando você aprende, suas escolhas ficam mais inteligentes.",
    image: caminhos,
  },
  {
    id: 3,
    title: "Entenda o dinheiro. Controle o futuro",
    text: "Saber lidar com dinheiro hoje evita problemas amanhã.",
    image: entendendoDinheiro,
  },
];
