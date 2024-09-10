import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { TbPointFilled } from "react-icons/tb";
import AvatarCard from './AvatarCard';



type ChatItemProps = {
    avatar?: any[],
    name?: string,
    _id?: string,
    groupChat?: boolean,
    sameSender?: boolean,
    isOnline?: boolean,
    index?: number,
    newMessageAlert?: any,
    handleDeleteChat: (e: React.MouseEvent<HTMLAnchorElement>, id?: string, isGroupChat?: boolean) => void,
}

const ChatItem: React.FC<ChatItemProps> = ({ avatar, name, _id, groupChat, isOnline, newMessageAlert, index, sameSender, handleDeleteChat }) => {
    return (
        <Link to={`/chat/${_id}`} onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)} className="w-full">
            <div className={`flex w-full items-center px-5 py-3  ${sameSender ? "bg-black text-white" : "hover:bg-gray-100"} gap-5 relative w-full`}>


                <AvatarCard avatar={avatar}  />

                <div className=" w-full">
                    <div>
                        <span className="font-semibold">{name}</span>
                    </div>
                    {
                        newMessageAlert && (
                            <p>{newMessageAlert.count} New Message</p>
                        )
                    }
                </div>


                {
                    isOnline &&
                    <div>
                        <TbPointFilled className="text-green-700" />
                    </div>
                }

            </div>
        </Link>
    )
}

export default memo(ChatItem)