import mongoose, { Schema, Document } from 'mongoose';

interface IVideo extends Document {
  link: string;
  description: string;
  tags: string[];
  addedBy: string;
  
}

const VideoSchema: Schema = new Schema({
  link: { type: String, required: true },
  description: { type: String, required: true, maxlength: 500 },
  tags: { type: [String], required: true },
  addedBy: { type: String, required: true },
  
},);
// console.log(mongoose.models)
export const Video = mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema);
export type { IVideo };