import { useContext, useState } from "react";
import useAuthStore from "../../stores/useAuthStore"
import InputData from "./InputData";
import { UserType } from "../../types/main";
import { SquareCheckBig } from 'lucide-react';
import { DesignContext } from "../../context/DesignContext";

function UserData() {
    const currentUser = useAuthStore(state => state.currentUser);
    const design = useContext(DesignContext);

    const [user, setUser] = useState<UserType | null>(currentUser ?? null);
    if (!currentUser) return null;

    const handleData = (field: string, newData: string, type?: string) => {
        setUser(prev => (prev ? { ...prev, [field]: newData } : prev));
    };

  return (
    <div className="relative flex flex-col justify-around align-center text-center gap-4 w-full md:w-80 px-5 py-5 border-b-4 border-[rgba(255,255,255,0.3)] rounded ">
       <h2 className="text-start font-bold" style={{color: design?.colors.buttonColor}}>User Profile</h2>
        <div className="group absolute top-4 right-4 cursor-pointer"
             style={
              {
                "--icon-color": design?.colors.buttonColor,
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
              onChange={() => handleData('profilePic', 'image')}/>

          <img src={user!.profilePic} alt="Profile picture of user" className="w-20 h-20 mx-auto "  />
        </label>
            
        <InputData name="email" title="Email" userValue={user!.email} fun={handleData}/>
        <InputData name="fullName" title="Full Name" userValue={user!.fullName} fun={handleData}/>
        <InputData name="username" title="Username" userValue={user!.username} fun={handleData}/>
        <InputData name="gender" title="Gender" userValue={user!.gender} fun={handleData}/>
    </div>
  )
}

export default UserData
