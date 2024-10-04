import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat } =
    useContext(ChatContext);
  const [currentChat, setCurrentChat] = useState(null);

  const handleChatSelect = (chat) => {
    setCurrentChat(chat);
    updateCurrentChat(chat);
  };

  return (
    <Container>
      <PotentialChats />
      <Stack direction="horizontal" gap={4} className="align-items-start">
        <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
          {isUserChatsLoading && <p>Loading Chats...</p>}
          {!isUserChatsLoading &&
            userChats?.map((chat, index) => (
              <div key={index} onClick={() => handleChatSelect(chat)}>
                <UserChat chat={chat} user={user} />
              </div>
            ))}
        </Stack>
        <ChatBox currentChat={currentChat} />
      </Stack>
    </Container>
  );
};

export default Chat;
