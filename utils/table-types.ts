import {
  QueriedVolunteerEventDTO,
  QueriedVolunteerProgramData,
} from 'bookem-shared/src/types/database';

// Event Row
export interface EventRowData extends QueriedVolunteerEventDTO {
  key: string;
  numVolunteers: number;
  programName: string;
}
export type EventDataIndex = keyof EventRowData;

// Program Row
export interface ProgramRowData {
  key: number;
  programName: string;
}
export type ProgramDataIndex = keyof ProgramRowData;
