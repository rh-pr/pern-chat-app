import { useEffect, useState } from 'react';

function AudioMessage({ audioSource }: { audioSource: string | File }) {
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    if (!audioSource) return;

    let objectUrl: string | undefined;

    if (typeof audioSource === 'string') {
      setSource(audioSource);
    } else if (audioSource instanceof File) {
      objectUrl = URL.createObjectURL(audioSource);
      setSource(objectUrl);
    } else {
      console.error('Invalid audioSource', audioSource);
      setSource(null);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl); // cleanup
      }
    };
  }, [audioSource]);

  if (!source) return null;

  return <audio className='w-[64vw] md:w-[24vw] h-[40px]' src={source} controls />;
}

export default AudioMessage;
