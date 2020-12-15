import { model, Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string
}

const userSchema: Schema = new Schema ({
  name: {
    type: String,
    required: true,
    unique: true,
    tim: true,
    minlength: 3
  }
}, {
  timestamps: true
})

const User: Model<IUser> = model('User', userSchema)

export default User
