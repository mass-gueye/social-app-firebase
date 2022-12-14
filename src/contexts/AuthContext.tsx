import { signInWithPopup, UserInfo } from 'firebase/auth'
import React from 'react'
import { auth, provider } from '../config/firebase'


export type AuthContextType = {
    message: string,
    signInWithGoogle: () => Promise<void>,
    user: UserInfo | null
}


const AuthContext = React.createContext<AuthContextType | null>(null)

interface IAuthProvider {
    children: React.ReactNode
}

export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
    const [user, setUser] = React.useState<UserInfo | null>(null)
    
    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider)
        if (result.user) {
            setUser(result.user)
        }
    }
    const value = {
        message: "je suis sage",
        signInWithGoogle,
        user
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext