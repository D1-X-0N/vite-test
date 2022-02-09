import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {Link, Outlet} from 'react-router-dom';
import Button from '@mui/material/Button';
import './ChatList.sass';

export const ChatList = ({chatList, setChatList, onClick}) => {

    const addChat = () => {
      if(chatList.length > 0) {
        const lastChat = chatList[chatList.length - 1];
        const onlyNaN = /\D/g; // все кроме цифр [0-9]

        const newLastId = +lastChat.id.replace(onlyNaN, "") + 1;

        setChatList((prevChatList) => [...prevChatList, {name: `robot${newLastId}`, id: `chat${newLastId}`}])    
      } else {
        setChatList((prevChatList) => [...prevChatList, {name: `robot1`, id: `chat1`}]) 
      }
    }

    const removeChat = (chatId) => {
      onClick(chatId.nativeEvent.path[1].children[0].innerText);
    } 
    return (
      <>
        <List className="chatList"> 
          {chatList.map((chat) => (
            <div key={`div-${chat.id}`} className="chatItem">
            <ListItem key={chat.id}>
              <Link key={`link-${chat.id}`} to={`/chats/${chat.id}`}>
                {chat.name}
              </Link>
            </ListItem>
            <Button onClick={removeChat} className="delete-chat" key={`button-${chat.id}`} size="small" variant="text" color="error">
              X
            </Button>
            </div>
          ))}
          <Button onClick={addChat} size="small" variant="outlined">
            Add Chats
          </Button>
        </List>
        <Outlet />
      </>
    )
}