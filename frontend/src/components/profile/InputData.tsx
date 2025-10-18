import { useContext } from "react"
import { DesignContext } from "../../context/DesignContext"


type ProfileInputType = {
    name: string,
    title: string,
    userValue: string,
    fun?: (field: string, newData: string) => void
}

function InputData({name, title, userValue, fun}: ProfileInputType) {
  const design = useContext(DesignContext);

  return (
    <div className="relative w-60">
            <label
                htmlFor="email"
                className={`absolute -top-[10px]  left-3 px-1 text-[10px] text-gray-500`}
                style={{backgroundColor: design?.colors.inputColor}}
            >
                {title}
            </label>
            <input
                id={name}
                type="text"
                value={userValue} 
                onChange={() => fun}
                className="border-2 border-gray-300 rounded-lg w-full h-12 focus:outline-none focus:border-gray-100 text-center"
            />
        </div>
  )
}

export default InputData
