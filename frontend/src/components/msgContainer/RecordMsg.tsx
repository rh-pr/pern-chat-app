import React from 'react'
import useVoiceMsg from '../../hooks/chat/audio/useVoiceMsg'

function RecordMsg({id}:{id:string}) {
  const {
    time,
    canvasRef, 
    isRecording,
    isPaused
  } = useVoiceMsg(id);
  return (
    <div className='flex gap-[16px]'>
      <p>{time}</p>
       <canvas
        ref={canvasRef}
        style={{ 
            border: '1px solid black', 
            width: "32vw", 
            height: "30px",
           display: (isRecording || isPaused) ? 'block' : 'none'
        }}
      ></canvas>
    </div>
  )
}

export default RecordMsg
