import { ChangeEvent, useContext } from "react"
import { DesignContext } from "../../context/DesignContext"
import { UserType } from "../../types/main";


type ProfileInputType = {
    name: keyof UserType,
    title: string,
    userValue: string,
    type?: string,
    code?: string,
    fun: (field: keyof UserType, newValue: string | File) => void,
    funCode?: (e: ChangeEvent<HTMLInputElement>) => void,
}

function InputData({name, title, userValue, type, code, fun, funCode}: ProfileInputType) {
  const design = useContext(DesignContext);

  return (
    <div className="relative w-60">
            <label
                htmlFor={name}
                className={`absolute w-18  text-left top-[-7px]  left-3 px-1 text-[12px] font-bold text-gray-500 rounded-sm`}
                style={{backgroundColor: design?.colors.inputColor,
                    color: !design?.thema ? design?.colors.buttonColor : design?.colors.msgHeader}}
            >
                {title}
            </label>
            <input
                id={code ? code : name}
                type= {type ? "password" : "text"}
                defaultValue={type ? '' : userValue} 
                style={{backgroundColor: design?.colors.inputColor,
                    color: !design?.thema ? design?.colors.buttonColor : design?.colors.msgHeader}}
                onChange={(e) => code && typeof funCode !== 'undefined' ? funCode(e) : fun(name, e.target.value)}
                className="border-2 border-gray-300 rounded-lg  h-12 focus:outline-none focus:border-gray-100 text-center font-bold"
            />
        </div>
  )
}

export default InputData
