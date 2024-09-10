import React, { memo } from 'react';
import { Avatar, Dialog, ListItem } from '@mui/material';
import { sampleNotificationData } from '../../constants/sampleData';

// Define type for notification item
type NotificationItemType = {
  sender: {
    avatar: string;
    name: string;
  };
  _id: string;
};

type NotificationsDialogProps = {
  open: boolean;
  setIsNotification: React.Dispatch<React.SetStateAction<boolean>>;
};

// Notification component with correct typing
const Notifications: React.FC<NotificationsDialogProps> = ({ open, setIsNotification }) => {
  const handleClose = () => {
    setIsNotification((prev) => !prev);
  };

  const friendRequestHandler = ({ _id, accept }: { _id: string; accept: boolean }): void => {
    console.log({ _id, accept });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="bg-white w-[25rem] py-8 px-5 flex flex-col gap-4">
        <div>
        <p className="text-center font-semibold text-xl">Notifications</p>
        </div>
        {sampleNotificationData.length > 0 ? (
          sampleNotificationData.map((i) => (
            <NotificationItem sender={i.sender} _id={i._id} handler={friendRequestHandler} key={i._id} />
          ))
        ) : (
          <p>0 notifications</p>
        )}
      </div>
    </Dialog>
  );
};

export default Notifications;

// Define type for NotificationItem props
type NotificationItemProps = {
  sender: {
    avatar: string;
    name: string;
  };
  _id: string;
  handler: ({ _id, accept }: { _id: string; accept: boolean }) => void;  // Updated to return 'void'
};

// NotificationItem component with correct typing
const NotificationItem: React.FC<NotificationItemProps> = memo(({ sender, _id, handler }) => {
  return (
    <ListItem>
      <div className="flex items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-2">
          <Avatar src={sender.avatar} />
          <p>{sender.name}</p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-2 py-1 text-xs rounded-md bg-blue-500 text-white" onClick={() => handler({ _id, accept: true })}>Accept</button>
          <button className="px-2 py-1 text-xs rounded-md bg-red-500 text-white" onClick={() => handler({ _id, accept: false })}>Reject</button>
        </div>
      </div>
    </ListItem>
  );
});
