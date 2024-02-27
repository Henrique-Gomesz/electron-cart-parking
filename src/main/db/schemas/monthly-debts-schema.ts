import mongoose from 'mongoose';
import { DocumentModel } from './model-interface';

export interface MonthlyDebts extends DocumentModel {
  cartId: string;
  paymentDate: Date;
}

export const MonthlyDebtsSchema = new mongoose.Schema<MonthlyDebts>(
  {
    cartId: {
      type: String,
      required: true,
      ref: 'Cart',
    },
    paymentDate: { type: Date, required: false, default: null },
  },
  { timestamps: true },
);

export const MonthlyDebtsModel = mongoose.model<MonthlyDebts>(
  'MonthlyDebts',
  MonthlyDebtsSchema,
  'monthlyDebts',
);
