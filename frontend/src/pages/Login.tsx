    import { Link } from "react-router-dom";
    import { useContext } from "react";
    import { DesignContext } from "../context/DesignContext";
    import { useLoginForm } from "../hooks/auth/useLogin";
   
    function Login() {
       const design = useContext(DesignContext);
       const colors = design?.colors;
       const {formData, loading, isError, handleChanges, handleLoginForm } = useLoginForm();

      return (
            <div className={`flex flex-col items-center justify-center w-full  h-full`}>
            <div className={`w-11/12 md:w-5/12 p-6 rounded-[30px] shadow-md  bg-clip-padding`}
                style={{backgroundColor: colors?.bgColor}}>
                <h1 className={`text-3xl font-black text-center`}
                    style={{color: colors?.headerColor}}>
                    Login
                    <span className={``}> ChatApp</span>
                </h1>
    
                <form className="flex flex-col gap-4 pt-10" onSubmit={handleLoginForm}>
                    <div >
                        <label className={`label`}>
                            <span 
                                className={` font-bold text-xl`} 
                                style={{color: colors?.textColor}}>
                                    Username
                            </span>
                        </label>
                        <input 
                            type='text' 
                            name="username"
                            required
                            placeholder='Enter username' 
                            value={formData.username}
                            onChange={handleChanges}
                            className={`w-full input input-bordered h-10  pl-2 mt-2`}  
                            style={{backgroundColor: colors?.inputColor}}/>
                    </div>
    
                    <div>
                        <label className={`label`}>
                            <span 
                                className={`font-bold text-xl`} 
                                style={{color: colors?.textColor}}>
                                    Password
                            </span>
                        </label>
                        <input
                            type='password'
                            name="password"
                            required
                            placeholder='Enter Password'
                            value={formData.password}
                            onChange={handleChanges}
                            className={`w-full input input-bordered h-10 bg-[${colors?.inputColor}] pl-2 mt-2 `}
                            style={{backgroundColor: colors?.inputColor}} />
                    </div>
    
                    {isError && <p className="text-red-600 font-bold">Something go wrong... Try again or create acount!</p>}
                   <div className="flex justify-between ">
                     <Link
                        to='/signup'
                        className={`text-sm  hover:underline  ${design?.thema ? 'text-[#747575] hover:text-[#614318]' : 'text-white hover:text-[#EED3B1]'}   text-right mt-2 inline-block`}
                    >
                       {"Don't"} have an account? 

                    </Link>
                        <Link
                        to='/forget'
                        className={`text-sm  hover:underline  ${design?.thema ? 'text-[#747575] hover:text-[#614318]' : 'text-white hover:text-[#EED3B1]'}   text-right mt-2 inline-block`}
                    >
                        Forget the password? 

                    </Link>
                   </div>
    
    
                    <div className="w-full flex justify-center">
                        <button disabled={loading} type="submit" className={`font-bold py-2 px-4 text-xl  rounded-[10px] `}
                                style={{color: colors?.headerColor, backgroundColor: colors?.buttonColor}}>{loading ? 'Login...' : 'Login'}</button>
                    </div>
                </form>
            </div>
        </div>
      )
    }
    
    export default Login