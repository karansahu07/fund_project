import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  dateOfJoining: Date;
  dob: Date;
  role: 'admin' | 'employee';
  dateOfResigning: Date;
  isActive: boolean;
  createdBy: mongoose.Types.ObjectId;
  updatedBy: mongoose.Types.ObjectId;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Email is invalid'],
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^\+?[0-9]{10,15}$/, 'Phone number is invalid'],
    },
    dateOfJoining: {
      type: Date,
      required: [true, 'Date of joining is required'],
    },
    dob: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    role: {
      type: String,
      enum: ['admin', 'employee'],
      default: 'employee',
    },
    dateOfResigning: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true, 
  }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
