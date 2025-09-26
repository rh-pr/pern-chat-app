import { useContext } from "react";
import { getTextAreaStyle } from "../../utils/msgHandlers"
import { DesignContext } from "../../context/DesignContext";
import useVoiceMsg from "../../hooks/chat/audio/useVoiceMsg";
import useConversationsStore from "../../stores/useConversationsStore";


import { CirclePause  } from 'lucide-react';
import { Trash } from 'lucide-react';


function Audio() {
  const design = useContext(DesignContext);
  const activeConversationId = useConversationsStore((state) => state.activeConversationId)

  const {
    canvasRef, 
    time,
    audioUrl,
    activateVoiceMsg,
    isRecording,
    preLoadAudio,
    deleteAudioMsg,
  } = useVoiceMsg(activeConversationId);

  
  return (
    <div  className='flex gap-[16px] items-center text-md rounded-lg block w-full p-2.5 md:px-10 md:pl-16  font-medium'
          style={getTextAreaStyle(design)}>
     <div onClick={deleteAudioMsg}><Trash /></div>

    {/* {isRecording && activateVoiceMsg && <RecordMsg id={activeConversationId} />} */}
     {isRecording && activateVoiceMsg && <div className='flex gap-[16px]'>
      <p>{time}</p>
       <canvas
        ref={canvasRef}
        style={{ 
            border: '1px solid black', 
            width: "32vw", 
            height: "30px",
           display: isRecording  ? 'block' : 'none'
        }}
      ></canvas>
    </div>}

{/* todo: change !audioUrl and src*/}
    {!isRecording && audioUrl && <div>
       <audio src={audioUrl} 
              controls  
              controlsList="nodownload noplaybackrate"
              className="h-[30px] w-[36vw]"/>
    </div>}
     <div className="flex gap-[16px]">
        {isRecording && <div onClick={preLoadAudio}><CirclePause  /></div>}
      </div>
     
    </div>
  )
}

export default Audio
