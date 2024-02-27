import { Model } from 'mongoose';
import { Person } from '../schemas/person-schema';

export class PersonRepository {
  private model: Model<Person>;

  constructor(model: Model<Person>) {
    this.model = model;
  }

  public async create(person: Partial<Person>): Promise<Person> {
    return await this.model.create(person);
  }

  public async findById(id: string): Promise<Person | null> {
    return this.model.findById(id).exec();
  }

  public async findByDocument(document: string): Promise<Person | null> {
    return await this.model.findOne({ document: document });
  }

  public async findAll(): Promise<Person[]> {
    return await this.model.find().exec();
  }

  public async update(
    id: string,
    person: Partial<Person>,
  ): Promise<Person | null> {
    return this.model.findByIdAndUpdate(id, person, { new: true }).exec();
  }

  public async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}
