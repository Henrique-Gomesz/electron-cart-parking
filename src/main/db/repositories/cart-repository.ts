import { Model, UpdateWriteOpResult } from 'mongoose';
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

  public async findByCode(cartCode: string): Promise<Cart | null> {
    return this.model.findOne({ cartCode: cartCode }).exec();
  }
  public async getGetQuantity(): Promise<number> {
    return await this.model.countDocuments().exec();
  }

  public async deleteCart(cartId: string): Promise<UpdateWriteOpResult> {
    return await this.model
      .updateOne({ _id: cartId, active: false }, { deleted: true })
      .exec();
  }

  public async findByUserDocument(personDocument: string): Promise<Cart[]> {
    return await this.model.find({ personDocument, deleted: false }).exec();
  }

  public async enable(id: string): Promise<Cart | null> {
    return this.model
      .findByIdAndUpdate(id, { active: true }, { new: true })
      .exec();
  }

  public async disable(id: string): Promise<Cart | null> {
    return this.model
      .findByIdAndUpdate(id, { active: false }, { new: true })
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
