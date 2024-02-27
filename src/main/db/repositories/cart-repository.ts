import { Model } from 'mongoose';
import { Cart } from '../schemas/cart-schema';

export class CartRepository {
  private model: Model<Cart>;

  constructor(model: Model<Cart>) {
    this.model = model;
  }

  public async create(cart: Partial<Cart>): Promise<Cart> {
    return this.model.create(cart);
  }

  public async findById(id: string): Promise<Cart | null> {
    return this.model.findById(id).exec();
  }

  public async findByUserDocument(personDocument: string): Promise<Cart[]> {
    return await this.model.find({ personDocument }).exec();
  }

  public async enable(id: string): Promise<Cart | null> {
    return this.model
      .findByIdAndUpdate(id, { active: true }, { new: true })
      .exec();
  }

  public async findAll(): Promise<Cart[]> {
    return this.model.find().exec();
  }

  public async update(id: string, cart: Partial<Cart>): Promise<Cart | null> {
    return this.model.findByIdAndUpdate(id, cart, { new: true }).exec();
  }

  public async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}
