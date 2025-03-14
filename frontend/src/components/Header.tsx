import React from 'react'
import { AppBar, Toolbar } from '@mui/material'
import Logo from './shared/Logo'    
import { useAuth } from '../context/AuthContext'
import NavigationLink from './shared/NavigationLink'

function Header() {
    const auth = useAuth()
  return ( 
    <AppBar sx={{bgcolor: 'transparent', position: 'static', boxShadow:'none'}}>
        <Toolbar sx={{display:'flex'}}>
        <Logo/>
        <div>
            {auth?.isLoggedIn ?
            <>
                <NavigationLink bg="#00fffc" to='/chat' text='Go to Chats' textcolor='Black'/>
                <NavigationLink bg="#51538f" to='/' textcolor='white' text='Logout' onClick={auth.logout}/>
            </> : 
            <>
                <NavigationLink bg="#00fffc" to='/login' text='Login' textcolor='Black'/>
                <NavigationLink bg="#51538f" to='/signup' textcolor='white' text='Signup'/>
            </>}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header