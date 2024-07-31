import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { loginUser } from '../helpers/api-communicator'

type User = { // we made two types
    name: string
    email: string
}

type User_Auth = {
    isLoggedIn: boolean;
    user: User | null
    login: (email: string, password: string) => Promise<void>
    signup: (name: string, email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<User_Auth | null>(null)

export const AuthProivder = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoggedIn, setisLoggedIn] = useState(false)

    useEffect(()=>{
        // fetch if the user cookies are valid then skip login
    },[])

    const login = async(email: string, password: string) => {
        const data = await loginUser(email, password)
        if (data)
        {
            setUser({email:data.email, name:data.name})
            setisLoggedIn(true)
        }
    }
    const signup = async(name: string, email: string, password: string) => {}
    const logout = async() => {}

    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        signup,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)