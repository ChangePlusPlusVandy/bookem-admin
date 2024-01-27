import { QueriedVolunteerEventDTO } from 'bookem-shared/src/types/database';
import { EventRowData } from './table-types';

export const convertEventDataToRowData = (
  data: QueriedVolunteerEventDTO[]
): EventRowData[] => {
  return data.map(event => {
    event.startDate = new Date(event.startDate);
    event.endDate = new Date(event.endDate);
    return {
      ...event,
      key: event._id.toString(),
      numVolunteers: event.volunteers.length,
    };
  });
};
