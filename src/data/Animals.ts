export interface Animal {
  id: number;
  name: string;
  age: string;
  type: string;
}

export const animals: Animal[] = [
  { id: 1, name: "Rex", age: "2 anos", type: "Cachorro" },
  { id: 2, name: "Mimi", age: "1 ano", type: "Gato" },
  { id: 3, name: "Bolt", age: "3 anos", type: "Cachorro" },
];
