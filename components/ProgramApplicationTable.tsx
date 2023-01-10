import VolunteerProgramApplications from 'models/VolunteerProgramApplications';
import React from 'react';
import { VolunteerProgramApplicationData } from 'types/database';

//Display a list of program applications
export const ProgramApplicationTable = ({
  headers,
  applications,
}: {
  headers: Array<string>;
  applications: Array<VolunteerProgramApplicationData>;
}) => {
  return (
    <div>
      <h1>Volunteer Application List</h1>
      <table>
        {/* Headers */}
        <thead>
          {headers.map((header: string, index: number) => (
            <th key={index}>{header}</th>
          ))}
        </thead>

        {/* Body: display each user's name, email, phone and address */}
        <tbody>
          {applications.map((application: VolunteerProgramApplicationData) => {
            return (
              <tr key={application._id.toJSON()}>
                <td>{application.user?.name}</td>
                <td>{application.user?.email}</td>
                <td>{application.program?.name}</td>
                <td>{application.program?.programDate.getDate()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
