import mongoose from 'mongoose';
import { EmployeeStatus } from 'types/database';

// UserSchema describes what our documents should look like in our User collections
const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    status: {
      type: EmployeeStatus,
      default: EmployeeStatus.Employee,
      required: true,
      enum: EmployeeStatus,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'employees',
  }
);

export default mongoose.models.Employee ||
  mongoose.model('Employee', EmployeeSchema);
