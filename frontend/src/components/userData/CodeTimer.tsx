import useConfirmation from "../../hooks/password/useConfirmation"


function CodeTimer() {
    const { minutes, seconds } = useConfirmation();
    
  return (
    <div>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  )
}

export default CodeTimer
