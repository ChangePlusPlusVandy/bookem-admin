import {
  QueriedVolunteerEventDTO,
  QueriedVolunteerProgramData,
  QueriedAdminData,
} from 'bookem-shared/src/types/database';
import { EventRowData, ProgramRowData, AdminRowData } from './table-types';

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
      programName: event.program?.name ?? '',
    };
  });
};

export const convertProgramDataToRowData = (
  data: QueriedVolunteerProgramData[]
): ProgramRowData[] => {
  const result = data.map(program => {
    return {
      ...program,
      key: program._id.toString(),
      numEvents: program.events.length,
      description: program.description ?? '',
    };
  });
  return result;
};

export const convertAdminDataToRowData = (
  data: QueriedAdminData[]
): AdminRowData[] => {
  return data.map(admin => ({ ...admin, key: admin._id.toString() }));
};
