import { User } from 'next-auth';
import React from 'react';
import { QueriedUserData as UserData } from 'bookem-shared/src/types/database';

/**
 * Display users as a table
 * @param props Table header array and user array
 */
export const UserTable = ({
  headers,
  users,
}: {
  headers: Array<string>;
  users: Array<UserData>;
}) => {
  return (
    <div>
      <h1>User List</h1>
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
          {users.map((user: UserData) => {
            return (
              <tr key={user._id.toJSON()}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// // This gets called on every request
// export async function getServerSideProps() {
//   // Dummy data
//   //TO DO: Change it into fetch
//   const users: Array<UserData> = [
//     {
//       _id: new mongoose.Types.ObjectId(),
//       name: 'user1',
//       email: 'user1@bookem.org',
//       password: 'abcdefg',
//       phone: '1234567890',
//       address: 'TN',
//       sourceHeardFrom: 'Change++',
//       ethnicity: 'Asian',
//       gender: 'Male',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//     {
//       _id: new mongoose.Types.ObjectId(),
//       name: 'user2',
//       email: 'user2@bookem.org',
//       password: 'abcdefg',
//       phone: '1234567890',
//       address: 'TN',
//       sourceHeardFrom: 'Change++',
//       ethnicity: 'Asian',
//       gender: 'Female',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//   ];

//   //Header row values
//   const headers: Array<string> = ['Name', 'Email', 'Phone', 'Address'];

//   // Pass data to the page via props
//   return { props: { users, headers } };
// }
