import mongoose from 'mongoose';

// UserSchema describes what our documents should look like in our User collections
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    isVolunteer: { type: Boolean, default: false, required: true },
    isDonor: { type: Boolean, default: false, required: true },
    isRequester: { type: Boolean, default: false, required: true },
    sourceHeardFrom: { type: String, required: true },
    ethnicity: { type: String, required: true },
    gender: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'users',
  }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);