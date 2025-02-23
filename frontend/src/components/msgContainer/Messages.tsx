import { DUMMY_MESSAGES } from "../../dummy/dummyData";
import Message from "./Message";

const Messages = () => {
	return (
		<div className='px-4 py-2 mb-20 flex flex-col gap-2 w-full   overflow-auto' style={{scrollbarWidth:"none"}}>
			{DUMMY_MESSAGES.map((message) => (
				<Message key={message.id} message={message} />
			))}
			{DUMMY_MESSAGES.map((message) => (
				<Message key={message.id} message={message} />
			))}
		</div>
	);
};
export default Messages;