import { useContext } from "react";
import { DesignContext } from "../context/DesignContext";

import Starfield from 'react-starfield';
import { ArrowLeftFromLine } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import UserData from "../components/profile/UserData";
import Settings from "../components/profile/Settings";

function Profile() {

const design = useContext(DesignContext);
const naviage = useNavigate();
  
	return (
		<div className='landscape:mt-8 flex h-[88vh] md:h-[80vh] w-full md:max-w-11/12 md md:h-10/12 rounded-lg overflow-hidden bg-transparent backdrop-filter backdrop-blur-lg '
         style={{boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'}}
         >
      <Starfield 
            starCount={1000}
            starColor={design?.thema ? [4, 63, 3] : [2, 129, 0]} 
            speedFactor={0}
            backgroundColor="rgba(112, 108, 108, 0)"
            />
      <div className="p-10 w-full h-full flex flex-col justify-between ">
        <div className=" w-8 h-8 p-1 rounded-full " 
             style={{ 
              color: !design?.thema ?  design?.colors.buttonColor : design?.colors.headerColor,
              fontWeight: 'black',
              background: design?.thema ? `rgba(0,0,0,0.3)` : 'none'
            }}
             onClick={() => { naviage('/') }}>
         <div className="rounded-md shadow-md shadow-white h-8 w-8 p-1"> <ArrowLeftFromLine /> </div>
        </div>
        <div className=" h-full px-4 border-l-1 flex flex-col md:flex-row gap-4 align-center overflow-y-auto"
             style={{
              borderLeftColor: design?.colors.buttonColor,
              boxShadow: `-2px 0px 10px 0px white`
            
            }}
             >
          <UserData />
          <Settings />
        </div>
      </div>
		</div>
	);

}

export default Profile
