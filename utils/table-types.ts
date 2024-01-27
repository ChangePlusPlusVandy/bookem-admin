import { QueriedVolunteerEventDTO } from 'bookem-shared/src/types/database';

export interface EventRowData extends QueriedVolunteerEventDTO {
  key: string;
  numVolunteers: number;
}

export type EventDataIndex = keyof EventRowData;
