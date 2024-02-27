import { ObjectId } from 'mongoose';

export interface SaveCart {
  personDocument: string;
  name: string;
}

export interface ListCart {
  id: ObjectId;
  personDocument: string;
  name: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
