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
    const setIsRecording = useVoiceMsgStore((state) => state.setIsRecording);
    const audioMsg = useVoiceMsgStore((state) => state.audioMsg);

    const setAudioMsg = useVoiceMsgStore((state) => state.setAudioMsg);
    const activeConversationId = useConversationsStore((state) => state.activeConversationId)


    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [time, setTime] = useState<string>('00:00');
    const [, setTimeCounter] = useState<number>(0);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    
    
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | undefined;;
        if (activateVoiceMsg) {
            interval = setInterval(() => {
              setTimeCounter(prev => {
                const updatedTime = prev + 1;
                const minutes = Math.floor((updatedTime % 360000) / 6000);
                const seconds = Math.floor((updatedTime % 6000) / 100);
                const str =
                minutes.toString().padStart(2, "0") +
                ":" +
                seconds.toString().padStart(2, "0");
                setTime(str);
                return updatedTime;
            });
            }, 10);
        }
        return () => clearInterval(interval);
    },[isRecording])


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
            // stopVisualisation();
            // if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive' ) {
            //     mediaRecorderRef.current.stop();
            //     mediaRecorderRef.current.stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
            // }
            // if (audioUrl) {
            //     URL.revokeObjectURL(audioUrl);
            // }
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
        sourceRef.current = source;

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
            canvasCtx.fillStyle = design?.colors.bgColor || '#939393';

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

        if(sourceRef.current) {
            sourceRef.current.disconnect();
            sourceRef.current = null;
        }

        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close().catch(e => console.error("Error closing AudioContext", e));
        }
        audioContextRef.current = null;
        analyserRef.current = null;   
    }
    
    
    // const handleRecorderStop = (createFile: boolean = false): Promise<File | null> => {
    //     return new Promise((resolve) => {
    //         if (!mediaRecorderRef.current) return resolve(null);

    //         mediaRecorderRef.current.onstop = () => {
    //             audioBlob.current = new Blob(audioChunksRef.current, { type: "audio/webm" });

    //             let result: File | string | null = null;

    //             if (createFile) {
    //                 result = new File([audioBlob.current], "recording_msg.webm", { type: "audio/webm" });
    //                 setAudioMsg(result as File);
    //             } else {
    //                 result = URL.createObjectURL(audioBlob.current);
    //                 setAudioUrl(result as string);
    //             }

    //             audioChunksRef.current = [];
    //             mediaRecorderRef.current?.stream.getTracks().forEach((track) => track.stop());

    //             resolve(createFile ? (result as File) : null);
    //         };

    //         if (mediaRecorderRef.current.state !== "inactive") {
    //             mediaRecorderRef.current.stop();
    //         } else {
    //             resolve(null);
    //         }
    //     });
    // };

    const handleRecorderStop = () => {
            if (!mediaRecorderRef.current) return;

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
                const url = URL.createObjectURL(audioBlob);
                const file = new File([audioBlob], "recording_msg.webm", { type: "audio/webm" });
                
                setAudioUrl(url);
                setAudioMsg(file)
               
                audioChunksRef.current = [];
                mediaRecorderRef.current?.stream.getTracks().forEach((track) => track.stop());

            };

            if (mediaRecorderRef.current.state !== "inactive") {
                mediaRecorderRef.current.stop();
            } 
    };
    
    const startRecord = async () => {
        setActivateVoiceMsg(true);
        setIsRecording(true);

        audioChunksRef.current = [];
        setAudioUrl("");

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);

            recorder.ondataavailable = (e: BlobEvent) => {
                audioChunksRef.current.push(e.data);
            };

            mediaRecorderRef.current = recorder;
            recorder.start();
            startVisualisation(stream);
        } catch (err) {
            console.error("Error accessing microphone", err);
        }
    };

    const preLoadAudio = async () => {
        handleRecorderStop();

        setIsRecording(false);
        stopVisualisation();
        setTimeCounter(0);
        setTime("00:00");

    };

    const stopRecord = async (): Promise<File | null> => {
        setIsRecording(false);
        setActivateVoiceMsg(false);
        stopVisualisation();
        setTimeCounter(0);
        setTime("00:00");

        return  new Promise(resolve => { 
            if (audioMsg) {
                resolve(audioMsg);
            } else {
                resolve(null);
            }
        })
    };


    const deleteAudioMsg = () => {
        setIsRecording(false);
        setActivateVoiceMsg(false);
        setAudioUrl(null);
        setTime('00:00');
        setTimeCounter(0);
        audioChunksRef.current = [];
        mediaRecorderRef.current = null;
    }

    return {

        canvasRef,
        mediaRecorderRef,
        
        time,

        activateVoiceMsg,
        isRecording,
        isPaused,
        audioUrl,

        preLoadAudio,
        startRecord,
        deleteAudioMsg,
        stopRecord
    }

}

export default useVoiceMsg;

