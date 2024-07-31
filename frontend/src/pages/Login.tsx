import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { BiSolidLogInCircle } from 'react-icons/bi'
import CustomizedInput from '../components/shared/CustomizedInput'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

function Login() {
  const auth = useAuth()
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // to prevent default behaviour 
    const formdata = new FormData(e.currentTarget)
    const email = formdata.get("email") as string
    const password = formdata.get("password") as string
    try {
      toast.loading("Logging In!", {id: "login"})
      await auth?.login(email, password)
      toast.loading("Logged In Successfully!", {id: "login"})
    } catch (error) {
      toast.loading("Login Failed!", {id: "login"})
    }
  }

  return (

    <Box width={'100%'} height={'100%'} display={'flex'} flex={'1'}>
       <Box padding={8} marginTop={8} display={{md: "flex", sm: "none", xs: "none"}}> {/* We won't display for small devices */}
        <img src="airobot.png" alt="Robot" style={{width: "400px"}} />
        </Box> 
      <Box display={"flex"} flex={{xs: 1, md:0.5}} justifyContent={'center'} alignItems={'center'} padding={2} marginLeft={'auto'} marginTop={16}>
        <form onSubmit={(handleSubmit)} style={{margin:'auto', padding:'30px', boxShadow:'10px 10px 20px #000', borderRadius: '10px', border:'none'}}>
          <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <Typography variant='h4' textAlign={'center'} padding={2} fontWeight={600}>
              Login
            </Typography>
            <CustomizedInput type='email' name='email' label='Email'/>
            <CustomizedInput type='password' name='password' label='Password'/>
            <Button type='submit' sx={{
                paddingX:2, 
                paddingY: 1, 
                marginTop: 2, 
                width: "500px", 
                borderRadius: 2, 
                bgcolor: '#00fffc',
                ":hover": { bgcolor:"white", color:'black'}
              }}
              endIcon={<BiSolidLogInCircle/>}>
                Login
              </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Login