import { Model } from 'mongoose';
import { MonthlyDebts } from '../schemas/monthly-debts-schema';

export class MonthlyDebtsRepository {
  private model: Model<MonthlyDebts>;

  constructor(model: Model<MonthlyDebts>) {
    this.model = model;
  }

  public async create(cart: Partial<MonthlyDebts>): Promise<MonthlyDebts> {
    return this.model.create(cart);
  }

  public async findById(id: string): Promise<MonthlyDebts | null> {
    return this.model.findById(id).exec();
  }

  public async findAll(): Promise<MonthlyDebts[]> {
    return this.model.find().exec();
  }

  public async update(
    id: string,
    cart: Partial<MonthlyDebts>,
  ): Promise<MonthlyDebts | null> {
    return this.model.findByIdAndUpdate(id, cart, { new: true }).exec();
  }

  public async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}
