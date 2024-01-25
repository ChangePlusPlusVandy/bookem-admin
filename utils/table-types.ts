import {
  QueriedTagData,
  QueriedVolunteerEventDTO,
} from 'bookem-shared/src/types/database';
import { ObjectId } from 'mongoose';

// export interface EventRowData {
//   key: number;
//   eventName: string;
//   date: string;
//   numVolunteers: number;
//   tags: QueriedTagData[];
//   id: ObjectId;
//   title: string;
//   dataIndex: string;
// }

export interface EventRowData extends QueriedVolunteerEventDTO {
  key: string;
  numVolunteers: number;
}

export type EventDataIndex = keyof EventRowData;
