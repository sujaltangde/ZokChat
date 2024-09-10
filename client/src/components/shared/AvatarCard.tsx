import { Avatar, AvatarGroup } from '@mui/material'
import React from 'react'

type AvatarCardProps = {
  avatar?: any[];
  max?: number; // Added 'max' property here
};

const AvatarCard:React.FC<AvatarCardProps> = ({avatar = [], max = 4}) => {
  return (
    <>

      <div className="">
           <AvatarGroup max={max}>
            <div className="w-[5rem] h-[3rem]">
                {
                  avatar.map((i, index)=>(
                    <Avatar
                        key={Math.random()*100}
                        src={i}
                        alt={`Avatar ${index}`}
                        sx={{
                          width: "2.3rem",
                          height: "2.3rem",
                          position: "absolute",
                          left: {
                            xs: `${0.5 + index}rem`,
                            sm: `${index}rem`
                          },
                        }}
                    />
                  ))
                }
            </div>
           </AvatarGroup>
      </div>

    </>
  )
}

export default AvatarCard