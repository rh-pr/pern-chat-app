import { useContext } from "react";
import { DesignContext } from "../context/DesignContext";
import useForgetPassword from "../hooks/password/useForgetPassword";

function ForgetPassword() {
    const design = useContext(DesignContext);
    const colors = design?.colors;
    const {formData, handleChanges, submitEmail} = useForgetPassword();
    
  return (
     <div className={`flex flex-col items-center justify-center w-full  h-full`}>
            <div className={`w-11/12 md:w-5/12 p-6 rounded-[30px] shadow-md  bg-clip-padding`}
                style={{backgroundColor: colors?.bgColor}}>
                <h1 className={`text-3xl font-black text-center`}
                    style={{color: colors?.headerColor}}>
                    Login
                    <span className={``}> ChatApp</span>
                </h1>
    
                <form className="flex flex-col gap-4 pt-10" onSubmit={submitEmail}>
                    <div >
                        <label className={`label`}>
                            <span 
                                className={` font-bold text-xl`} 
                                style={{color: colors?.textColor}}>
                                    Email
                            </span>
                        </label>
                        <input 
                            type='email' 
                            name="email"
                            required
                            placeholder='Enter Email' 
                            value={formData}
                            onChange={handleChanges}
                            className={`w-full input input-bordered h-10  pl-2 mt-2`}  
                            style={{backgroundColor: colors?.inputColor}}/>
                    </div>
    
    
                    <div className="w-full flex justify-center">
                        <button type="submit" className={`font-bold py-2 px-4 text-xl  rounded-[10px] `}
                                style={{color: colors?.headerColor, backgroundColor: colors?.buttonColor}}>Login</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default ForgetPassword
