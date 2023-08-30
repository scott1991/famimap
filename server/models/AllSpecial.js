const AllSpecialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  displayName: { type: String, required: true },
  category: { type: String, required: true }
});

const AllSpecial = mongoose.model('AllSpecial', AllSpecialSchema);
