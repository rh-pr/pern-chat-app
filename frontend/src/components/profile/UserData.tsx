import { useContext, useEffect, useState } from "react";
import useAuthStore from "../../stores/useAuthStore"
import InputData from "./InputData";
import { UpdatadUserDataType, UserType } from "../../types/main";
import { SquareCheckBig } from 'lucide-react';
import { DesignContext } from "../../context/DesignContext";
import { updateCurrentUser } from "../../servieces/authService";
import { useNavigate } from "react-router-dom";

function UserData() {
    const currentUser = useAuthStore(state => state.currentUser);
    const setCurrentUser = useAuthStore(state => state.setCurrentUser);
    const design = useContext(DesignContext);
    const navigate = useNavigate();


    const [user, setUser] = useState<UpdatadUserDataType | null>(currentUser ?? null);
    const [isChanges, setIsChannges] = useState<boolean>(false);
    
    
    useEffect(()=> {
      if(currentUser ) { 
        setUser(currentUser);
      }
    },[currentUser])

    if (!currentUser) return null;

    const handleData = async (field: keyof UserType, newData: string | File) => {
      if(typeof newData === 'string' && newData.trim().length < 0) return;
      setUser(prev => (prev ? { ...prev, [field]: newData } : prev));

      setIsChannges(true);

    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      handleData("profilePic", file);
    };

    const handleUpdate = async () => {
      if (user) {
        const res = await updateCurrentUser(user);
        setCurrentUser(res);
        navigate('/profile')
      }
    }

  return (
    <div className="relative flex flex-col justify-around align-center text-center gap-4 w-full md:w-80 px-5 py-5 border-b-4 md:border-b-0 md:border-r-4 border-[rgba(255,255,255,0.3)] rounded ">
       <h2 className="text-start font-bold" 
           style={{color: !design?.thema ? design?.colors.buttonColor : design?.colors.msgHeader}}>User Profile</h2>
        <div className={`group absolute top-4 right-4 cursor-pointer ${!isChanges ? 'hidden' : 'block'}`}
              onClick={() => handleUpdate()}
            
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

          <img src={user!.profilePic as string} alt="Profile picture of user" className="w-20 h-20 mx-auto "  />
        </label>
            
        <InputData name="email" title="Email" userValue={user!.email} fun={handleData}/>
        <InputData name="fullName" title="Full Name" userValue={user!.fullName} fun={handleData}/>
        <InputData name="username" title="Username" userValue={user!.username} fun={handleData}/>
        <InputData name="gender" title="Gender" userValue={user!.gender} fun={handleData}/>
    </div>
  )
}

export default UserData
