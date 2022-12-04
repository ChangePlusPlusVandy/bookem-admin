import Users from 'models/Users';
import React from 'react';
import { UserData } from 'types/database';

export const UserTable: React.FC<{ users: Array<UserData> }> = props => {
  return (
    <div>
      <h1>User List</h1>
      <ul>
        {props.users.map((user: UserData, index: number) => {
          return <li key={index}>{user.name}</li>;
        })}
      </ul>
    </div>
  );
};
