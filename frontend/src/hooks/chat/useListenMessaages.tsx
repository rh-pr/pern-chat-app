import { useEffect } from "react";
import useMessagesStore from "../../stores/useMessagesStore";
import useSocketStore from "../../stores/useSocketSore";
import { MessageType } from "../../types/main";

import notificationSound from '../../assets/sounds/notification.mp3';

const useListenMessages = (onNewMessage?: (msg: MessageType) => void) => {
    const socket  = useSocketStore((state) => state.socket);
    const messages = useMessagesStore((state) => state.messages);
    const updateMessages = useMessagesStore((state) => state.updateMessages);

    useEffect(() => {

        //todo: switch sound base on usersSettings
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            updateMessages(newMessage);
            onNewMessage?.(newMessage);
        });

        return () => {
            socket?.off("newMessage");
        }
    }, [socket, messages, updateMessages]);
}

export default useListenMessages;