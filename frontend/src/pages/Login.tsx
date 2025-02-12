
import { Link } from "react-router-dom";


function Login() {
  return (
    <div className='flex flex-col items-center justify-center  w-5/12'>
    <div className='w-full p-6 rounded-[30px] shadow-md bg-[#1F4529] bg-clip-padding'>
        <h1 className='text-3xl font-black text-center text-[#EED3B1]'>
            Login
            <span className=''> ChatApp</span>
        </h1>

        <form className="flex flex-col gap-4 pt-10">
            <div >
                <label className='label'>
                    <span className='text-white font-bold text-2xl'>Username</span>
                </label>
                <input type='text' placeholder='Enter username' className='w-full input input-bordered h-10 bg-[#E8ECD7] pl-2 mt-2'  />
            </div>

            <div>
                <label className='label'>
                    <span className='text-white font-bold text-2xl'>Password</span>
                </label>
                <input
                    type='password'
                    placeholder='Enter Password'
                    className='w-full input input-bordered h-10 bg-[#E8ECD7] pl-2 mt-2'
                />
            </div>
            <Link
                to='/signup'
                className='text-sm  hover:underline text-white hover:text-[#EED3B1] text-right mt-2 inline-block'
            >
                {"Don't"} have an account?
            </Link>

            <div className="w-full flex justify-center">
                <button className='text-[#EED3B1] bg-[#47663B] font-bold py-2 px-4 text-xl  rounded-[10px] '>Login</button>
            </div>
        </form>
    </div>
</div>
  )
}

export default Login
