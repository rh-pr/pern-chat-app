import { useEffect, useState } from "react";
import useVoiceMsgStore from "../../../stores/useVoiceMsgStore";
import useConversationsStore from "../../../stores/useConversationsStore";


const useVoiceMsg = (converId: string) => {

    const activateVoiceMsg = useVoiceMsgStore((state) => state.activateVoiceMsg);
    const isPaused = useVoiceMsgStore((state) => state.isPaused);
    const isRecording = useVoiceMsgStore((state) => state.isRecording);

    const setActivateVoiceMsg = useVoiceMsgStore((state) => state.setActivateVoiceMsg);
    const setIsPaused = useVoiceMsgStore((state) => state.setIsPaused);
    const setIsRecording = useVoiceMsgStore((state) => state.setIsRecording);
    const activeConversationId = useConversationsStore((state) => state.activeConversationId)


    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    useEffect(() => {
        if (converId !== activeConversationId) {
            setActivateVoiceMsg(false);
            setIsPaused(false);
            setIsRecording(false);
        }
        
    },[converId, activeConversationId])
    
  
    const pauseRecord = () => {
        setIsPaused(true);
        setIsRecording(false);
    }

    const resumeRecord = () => {
        setIsPaused(false);
        setIsRecording(true);
    }

    const startRecord = () => {
        setActivateVoiceMsg(true);
        setIsRecording(true);
    }

    const deleteAudioMsg = () => {
        setIsRecording(false);
        setIsPaused(false);
        setActivateVoiceMsg(false);
    }
  

    return {
        activateVoiceMsg,
        isRecording,
        isPaused,
        audioUrl,

        pauseRecord,
        resumeRecord,
        startRecord,
        deleteAudioMsg
    }

}

export default useVoiceMsg;