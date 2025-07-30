    import { useContext } from "react";
    import { Link } from "react-router-dom";
    import { DesignContext } from "../context/DesignContext";
    import { X } from 'lucide-react';
    import { useSignupForm } from "../hooks/auth/useSignup";

    function SignUp() {
        const design = useContext(DesignContext);
        const colors = design?.colors;

        const {
            isFile,
            imgFile,
            formData,
            msgError,
            handleSignupForm, 
            handleChanges, 
            deleteFile} = useSignupForm();
       
    
      return (
        <div className={`flex flex-col items-center justify-center w-full   h-full`}>
            <div className={`w-11/12 md:w-5/12 p-6 rounded-[30px] shadow-md h-[80vh] md:h-[90vh] overflow-auto sscrollbar-hide bg-clip-padding`}
                style={{backgroundColor: colors?.bgColor, scrollbarWidth: 'none'}}>
                <h1 className={`text-xl md:text-3xl font-black text-center`}
                    style={{color: colors?.headerColor}}>
                    SignUp
                    <span className={``}> ChatApp</span>
                </h1>
    
                <form className="flex flex-col gap-4 pt-10" onSubmit={handleSignupForm}>
                    <div >
                        <label className={`label`}>
                            <span 
                                className={` font-bold text-lg md:text-xl`} 
                                style={{color: colors?.textColor}}>
                                    Username
                            </span>
                        </label>
                        <input 
                            type='text' 
                            name="username"
                            required
                            value={formData.username}
                            onChange={handleChanges}
                            placeholder='Enter username' 
                            className={`w-full input input-bordered h-8 md:h-10  pl-2 mt-2`}  
                            style={{backgroundColor: colors?.inputColor}}/>
                    </div>
    
                    <div >
                        <label className={`label`}>
                            <span 
                                className={` font-bold text-lg md:text-xl`} 
                                style={{color: colors?.textColor}}>
                                    Full Name
                            </span>
                        </label>
                        <input 
                            type='text' 
                            name="fullname"
                            required
                            value={formData.fullname}
                            onChange={handleChanges}
                            placeholder='Enter username' 
                            className={`w-full input input-bordered h-8 md:h-10  pl-2 mt-2`}  
                            style={{backgroundColor: colors?.inputColor}}/>
                    </div>

                    <div >
                        <label className={`label`}>
                            <span 
                                className={` font-bold text-lg md:text-xl`} 
                                style={{color: colors?.textColor}}>
                                    Email
                            </span>
                        </label>
                        <input 
                            type='email' 
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChanges}
                            placeholder='Enter username' 
                            className={`w-full input input-bordered h-8 md:h-10  pl-2 mt-2`}  
                            style={{backgroundColor: colors?.inputColor}}/>
                    </div>
    
    
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
                            value={formData.password}
                            onChange={handleChanges}
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
                            value={formData.confirm}
                            onChange={handleChanges}
                            minLength={6}
                            placeholder='Enter Password'
                            className={`w-full input input-bordered h-8 md:h-10 pl-2 mt-2 `}
                            style={{backgroundColor: colors?.inputColor}} />
                    </div>

                    <div className={`flex  flex-row justify-between`}>
                        <label className={`label flex flex-column`} >
                            <span 
                                className={`font-bold text-lg md:text-xl`} 
                                style={{color: colors?.textColor}}>
                                    Photo
                            </span>
                            <input
                                type='file'
                                name="photo"
                                onChange={handleChanges}
                                placeholder='photo'
                                className={`hidden pl-2 input input-bordered `}
                                style={{backgroundColor: colors?.inputColor}} />
                        </label>



                        {isFile && imgFile && ( <figure
                            className="relative w-30 h-30 md:w-40 md:h-40 rounded-[10px] overflow-hidden"
                            style={{ backgroundColor: colors?.inputColor }}>
                            <button
                                className={`absolute top-1 z-10 font-black p-1 text-${colors?.bgColor}`}
                                onClick={deleteFile}
                                >
                                <X />
                            </button>

                            <img
                                src={URL.createObjectURL(imgFile)}
                                alt={imgFile.name}
                                className="w-full h-full bg-cover rounded-md"
                            />
                        </figure>
                        )}
                    </div>
    
                    <div>
                       <div className="w-full flex gap-10 ">
                          <div className="flex items-center gap-4">
                            <label htmlFor="male"  className={`font-bold text-lg md:text-xl`}  style={{color: colors?.textColor}} >Male</label>
                            <input type="radio" 
                                   id="male" 
                                   name="gender" 
                                   value="male"  
                                   required
                                   onChange={handleChanges}
                                   className={`radio w-full input input-bordered h-4 md:h-6 pl-2 mt-2 `}/>
                          </div>
                           <div className="flex items-center gap-4">
                           <label htmlFor="female"  className={`font-bold text-lg md:text-xl`}  style={{color: colors?.textColor}} >Female</label>
                           <input type="radio" 
                                  id="female" 
                                  name="gender" 
                                  value="female"  
                                  required
                                  onChange={handleChanges}
                                  className={`radio w-full input input-bordered h-4 md:h-6 pl-2 mt-2 `}/>
                           </div>
                       </div>
                    </div>

                    {msgError.trim().length > 0 && <p className="text-red-600 font-bold">{msgError}</p>}
    
                    <Link
                        to='/login'
                        className={`text-sm  hover:underline  ${design?.thema ? 'text-[#747575] hover:text-[#614318]' : 'text-white hover:text-[#EED3B1]'}   text-right mt-2 inline-block`}
                    >
                        {"Already"} have an account?
                    </Link>
    
                    <div className="w-full flex justify-center">
                        <button type="submit" className={`font-bold py-2 px-4 text-lg md:text-xl  rounded-[10px] `}
                                style={{color: colors?.headerColor, backgroundColor: colors?.buttonColor}}>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
      )
    }
    
    export default SignUp