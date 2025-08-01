
import Message from "./Message";
import { MessageType } from "../../types/main";
import useMessagesStore from "../../stores/useMessagesStore";
import useMessages from '../../hooks/chat/useMessages';

//chage type of id letter
const Messages = () => {
	const messages = useMessagesStore((state) => state.messages);
	const { endConversation } =  useMessages();

	console.log('message from store = ', messages)
	
	return (
		<div className='px-4 y-2 mb-20  flex flex-col gap-2 w-full overflow-y-auto' style={{scrollbarWidth:"none"}}>
			{ messages?.map((message: MessageType, ind: number) => (
				<Message key={ind} message={message} />
			))}
			<div className="h-0"  ref={endConversation}></div>
		</div>
	);
};
export default Messages;