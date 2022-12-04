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
  createDate?: Date;
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
}

export interface VolunteerFormData {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  isApproved?: boolean;
  emergencyContact: {
    firstName: string;
    lastName: string;
    phone: string;
    relationship: string;
  };
  workStatus?: string;
  employer?: string;
  opportunities?: Array<string>;
  createDate?: Date;
}
