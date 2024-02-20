import mongoose from 'mongoose'

export type Person = {
  name: string
  document: string
  telephone: string
  active: boolean
}

export const PersonSchema = new mongoose.Schema<Person>(
  {
    name: { type: String, required: true },
    document: { type: String, required: true },
    telephone: { type: String, required: true },
    active: { type: Boolean, required: true }
  },
  { timestamps: true }
)

export const PersonModel = mongoose.model('person', PersonSchema)
