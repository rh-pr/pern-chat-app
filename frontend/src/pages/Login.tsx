
import { Link } from "react-router-dom";
import { Colors } from "../types/main";


function Login({thema, colors}: {thema:boolean, colors: Colors}) {
   
      console.log(colors)
  return (
        <div className={`flex flex-col items-center justify-center w-full  h-full`}>
        <div className={` w-5/12 p-6 rounded-[30px] shadow-md  bg-clip-padding`}
            style={{backgroundColor: colors.bgColor}}>
            <h1 className={`text-3xl font-black text-center`}
                style={{color: colors.headerColor}}>
                Login
                <span className={``}> ChatApp</span>
            </h1>

            <form className="flex flex-col gap-4 pt-10">
                <div >
                    <label className={`label`}>
                        <span 
                            className={` font-bold text-xl`} 
                            style={{color: colors.textColor}}>
                                Username
                        </span>
                    </label>
                    <input 
                        type='text' 
                        placeholder='Enter username' 
                        className={`w-full input input-bordered h-10  pl-2 mt-2`}  
                        style={{backgroundColor: colors.inputColor}}/>
                </div>

                <div>
                    <label className={`label`}>
                        <span 
                            className={`font-bold text-xl`} 
                            style={{color: colors.textColor}}>
                                Password
                        </span>
                    </label>
                    <input
                        type='password'
                        placeholder='Enter Password'
                        className={`w-full input input-bordered h-10 bg-[${colors.inputColor}] pl-2 mt-2 `}
                        style={{backgroundColor: colors.inputColor}} />
                </div>

                
                <Link
                    to='/signup'
                    className={`text-sm  hover:underline  ${thema ? 'text-[#747575] hover:text-[#614318]' : 'text-white hover:text-[#EED3B1]'}   text-right mt-2 inline-block`}
                >
                    {"Don't"} have an account?
                </Link>

                <div className="w-full flex justify-center">
                    <button className={`font-bold py-2 px-4 text-xl  rounded-[10px] `}
                            style={{color: colors.headerColor, backgroundColor: colors.buttonColor}}>Login</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
