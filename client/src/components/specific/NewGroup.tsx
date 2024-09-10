import React from 'react'
import { Dialog } from '@mui/material'
import { sampleUsers } from '../../constants/sampleData';
import UserItem from '../shared/UserItem';

type NewGroupDialogProps = {
  open: boolean;
  setIsNewGroup: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewGroup: React.FC<NewGroupDialogProps> = ({ open, setIsNewGroup }) => {


  const handleClose = () => {
    setIsNewGroup(prev => !prev)
  }

  const selectMemberHandler = () => {

  }


  return (
    <Dialog open={open} onClose={handleClose} >
      <div className="bg-white w-[25rem] py-8 px-5 flex flex-col gap-4">
        <div>
          <p className="text-center font-semibold text-xl">New Group</p>
        </div>

        <input type="text" className="w-full outline-none px-2 py-1 border border-gray-500 focus:border-gray-900" />

        <p>Members</p>

       <div>
       {sampleUsers.map((user) => (
          <UserItem
            user={user}
            key={user._id}
            handler={selectMemberHandler}
          />
        ))}
       </div>

       <div>
        <button>Cancel</button>
        <button>Create</button>
       </div>

      </div>
    </Dialog>
  )
}

export default NewGroup