import mongoose from 'mongoose'
import { DocumentModel } from './model-interface'

export interface Cart extends DocumentModel {
  personId: mongoose.Types.ObjectId
  name: string
}

export const CartSchema = new mongoose.Schema<Cart>(
  {
    personId: mongoose.Types.ObjectId,
    name: { type: String, required: true }
  },
  { timestamps: true }
)

export const CartModel = mongoose.model<Cart>('Cart', CartSchema, 'cart')
