import mongoose from 'mongoose'

export const MonthlyDebtsSchema = new mongoose.Schema(
  {
    cartId: mongoose.Types.ObjectId,
    paymentDate: Date
  },
  { timestamps: true }
)
