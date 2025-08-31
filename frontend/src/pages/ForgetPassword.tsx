import { useContext } from "react";
import { DesignContext } from "../context/DesignContext";
import useForgetPassword from "../hooks/password/useForgetPassword";
import { Link } from "react-router-dom";

function ForgetPassword() {
    const design = useContext(DesignContext);
    const colors = design?.colors;
    const {formData, loading, errorMessage, handleChanges, submitEmail} = useForgetPassword();
    
  return (
     <div className={`flex flex-col items-center justify-center w-full  h-full`}>
            <div className={`w-11/12 md:w-5/12 p-6 rounded-[30px] shadow-md  bg-clip-padding`}
                style={{backgroundColor: colors?.bgColor}}>
                <p className={`text-3xl font-black text-center`}
                    style={{color: colors?.headerColor}}>
                   Enter your email to reset your password
                </p>
    
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
                    
                  <div className="w-full text-right">
                      <Link
                        to='/login'
                        className={`text-sm   hover:underline  ${design?.thema ? 'text-[#747575] hover:text-[#614318]' : 'text-white hover:text-[#EED3B1]'}   text-right mt-2 inline-block`}
                        >
                            Go to Login Page
                        </Link>
                  </div>

                    <div className="w-full flex justify-center">
                        <button disabled={loading} type="submit" className={`font-bold py-2 px-4 text-xl  rounded-[10px] `}
                                style={{color: colors?.headerColor, backgroundColor: colors?.buttonColor}}>{loading ? 'Loading...' : 'Next' }</button>
                    </div>

                    {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

                </form>
            </div>
        </div>
  )
}

export default ForgetPassword
