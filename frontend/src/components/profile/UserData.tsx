import { useContext} from "react";
import InputData from "./InputData";
import { SquareCheckBig } from 'lucide-react';
import { DesignContext } from "../../context/DesignContext";
import useUserProfile from "../../hooks/profile/useUserProfile";

function UserData() {
    const design = useContext(DesignContext);

   const { 
    isChanges, 
    user, 
    imageUrl,
    handleImageChange,
    handleData,
    handleUpdate
   } = useUserProfile() ?? { isChanges: false };

  return (
    <div className="relative flex flex-col justify-around align-center text-center gap-4 w-full md:w-80 px-5 py-5 border-b-4 md:border-b-0 md:border-r-4 border-[rgba(255,255,255,0.3)] rounded ">
       <h2 className="text-start font-bold" 
           style={{color: !design?.thema ? design?.colors.buttonColor : design?.colors.msgHeader}}>User Profile</h2>
        <div className={`group absolute top-4 right-4 cursor-pointer ${!isChanges ? 'hidden' : 'block'}`}
              onClick={() => typeof handleUpdate !== 'undefined' ? handleUpdate() : {}}
            
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
        <label>

           <input
              type="file"
              accept="image/*"
              className="sr-only" 
              onChange={handleImageChange}/>

          <img src={imageUrl} alt="Profile picture of user" className="w-20 h-20 mx-auto  rounded-full"  />
        </label>

        { typeof handleData !== 'undefined' && <>
          <InputData name="email" title="Email" userValue={user!.email || ''} fun={handleData}/>
          <InputData name="fullName" title="Full Name" userValue={user!.fullName || ''} fun={handleData}/>
          <InputData name="username" title="Username" userValue={user!.username || ''} fun={handleData}/>
          <InputData name="gender" title="Gender" userValue={user!.gender || ''} fun={handleData}/>
        </> }
    </div>
  )
}

export default UserData
