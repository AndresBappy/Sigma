export type backgroundType = 'plain' | 'image';

export interface Bet {
  id: number;
  title: string;
  dates?: string;
  icon?: string;
  fill?: string;
  background?: string;
  description?: string;
  optionA?: string;
  optionAImage?: string;
  optionB?: string;
  optionBImage?: string;
  color?: string;
  type?: backgroundType;
  primary?: string;
  primaryIcon?: string;
  secondary?: string;
  secondaryIcon?: string;
}
