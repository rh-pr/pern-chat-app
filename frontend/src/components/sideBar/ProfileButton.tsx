import { useContext } from "react";
import { DesignContext } from "../../context/DesignContext";
import { CircleUser } from 'lucide-react';
import { useNavigate } from "react-router-dom";

function ProfileButton() {
	const navigate = useNavigate();

    const design = useContext(DesignContext);

	return (
		<div className='mt-auto w-fit p-2 shadow-lg rounded-full'
			 style={{color: design?.thema ? design.colors.headerColor : design?.colors.bgColor}}>
			<CircleUser className='w-7 h-7 font-black text-3xl  cursor-pointer' onClick={() => {navigate('/profile')}} />
		</div>
	);
}

export default ProfileButton
