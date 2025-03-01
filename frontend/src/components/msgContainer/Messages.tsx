
import Message from "./Message";
import { MessageType } from "../../types/main";
import useConversation from "../../hooks/useConversation";
import { useEffect, useRef } from "react";
const Messages = () => {
	const { conversation } = useConversation();
	const endConversation = useRef<HTMLParagraphElement | null>(null);

	useEffect(() => {
		if(endConversation.current) {
			endConversation.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [conversation])

	return (
		<div className='px-4 py-2 mb-20 flex flex-col gap-2 w-full   overflow-auto' style={{scrollbarWidth:"none"}}>
			{ conversation?.map((message: MessageType) => (
				<Message key={message.id} message={message} />
			))}
			<p ref={endConversation}></p>
		</div>
	);
};
export default Messages;