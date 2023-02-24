import * as mongoose from 'mongoose';

export const StudentSchema = new mongoose.Schema({
  first: { type: String, required: true },
  last: { type: String, required: true },
  res: { type: String, required: true },
  year: { type: Number, required: true },
  adv: { type: String, required: true },
  parents: {type: Array<String>, required: true },
  cells: { type: Array<String>, required: false },
  emails: { type: Array<String>, required: false },
})

export interface Student extends mongoose.Document {
  id: string;
  first: string;
  last: string;
  res: string;
  year: number;
  adv: string;
  parents: Array<string>;
  cells: Array<string>;
  emails: Array<string>;
}
