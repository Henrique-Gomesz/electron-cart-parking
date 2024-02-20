import mongoose from 'mongoose'
import { DocumentModel } from './model-interface'

export interface MonthlyDebts extends DocumentModel {
  cartId: mongoose.Types.ObjectId
  paymentDate: Date
}

export const MonthlyDebtsSchema = new mongoose.Schema(
  {
    cartId: { type: mongoose.Types.ObjectId, required: true, ref: 'Cart' },
    paymentDate: { type: Date, required: false, default: null }
  },
  { timestamps: true }
)

export const MonthlyDebtsModel = mongoose.model('MonthlyDebts', MonthlyDebtsSchema, 'monthlyDebts')
