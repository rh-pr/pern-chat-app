import { useContext } from "react";
import { getTextAreaStyle } from "../../utils/msgHandlers"
import { DesignContext } from "../../context/DesignContext";
import useVoiceMsg from "../../hooks/chat/audio/useVoiceMsg";
// import useVoiceMsgStore from "../../stores/useVoiceMsgStore";
import useConversationsStore from "../../stores/useConversationsStore";

import { Mic } from 'lucide-react';
import { Pause } from 'lucide-react';
import { Trash } from 'lucide-react';



function Audio() {
  const design = useContext(DesignContext);
  const activeConversationId = useConversationsStore((state) => state.activeConversationId)

  const {
    audioUrl,
    isPaused,
    isRecording,
    pauseRecord, 
    resumeRecord,
    deleteAudioMsg
  } = useVoiceMsg(activeConversationId);

  return (
    <div  className='flex gap-[16px] items-center text-md rounded-lg block w-full p-2.5 md:px-10 md:pl-16  font-medium'
          style={getTextAreaStyle(design)}>
     <div onClick={deleteAudioMsg}><Trash /></div>

    
{/* todo: change !audioUrl and src*/}
    {isPaused && !audioUrl && <div>
       <audio src={''} 
              controls  
              controlsList="nodownload noplaybackrate"
              className="h-[30px] w-[48vw]" />
    </div>}
     <div className="flex gap-[16px]">
        {isRecording   && <button onClick={pauseRecord}><Pause /></button>}
        {isPaused && <button onClick={resumeRecord}><Mic /></button>}
      </div>
     
    </div>
  )
}

export default Audio
