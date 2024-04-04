import {
  QueriedVolunteerEventDTO,
  QueriedVolunteerProgramData,
  QueriedAdminData,
} from 'bookem-shared/src/types/database';
import { ObjectId } from 'mongodb';

// Event Row
export interface EventRowData
  extends Omit<QueriedVolunteerEventDTO, 'applicationId'> {
  key: string;
  numVolunteers: number;
  programName: string;
}
export type EventDataIndex = keyof EventRowData;

// Program Row
// Omit description because it's an optional field and ANTD doesn't like it
// We have to fill it with something
export interface ProgramRowData
  extends Omit<QueriedVolunteerProgramData, 'description'> {
  key: string;
  description: string;
}
export type ProgramDataIndex = keyof ProgramRowData;

// Admin row
export interface AdminRowData extends QueriedAdminData {
  key: string;
}
export type AdminDataIndex = keyof AdminRowData;

export interface VolunteerRowData {
  key: number;
  name: string;
  email: string;
  phone: string;
  id: ObjectId;
}

export type VolunteerDataIndex = keyof VolunteerRowData;
