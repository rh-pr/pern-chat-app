import { LogOut } from "lucide-react";
import { useContext } from "react";
import { DesignContext } from "../../context/DesignContext";

const LogOutBtn = () => {
	const design = useContext(DesignContext);

	const logout = () => {
		alert("You are logged out");
	};

	return (
		<div className='mt-auto'
			 style={{color: design?.thema ? design.colors.headerColor : design?.colors.bgColor}}>
			<LogOut className='w-6 h-6 font-black text-3xl  cursor-pointer' onClick={logout} />
		</div>
	);
};
export default LogOutBtn;