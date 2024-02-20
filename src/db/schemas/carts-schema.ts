import mongoose from 'mongoose'

interface User {
  name: string;
  email: string;
  avatar?: string;
}


export const CartSchema = new mongoose.Schema(
  {
    personId: mongoose.Types.ObjectId,
    name: String
  },
  { timestamps: true }
)

export const Cart = mongoose.model('Cart', CartSchema)
