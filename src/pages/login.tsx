import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase'
import AuthContext, { AuthContextType } from '../contexts/AuthContext'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [user, loading, error] = useAuthState(auth);

  const { signInWithGoogle } = React.useContext(AuthContext) as AuthContextType



  React.useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])
  return (
    <div className='w-full flex flex-col items-center justify-center p-10 h-20 mt-20'>
      {""}
      <p>Sign in with google to continue</p>
      <button onClick={signInWithGoogle}>Sign in with google</button>
    </div>
  )
}

export default Login