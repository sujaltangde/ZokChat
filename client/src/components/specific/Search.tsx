import { Dialog, List } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MdSearch } from "react-icons/md";
import UserItem from '../shared/UserItem'
import { sampleUsers } from '../../constants/sampleData';


type SearchDialogProps = {
  open: boolean;
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

// Define the User type
type User = {
  _id: string;
  name: string;
  avatar?: string;
};

const Search: React.FC<SearchDialogProps> = ({ open, setIsSearch }) => {
  // Example users array
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [search, setSearch] = useState<string>("");

  // This variable should be either state or constant if its value changes
  let isLoadingSendFriendRequest = false;

  const addFriendHandler = (id: string) => {
    console.log(id);
  };

  useEffect(()=>{

    console.log({search})

  },[search])

  const handleClose = () => {
    setIsSearch((prev) => !prev);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="bg-white w-[25rem] py-8 px-5 flex flex-col gap-4">
        <div className="flex items-center justify-center">
          <p className="font-medium text-xl">Find People</p>
        </div>
        <div className="w-full">
          <div className="border border-gray-500 focus:border-gray-900 flex items-center">
            <span className="pl-1.5 pr-1">
              <MdSearch size={23} />
            </span>
            <input onChange={(e)=>setSearch(e.target.value)} type="text" className="w-full outline-none px-2 py-1" />
          </div>
        </div>
      </div>

      <List>
        {users.map((user) => (
          <UserItem
            user={user}
            key={user._id}
            handler={addFriendHandler}
            handlerIsLoading={isLoadingSendFriendRequest}
          />
        ))}
      </List>
    </Dialog>
  );
};

export default Search;
