
function AudioMessage({audioSource}: {audioSource: string | File }) {
    const source = typeof audioSource === 'string' ? audioSource : URL.createObjectURL(audioSource);
  return (
    <audio  src={source} controls/> 
  )
}

export default AudioMessage
