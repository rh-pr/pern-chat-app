import { useContext } from "react"
import { DesignContext } from "../../context/DesignContext"
import LogOutBtn from "./LogOutBtn";
import InputData from "./InputData";
import { SquareCheckBig } from 'lucide-react';

function Settings() {
  const design = useContext(DesignContext);

  return (
    <div className="relative flex flex-col align-center text-center gap-4 w-full md:w-80 px-5 py-5 border-b-4  md:border-b-0 md:border-r-4 border-[rgba(255,255,255,0.3)] rounded ">
       <h2 className="text-start font-bold"  style={{color: !design?.thema ? design?.colors.buttonColor : design?.colors.msgHeader}}>Settings</h2>
       
       <div className="w-60 grid grid-cols-3 justify-between align-center font-medium"
             style={{color: !design?.thema ? design?.colors.buttonColor : design?.colors.msgHeader}}>
          <p>Sound </p>
          <label htmlFor="soundOn" className="flex flex-col font-medium">
            On
            <input type="checkbox" name="soundOn" id="soundOn" 
                   checked={design?.sound} 
                   onChange={() => design?.setSound(!design.sound)} 
                   className="h-5 mt-2"
                   style={{
                    accentColor: design?.colors.buttonColor,
                    cursor: "pointer",
                  }}/>
          </label>
          <label htmlFor="soundOff" className="flex flex-col">
            Off
            <input type="checkbox" name="soundOff" id="soundOff" 
                   checked={!design?.sound} 
                   onChange={() => design?.setSound(!design.sound)} 
                   className="h-5 mt-2"
                   style={{
                    accentColor: design?.colors.buttonColor,
                    cursor: "pointer",
                  }}/>
          </label>
       </div>

       <div className="w-60 grid grid-cols-3 justify-between align-center font-medium" 
             style={{color: !design?.thema ? design?.colors.buttonColor : design?.colors.msgHeader}}>
          <p className="">Thema </p>
          <label htmlFor="ligth" className="flex flex-col">
            Light
            <input type="checkbox" name="ligth" id="ligth" 
                   checked={!design?.thema} 
                   onChange={() => design?.setThema(!design.thema)} 
                   className="h-5 mt-2"
                   style={{
                    accentColor: design?.colors.buttonColor,
                    cursor: "pointer",
                  }}/>
          </label>
          <label htmlFor="dark" className="flex flex-col">
            Dark
            <input type="checkbox" name="dark" id="dark" 
                   checked={design?.thema} 
                   onChange={() => design?.setThema(!design.thema)} 
                   className="h-5 mt-2"
                   style={{
                    accentColor: design?.colors.buttonColor,
                    cursor: "pointer",
                  }}/>
          </label>
       </div>

      <div className="w-60 grid grid-cols-3 gap-4 rows-3 font-medium my-4"
           style={{color: !design?.thema ? design?.colors.buttonColor : design?.colors.msgHeader}}>
          <p className="col-span-3 text-left pl-4 underline cursor-pointer pb-4">Change Password </p>
          <div className="group absolute top-4 right-4 cursor-pointer"
             style={
              {
                "--icon-color": !design?.thema ? design?.colors.buttonColor : design?.colors.msgHeader,
                "--icon-hover-color": design?.colors.headerColor,
              } as React.CSSProperties
            } >
            <SquareCheckBig
              className="transition-colors duration-300 text-[color:var(--icon-color)] group-hover:text-[color:var(--icon-hover-color)]"
            />

          </div>
          <div className="col-span-3 pl-4 "><InputData name="oldPassword" title="Old" userValue="" fun={() => {}}/></div>
           <div className="col-span-3 pl-4"><InputData name="nwPassword" title="New" userValue="" fun={() => {}}/> </div>
      </div>

      <LogOutBtn />
    </div>
  )
}

export default Settings
