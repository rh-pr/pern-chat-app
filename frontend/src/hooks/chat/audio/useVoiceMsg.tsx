import { useContext, useEffect, useState, useRef } from "react";
import useVoiceMsgStore from "../../../stores/useVoiceMsgStore";
import useConversationsStore from "../../../stores/useConversationsStore";
import { DesignContext } from "../../../context/DesignContext";


const useVoiceMsg = (converId: string) => {

    const design = useContext(DesignContext);

    const activateVoiceMsg = useVoiceMsgStore((state) => state.activateVoiceMsg);
    const isPaused = useVoiceMsgStore((state) => state.isPaused);
    const isRecording = useVoiceMsgStore((state) => state.isRecording);

    const setActivateVoiceMsg = useVoiceMsgStore((state) => state.setActivateVoiceMsg);
    const setIsPaused = useVoiceMsgStore((state) => state.setIsPaused);
    const setIsRecording = useVoiceMsgStore((state) => state.setIsRecording);
    const activeConversationId = useConversationsStore((state) => state.activeConversationId)


    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [time, setTime] = useState<string>('00:00');

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);


    useEffect(() => {
        if (converId !== activeConversationId) {
            setActivateVoiceMsg(false);
            setIsPaused(false);
            setIsRecording(false);
        }
        
    },[converId, activeConversationId])

    useEffect(() => {
        if(canvasRef.current && activateVoiceMsg) {
            startRecord();
        }

        return () => {
            stopVisualisation();
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
                mediaRecorderRef.current.stop();
                mediaRecorderRef.current.stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
            }
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
        }
    }, [canvasRef.current, activateVoiceMsg])

    
    const startVisualisation = (stream: MediaStream) => {
        if(!audioContextRef.current) {
            audioContextRef.current = new AudioContext();
            //   audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        if(!analyserRef.current) {
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 2048;
        }

        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const canvas = canvasRef.current;
        const canvasCtx = canvas?.getContext('2d');

        if (!canvasCtx || !canvas) return;

        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        const draw = () => {
            animationFrameRef.current = requestAnimationFrame(draw);
            analyserRef.current?.getByteTimeDomainData(dataArray);

            canvasCtx.clearRect(0,0, canvas.width, canvas.height);
            canvasCtx.fillStyle = '#939393';

            const barWidth = 1;
            const spasing = 1;
            const maxBarHeight = canvas.height / 2.5;
            const numBars = Math.floor(canvas.width / (barWidth + spasing));

            for (let i = 0; i < numBars; i++) {
                const barHeight = Math.pow(dataArray[i] / 128.0, 8) * maxBarHeight;
                const x = (barWidth + spasing) * i;
                const y = canvas.height / 2 - barHeight / 2;
                canvasCtx.fillRect(x, y, barWidth, barHeight);
            }
            
        };

        draw();
    }


    const stopVisualisation = () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close().catch(e => console.error("Error closing AudioContext", e));
        }
        audioContextRef.current = null;
        analyserRef.current = null;   
    }

  
    const pauseRecord = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.pause();
            setIsRecording(false);
            setIsPaused(true);
            stopVisualisation();
        }
    }

    const resumeRecord = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'inactive') {
            mediaRecorderRef.current.resume();
            setIsRecording(true);
            setIsPaused(false);
            startVisualisation(mediaRecorderRef.current.stream);
        }
    }

    const stopRecord = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
            setIsRecording(false);
            setIsPaused(false);
            stopVisualisation();

        }
    };

    const resetRecord = () => {
        setActivateVoiceMsg(false);
        if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
            setAudioUrl('');
        }
        audioChunksRef.current = [];
        setIsRecording(false);
        setIsPaused(false);
    };

    const startRecord = async () => {
        setActivateVoiceMsg(true);
        setIsRecording(true);
        setIsPaused(false);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (e: BlobEvent) => {
                if (e.data.size > 0) {
                    audioChunksRef.current.push(e.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);
                audioChunksRef.current = [];
                mediaRecorderRef.current = null;
            };

            mediaRecorderRef.current.onpause = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);
            }

            mediaRecorderRef.current.start();
            startVisualisation(stream);

        } catch (err) {
            console.log('Error accessing microphone', err);
        }
    }

    const deleteAudioMsg = () => {
        setIsRecording(false);
        setIsPaused(false);
        setActivateVoiceMsg(false);
        setAudioUrl(null);
        setTime('00:00');
    }



    

    return {

        canvasRef,
        time,

        activateVoiceMsg,
        isRecording,
        isPaused,
        audioUrl,

        pauseRecord,
        resumeRecord,
        startRecord,
        deleteAudioMsg,
        resetRecord,
        stopRecord
    }

}

export default useVoiceMsg;