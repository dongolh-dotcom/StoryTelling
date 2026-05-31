// src/types.ts
export interface User {
  id: string;
  username: string;
  name: string;
  password: string;
  createdAt: string;
  avatar?: string; 
}

export interface Comment {
  id: string;
  storyId: string;
  userId: string;
  username: string;
  text: string;
  createdAt: string;
}

export interface Story {
  id: string;
  title: string;
  opening: string;
  author: string;
  username: string;
  userId: string;
  createdAt: string;
  continues: number;
  likes: number;
  continuations: string[];
  comments?: Comment[];
}