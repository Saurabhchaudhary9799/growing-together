import mongoose, { Schema, Document } from 'mongoose';

interface IArticle extends Document {
  link: string;
  description: string;
  tags: string[];
  addedBy: string;
}

const ArticleSchema: Schema = new Schema({
  link: { type: String, required: true },
  description: { type: String, required: true, maxlength: 500 },
  tags: { type: [String], required: true },
  addedBy: { type: String, required: true },
}, {
  timestamps: true // Optional: adds createdAt and updatedAt fields
});
console.log(mongoose.models)
// Check if the model exists before creating a new one
const Article = mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export { Article };
export type { IArticle };