import mongoose from 'mongoose'

type Person = {
  name: string,
  document: string,
  telephone: string,
  active: boolean
}

export const PersonSchema = new mongoose.Schema<Person>(
  {
    name: String,
    document: String,
    telephone: String,
    active: Boolean
  },
  { timestamps: true }
)
