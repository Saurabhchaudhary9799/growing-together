import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  username: string;
  
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
  },
  
});


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema) ;

export default UserModel