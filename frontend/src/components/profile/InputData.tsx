import { useContext } from "react"
import { DesignContext } from "../../context/DesignContext"
import { UserType } from "../../types/main";


type ProfileInputType = {
    name: keyof UserType,
    title: string,
    userValue: string,
    fun: (field: keyof UserType, newValue: string | File) => void;
}

function InputData({name, title, userValue, fun}: ProfileInputType) {
  const design = useContext(DesignContext);

  return (
    <div className="relative w-60">
            <label
                htmlFor="email"
                className={`absolute w-18  text-left top-[-7px]  left-3 px-1 text-[12px] font-bold text-gray-500 rounded-sm`}
                style={{backgroundColor: design?.colors.inputColor,
                    color: !design?.thema ? design?.colors.buttonColor : design?.colors.msgHeader}}
            >
                {title}
            </label>
            <input
                id={name}
                type="text"
                defaultValue={userValue} 
                style={{backgroundColor: design?.colors.inputColor,
                    color: !design?.thema ? design?.colors.buttonColor : design?.colors.msgHeader}}
                onChange={(e) => fun(name, e.target.value)}
                className="border-2 border-gray-300 rounded-lg  h-12 focus:outline-none focus:border-gray-100 text-center font-bold"
            />
        </div>
  )
}

export default InputData
