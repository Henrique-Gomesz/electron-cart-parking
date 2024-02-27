import mongoose from 'mongoose';
import { DocumentModel } from './model-interface';

export interface Cart extends DocumentModel {
  personDocument: string;
  name: string;
  active: boolean;
}

export const CartSchema = new mongoose.Schema<Cart>(
  {
    personDocument: { type: String, required: true },
    name: { type: String, required: true },
    active: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const CartModel = mongoose.model<Cart>('Cart', CartSchema, 'cart');
