import { useContext } from "react";
import { DesignContext } from "../context/DesignContext";
import useConfirmation from "../hooks/password/useConfirmation";

function Confirmation() {
    const design = useContext(DesignContext);
    const colors = design?.colors;

    const {formData, handleChanges, submitOPT} = useConfirmation();

  return (
    <div className={`flex flex-col items-center justify-center w-full  h-full`}>
            <div className={`w-11/12 md:w-5/12 p-6 rounded-[30px] shadow-md  bg-clip-padding`}
                style={{backgroundColor: colors?.bgColor}}>
                <h1 className={`text-3xl font-black text-center`}
                    style={{color: colors?.headerColor}}>
                    Verify your identity
                </h1>

                <p className={`text-xl font-black text-center pt-5`}
                    style={{color: colors?.textColor}}>
                    We’ve sent a one-time password  to your registered email address (s***@g***.com). Please enter it below to continue.
                </p>
    
                <form className="flex flex-col gap-4 pt-10" onSubmit={submitOPT}>
            
                    <input 
                        type='number' 
                        name="namber1"
                        required
                        value={''}
                        onChange={handleChanges}
                        className={`w-full input input-bordered h-10  pl-2 mt-2`}  
                        style={{backgroundColor: colors?.inputColor}}/>
                
    
    
                    <div className="w-full flex justify-center">
                        <button type="submit" className={`font-bold py-2 px-4 text-xl  rounded-[10px] `}
                                style={{color: colors?.headerColor, backgroundColor: colors?.buttonColor}}>Login</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default Confirmation
