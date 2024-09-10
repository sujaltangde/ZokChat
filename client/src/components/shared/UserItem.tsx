import { Avatar, ListItem } from '@mui/material';
import React, { memo } from 'react';
import { MdAdd } from "react-icons/md";

// Define the User type to match the structure of a user object
type User = {
  _id: string;
  name: string;
  avatar?: string; // Optional, adjust as needed
};

// Define the component props type
type UserItemProps = {
  user: User;
  handler: (id: string) => void;
  handlerIsLoading?: boolean;
};

const UserItem: React.FC<UserItemProps> = ({ user, handler, handlerIsLoading }) => {
  const { name, _id, avatar } = user;

  return (
    <ListItem>
      <div className="flex items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-2">
          <Avatar src={avatar} />
          <p>{name}</p>
        </div>

        <button onClick={() => handler(_id)} disabled={handlerIsLoading} className="bg-blue-600 rounded-full text-white p-1">
          <MdAdd size={19} />
        </button>
      </div>
    </ListItem>
  );
};

export default memo(UserItem);
