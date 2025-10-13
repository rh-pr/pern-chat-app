import { useContext, useEffect } from "react";
import useMessagesStore from "../../stores/useMessagesStore";
import useSocketStore from "../../stores/useSocketSore";
import { MessageType } from "../../types/main";

import notificationSound from "../../assets/sounds/notification.mp3";
import { DesignContext } from "../../context/DesignContext";

const useListenMessages = (onNewMessage?: (msg: MessageType) => void) => {
    const context = useContext(DesignContext);

    const socket  = useSocketStore((state) => state.socket);
    const messages = useMessagesStore((state) => state.messages);
    const updateMessages = useMessagesStore((state) => state.updateMessages);
    const updateUnreadedMsgs = useMessagesStore((state) => state.updateUnreadedMsgs);


    useEffect(() => {

        //todo: switch sound base on usersSettings

        socket?.on("newMessage", (newMessage) => {
            console.log(newMessage);
            
            updateUnreadedMsgs(newMessage.conversationId);
            newMessage.shouldShake = true;
            const sound = context?.sound ? new Audio(notificationSound) : null;
            sound?.play();
            updateMessages(newMessage);
            onNewMessage?.(newMessage);
        });

        return () => {
            socket?.off("newMessage");
        }
    }, [socket, messages, updateMessages]);
}

export default useListenMessages;