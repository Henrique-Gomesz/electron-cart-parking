import mongoose from 'mongoose';

interface Timestamp {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DocumentModel extends mongoose.Document, Timestamp {}
