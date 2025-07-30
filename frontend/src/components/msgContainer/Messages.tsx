
import Message from "./Message";
import { MessageType } from "../../types/main";
import useConversation from "../../hooks/chat/useConversation";
import { useEffect, useRef } from "react";

//chage type of id letter
const Messages = () => {
	const {conversation, getConversation } = useConversation();
	// const [conversation, setConversation] = useState<MessageType[] | null>(null)
	const endConversation = useRef<HTMLParagraphElement | null>(null);

	useEffect(() => {
		getConversation();
	},[])

	useEffect(() => {
		if(endConversation.current) {
			endConversation.current.scrollIntoView({ behavior: "smooth", block: "end" });
		}
	}, [conversation])

	return (
		<div className='px-4 y-2 mb-20  flex flex-col gap-2 w-full overflow-y-auto' style={{scrollbarWidth:"none"}}>
			{ conversation?.map((message: MessageType, inx: number) => (
				<Message key={inx} message={message} />
			))}
			<div className="h-0"  ref={endConversation}></div>
		</div>
	);
};
export default Messages;