export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin?: { name: string };
};
