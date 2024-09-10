import { ElementType } from 'react'
import Header from './Header'
import Title from '../shared/Title'
import ChatList from '../specific/ChatList'
import { sampleChats } from '../../constants/sampleData'
import { useParams } from 'react-router-dom'
import Profile from '../specific/Profile'


const AppLayout = () => (WrappedComponent: ElementType) => {

    const handleDeleteChat = (e: React.MouseEvent<HTMLAnchorElement>, id?: string, isGroupChat?: boolean) => {
        e.preventDefault(); // Prevent the default context menu from appearing
        console.log(`Delete chat with ID: ${id}, isGroupChat: ${isGroupChat}`);
        // Implement the deletion logic here
    };


    return (props: any) => {

        const params = useParams() ;
        const chatId = params.chatId || ''


        return (
            <>
                <Title />  
                <Header/>
                <div className="w-full grid grid-cols-12 ">
                    <div className="min-h-[94vh] xl:flex xl:visible invisible col-span-3 ">
                        <ChatList chats={sampleChats} handleDeleteChat={handleDeleteChat} chatId={chatId}
                        // newMessagesAlert={[{
                        //     chatId,
                        //     count: 4,
                        // }]}
                        onlineUsers={["1", "2"]}
                        />
                    </div>                   
                    <div className="min-h-[94vh] col-span-6 "> 
                        <WrappedComponent {...props} />
                    </div>                   
                    <div className="min-h-[94vh] xl:flex xl:visible invisible  col-span-3 bg-gray-600  ">
                    <Profile/>
                    </div>
                </div>
                <div>Footer</div>
            </>
        )
    }
}

export default AppLayout