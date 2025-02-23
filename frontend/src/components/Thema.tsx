import { useContext } from "react"
import { DesignContext } from "../context/DesignContext"


function Thema() {
    const design = useContext(DesignContext);

    const changeThema = (e) => {
        design?.setThema(e.target.checked);
    }
  return (
    <label className={`fixed right-2 top-2 w-12 h-6  rounded-lg`}>
        <input className="opacity-0" type="checkbox"onChange={(e) => changeThema(e)} />
        <span className="slider round absolute pointer top-0 right-0 left-0 bottom-0  duration-[0.4s] rounded-lg"></span>
  </label>
  )
}

export default Thema
