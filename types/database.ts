import mongoose from 'mongoose';

export interface UserData {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  isVolunteer?: boolean;
  isDonor?: boolean;
  isRequester?: boolean;
  sourceHeardFrom: string;
  ethnicity: string;
  gender: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VolunteerLogData {
  _id: mongoose.Types.ObjectId;
  school?: string;
  teacher?: string;
  date: Date;
  hours: number;
  userId: mongoose.Types.ObjectId;
  feedback?: string;
  numBooks?: number;
  createdAt: Date;
}

export interface VolunteerProgramApplicationData {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  programId: mongoose.Types.ObjectId;
  formData: mongoose.Schema.Types.Mixed;
  createdAt: Date;
}

export interface VolunteerLogData {
  _id: mongoose.Types.ObjectId;
  school?: string;
  teacher?: string;
  date: Date;
  hours: number;
  userId: mongoose.Types.ObjectId;
  feedback?: string;
  numBooks?: number;
  createdAt: Date;
}

export interface VolunteerProgramData {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  schools?: string[];
  programDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Employee {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}
