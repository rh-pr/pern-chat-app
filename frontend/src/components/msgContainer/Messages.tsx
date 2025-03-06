
import Message from "./Message";
import { MessageType } from "../../types/main";
import useConversation from "../../hooks/useConversation";
import { useEffect, useRef } from "react";
const Messages = () => {
	const { conversation } = useConversation();
	const endConversation = useRef<HTMLParagraphElement | null>(null);

	useEffect(() => {
		if(endConversation.current) {
			endConversation.current.scrollIntoView({ behavior: "smooth", block: "end" });
		}
	}, [conversation])

	return (
		<div className='px-4 y-2 mb-20  flex flex-col gap-2 w-full overflow-y-auto' style={{scrollbarWidth:"none"}}>
			{ conversation?.map((message: MessageType) => (
				<Message key={message.id} message={message} />
			))}
			<div className="h-0"  ref={endConversation}></div>
		</div>
	);
};
export default Messages;