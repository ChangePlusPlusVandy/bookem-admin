import { QueriedVolunteerEventDTO } from 'bookem-shared/src/types/database';
import { EventRowData } from './table-types';

export const convertEventDataToRowData = (
  data: QueriedVolunteerEventDTO[]
): EventRowData[] => {
  return data.map(event => {
    return {
      ...event,
      key: event._id.toString(),
      numVolunteers: event.volunteers.length,
    };
  });
};
