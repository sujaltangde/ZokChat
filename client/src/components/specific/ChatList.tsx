import React from 'react'
import ChatItem from '../shared/ChatItem';


type newMessage = {
    chatId: string;
    count: number;
}

type ChatListProps = {
    chats?: any[];
    chatId?: string;
    onlineUsers?: any[];
    newMessagesAlert?: newMessage[];
    handleDeleteChat: (e: React.MouseEvent<HTMLAnchorElement>, id?: string, isGroupChat?: boolean) => void; // Remove '?'
};


const ChatList: React.FC<ChatListProps> = ({ chats, chatId, onlineUsers, newMessagesAlert, handleDeleteChat }) => {
    return (
        <>
            <div className="flex flex-col w-full">
                {
                    chats?.map((data: any, index: number) => {
                        const { avatar, _id, name, groupChat, members } = data;

                        const newMessageAlert = newMessagesAlert?.find(
                            ({ chatId }) => chatId === _id
                        )

                        const isOnline = members?.some((member: any) => onlineUsers?.includes(_id))

                        return (
                            <ChatItem
                                index={index}
                                newMessageAlert={newMessageAlert}
                                isOnline={isOnline}
                                avatar={avatar}
                                name={name}
                                _id={_id}
                                key={_id}
                                groupChat={groupChat}
                                sameSender={chatId === _id}
                                handleDeleteChat={handleDeleteChat}
                            />
                        )
                    }
                    )
                }

            </div>
        </>
    )
}

export default ChatList