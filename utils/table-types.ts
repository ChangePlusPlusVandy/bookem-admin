import { QueriedTagData } from 'bookem-shared/src/types/database';
import { ObjectId } from 'mongoose';

export interface EventRowData {
  key: number;
  eventName: string;
  date: string;
  numVolunteers: number;
  tags: QueriedTagData[];
  id: ObjectId;
  title: string;
  dataIndex: string;
}
