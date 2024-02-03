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
      programName: event.program ? event.program.name : '',
    };
  });
};

export const convertProgramDataToRowData = (
  data: QueriedVolunteerEventDTO[]
) => {
  console.log('Data:', data); // Add this line
  const result = data.map((program, index) => {
    return {
      key: index,
      programName: program.name,
      programDesc: program.description,
    };
  });
  return result;
};
