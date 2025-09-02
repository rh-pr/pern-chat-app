import { useEffect } from "react";
import useMessagesStore from "../../stores/useMessagesStore";
import useSocketStore from "../../stores/useSocketSore";
import { MessageType } from "../../types/main";

const useListenMessages = (onNewMessage?: (msg: MessageType) => void) => {
    const socket  = useSocketStore((state) => state.socket);
    const messages = useMessagesStore((state) => state.messages);
    const updateMessages = useMessagesStore((state) => state.updateMessages);

    useEffect(() => {

        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            updateMessages(newMessage);
            onNewMessage?.(newMessage);
        });

        return () => {
            socket?.off("newMessage");
        }
    }, [socket, messages, updateMessages]);
}

export default useListenMessages;