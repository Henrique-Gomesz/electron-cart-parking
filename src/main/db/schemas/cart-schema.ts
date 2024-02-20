import mongoose from 'mongoose'
import { DocumentModel } from './model-interface'

export interface Cart extends DocumentModel {
  personId: mongoose.Types.ObjectId
  name: string
}

export const CartSchema = new mongoose.Schema(
  {
    personId: { type: mongoose.Types.ObjectId, required: true, ref: 'Person' },
    name: { type: String, required: true }
  },
  { timestamps: true }
)

export const CartModel = mongoose.model('Cart', CartSchema, 'cart')
