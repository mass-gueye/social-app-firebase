import { signOut } from 'firebase/auth';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation } from 'react-router-dom'
import { auth } from '../config/firebase';
import { PlusSquare, Power } from 'react-feather'

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const location = useLocation()

  const logout = () => {
    signOut(auth)
  };
  return (
    <div className='bg-violet-600 from-violet-900 flex  h-20 items-center justify-end px-10'>

      {user && (
        <div className="flex items-center gap-4 justify-between w-full ">

          <div className='flex gap-4 items-center flex-wrap'>
            <Link to={'/'} className={`text-white text-sm ${location.pathname === '/' ? 'underline underline-offset-8' : ''} font-bold`}>Home</Link>
            <Link to={'/create-post'} className={`text-white hidden md:block  capitalize ${location.pathname === '/create-post' ? 'underline underline-offset-8' : ''}  font-bold`}>create post</Link>
            <Link to={'/create-post'} className='text-white  md:hidden  underline underline-offset-8 font-bold'><PlusSquare /></Link>

          </div>
          <div className='flex flex-wrap md:border-l-slate-200 md:border-l-2 items-center justify-between gap-4'>
            <p className='text-sm hidden md:block text-white ml-2'>{user?.displayName}</p>
            <img src={user?.photoURL || ""}
              className='hover:cursor-pointer w-7 h-7 rounded-full'
              alt="profile pic"
              width={`100`}
              height={`100`}
            />
            <button className='py-1 px-2 hidden md:block' onClick={logout}>logout</button>
            <button className='py-1 px-2 md:hidden ' onClick={logout}><Power /></button>


          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar