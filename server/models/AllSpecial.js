import { parseHtmlToJSON as getSpecialList } from '../services/getSpecialList.js';
import mongoose from 'mongoose';


const AllSpecialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  displayName: { type: String, required: true },
  category: { type: String, required: true }
}, { timestamps: true });

AllSpecialSchema.statics.updateFromSrc = async function () {
  const specialList = await getSpecialList();
  // [{ "name": "LCoffee", "displayName": "咖啡複合店", "category": "複合店" },... ]
  await Promise.all(specialList.map(async special => {
    return this.updateOne({ name: special.name }, special, { upsert: true });
  }))
}

export const AllSpecial = mongoose.model('AllSpecial', AllSpecialSchema);
