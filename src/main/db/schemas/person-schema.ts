import mongoose from 'mongoose';
import { DocumentModel } from './model-interface';

export interface Person extends DocumentModel {
  name: string;
  document: string;
  telephone: string;
  active: boolean;
}

export const PersonSchema = new mongoose.Schema<Person>(
  {
    name: { type: String, required: true },
    document: { type: String, required: true, unique: true },
    telephone: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const PersonModel = mongoose.model('Person', PersonSchema, 'person');
