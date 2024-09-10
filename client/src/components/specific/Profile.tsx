import { Avatar } from '@mui/material';
import React from 'react';
import { FaAt, FaRegUserCircle, FaCalendar } from "react-icons/fa";

import moment from 'moment';

// Define the type for ProfileCard props
type ProfileCardProps = {
  text: string;
  icon?: React.ReactNode; // icon can be any React node
  heading: string;
};


const ProfileCard: React.FC<ProfileCardProps> = ({ text, icon, heading }) => (
  <div className="w-full flex justify-center items-center">
   
    <div className="flex flex-col items-center justify-center">
      <p className="text-white font-semibold flex items-center gap-2"> <span>{icon && icon}</span> <span>{text}</span></p>
      <p className="text-gray-400 text-sm">{heading}</p> 
    </div>
  </div>
);

const Profile: React.FC = () => {
  return (
    <div className="flex flex-col gap-5 items-center w-full my-4">
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: 'contain',
          marginBottom: '1rem',
          border: '3px solid white',
        }}
      />
      <ProfileCard heading={"Bio"} text={"adsad asdasd asd"} />
      <ProfileCard heading={"Username"} text={"sujaltangde"} icon={<FaAt />}/>
      <ProfileCard heading={"Name"} text={"Abhishek Nahar Singh"} icon={<FaRegUserCircle />} />
      <ProfileCard heading={"Joined"} text={moment('2023-11-04T18:30:00.000Z').fromNow()} icon={<FaCalendar/>} />
    </div>
  );
};

export default Profile;





