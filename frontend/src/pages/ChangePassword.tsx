import { useContext } from "react";
import { DesignContext } from "../context/DesignContext";
import { Link } from "react-router-dom";


function ChangePassword() {
  const design = useContext(DesignContext);
  const colors = design?.colors;


  return (
    <div className={`flex flex-col items-center justify-center w-full  h-full`}>
            <div className={`w-11/12 md:w-5/12 p-6 rounded-[30px] shadow-md  bg-clip-padding`}
                style={{backgroundColor: colors?.bgColor}}>
                <h1 className={`text-3xl font-black text-center`}
                    style={{color: colors?.headerColor}}>
                   Change your password
                </h1>

    
                <form className="flex flex-col gap-4 pt-10" onSubmit={() => {}}>
            
                   <div>
                        <label className={`label`}>
                            <span 
                                className={`font-bold text-lg md:text-xl`} 
                                style={{color: colors?.textColor}}>
                                    Password
                            </span>
                        </label>
                        <input
                            type='password'
                            name="password"
                            required
                            value={''}
                            onChange={ () => {} }
                            minLength={6}
                            placeholder='Enter Password'
                            className={`w-full input input-bordered h-8 md:h-10 bg-[${colors?.inputColor}] pl-2 mt-2 `}
                            style={{backgroundColor: colors?.inputColor}} />
                    </div>
    
                    <div>
                        <label className={`label`}>
                            <span 
                                className={`font-bold text-lg md:text-xl`} 
                                style={{color: colors?.textColor}}>
                                    Confirm Password
                            </span>
                        </label>
                        <input
                            type='password'
                            name="confirm"
                            required
                            value={''}
                            onChange={ () => {} }
                            minLength={6}
                            placeholder='Enter Password'
                            className={`w-full input input-bordered h-8 md:h-10 pl-2 mt-2 `}
                            style={{backgroundColor: colors?.inputColor}} />
                    </div>
                
                    <Link
                        to='/login'
                        className={`text-sm  hover:underline  ${design?.thema ? 'text-[#747575] hover:text-[#614318]' : 'text-white hover:text-[#EED3B1]'}   text-right mt-2 inline-block`}
                    >
                       Go to Login Page

                    </Link>
                      
                    <div className="w-full flex justify-center mt-10">
                        <button type="submit" className={`font-bold py-2 px-4 text-xl  rounded-[10px] `}
                                style={{color: colors?.headerColor, backgroundColor: colors?.buttonColor}}>Change Password</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default ChangePassword
