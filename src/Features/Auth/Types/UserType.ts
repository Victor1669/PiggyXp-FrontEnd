export interface UserType {
  id: number;
  name: string;
  email: string;
  user_img: string | undefined;
  xp: number;
  nivel: number;
  nivel_ph: number;
  coins: number;
  difficulty: number;
  first_login: boolean;
  lives: number;
  achievements: string;
  collectedAchievements: string;
  reset_lives_at: string;
  xpProximoNivel: number;
}

export interface PreviewUserType extends UserType {
  isPreview: true;
}
