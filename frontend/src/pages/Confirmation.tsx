import { useContext } from "react";
import { DesignContext } from "../context/DesignContext";
import useConfirmation from "../hooks/password/useConfirmation";
import { Link, useLocation } from "react-router-dom";
import CodeTimer from "../components/userData/CodeTimer";

function Confirmation() {
    const design = useContext(DesignContext);
    const colors = design?.colors;

    const {formData, handleChanges, submitOPT} = useConfirmation();

    const location = useLocation();

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
                    We’ve sent a one-time password  to your registered email address ({location.state.email[0]}***@g***.com). Please enter it below to continue.
                </p>
    
                <form className="flex flex-col gap-4 pt-10" onSubmit={submitOPT}>
            
                    <div className="flex justify-between gap-2 px-10">
                       {formData.map((val: string, ind: number) => 
                        <input 
                            key={`code-${ind}`}
                            type='text' 
                            name="namber1"
                            required
                            value={val}
                            maxLength={1}
                            max={9}
                            onChange={(e) => handleChanges(e.target.value, ind)}
                            className={`w-2/12 input input-bordered font-bolder text-xl md:text-3xl h-[48px] md:h-[64px] text-center mt-2`}  
                            style={{backgroundColor: colors?.inputColor}}/>)}
                </div>

                    <div className="w-full text-right">
                        <Link
                            to='/login'
                            className={`text-sm  hover:underline  ${design?.thema ? 'text-[#747575] hover:text-[#614318]' : 'text-white hover:text-[#EED3B1]'}   text-right mt-2 inline-block`}
                        >
                            Go to Login Page

                        </Link>
                    </div>

                    <div className="text-center mt-4 text-3xl md:text-4xl mb-5 mt-[-10px]" style={{color: colors?.textColor}}    >
                       <CodeTimer />
                    </div>
                    <div className="w-full flex justify-center ">
                        <button type="submit" className={`font-bold py-2 px-4 text-xl  rounded-[10px] `}
                                style={{color: colors?.headerColor, backgroundColor: colors?.buttonColor}}>Next</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default Confirmation
