import {
  QueriedVolunteerEventDTO,
  QueriedVolunteerProgramData,
} from 'bookem-shared/src/types/database';

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
  numEvents: number;
  description: string;
}
export type ProgramDataIndex = keyof ProgramRowData;
