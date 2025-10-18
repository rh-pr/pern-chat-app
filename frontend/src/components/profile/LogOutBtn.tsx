import { LogOut } from "lucide-react";
import { useContext } from "react";
import { DesignContext } from "../../context/DesignContext";
import { useLogout } from "../../hooks/auth/useLogout";

const LogOutBtn = () => {
	const design = useContext(DesignContext);
	const { handleLogout } = useLogout();


	return (
		<div className='mt-auto'
			 style={{color: design?.thema ? design.colors.headerColor : design?.colors.bgColor}}>
			<LogOut className='w-6 h-6 font-black text-3xl  cursor-pointer' onClick={handleLogout} />
		</div>
	);
};
export default LogOutBtn;