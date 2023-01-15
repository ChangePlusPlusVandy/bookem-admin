import React from 'react';
import { QueriedVolunteerProgramApplicationDTO } from 'bookem-shared/src/types/database';

//Display a list of program applications
export const ProgramApplicationTable = ({
  headers,
  applications,
}: {
  headers: Array<string>;
  applications: Array<QueriedVolunteerProgramApplicationDTO>;
}) => {
  return (
    <div>
      <h1>Volunteer Application List</h1>
      <table>
        {/* Headers */}
        <thead>
          <tr>
            {headers.map((header: string, index: number) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>

        {/* Body: display each user's name, email, phone and address */}
        <tbody>
          {applications.map(
            (application: QueriedVolunteerProgramApplicationDTO) => {
              return (
                <tr key={application._id.toJSON()}>
                  <td>{application.user?.name}</td>
                  <td>{application.user?.email}</td>
                  <td>{application.program?.name}</td>
                  <td>{application.program?.programDate.getDate()}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};
