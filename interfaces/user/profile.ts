import { ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId;
  name: string;
  lastname: string;
  email: string;
  avatar?: string;
  friends?: ObjectId[];
  handle?: string;
  createdAt: number;
  updatedAt: number;
}
