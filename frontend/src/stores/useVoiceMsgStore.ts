import { create } from "zustand";
import { VoiceMsgState } from "../types/main";

const useVoiceMsgStore = create<VoiceMsgState>((set) => ({
    activateVoiceMsg: false,
    isRecording: false,
    isPaused: false,

    setActivateVoiceMsg: (voiceMsgStatus: boolean) => 
        set(() => ({ activateVoiceMsg: voiceMsgStatus })),
    setIsRecording: (recordingStatus: boolean) => 
        set(() => ({ isRecording: recordingStatus })),
    setIsPaused: (pauseStatus: boolean) => 
        set(() => ({ isPaused: pauseStatus }))
}));

export default useVoiceMsgStore;