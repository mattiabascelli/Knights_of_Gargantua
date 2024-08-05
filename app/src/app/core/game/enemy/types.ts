export type Enemy = {
  name: string;
  level: number;
  health: number;
  healthCap: number;
  armor: number;
  damage: number;
  image: {
    idle: string;
    defending: string;
  };
};
