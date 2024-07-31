import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

function Logo() {
  return (
    <div style={{
        display:'flex', 
        marginRight:'auto',
        alignItems:'center',
        gap:'9%'
    }}>
        <Link to={'/'}> {/* // navigates to the home page */}
            <img src="openai.png" alt="openai" width={'30px'} height={'30px'} className='image-inverted'/>
        </Link> 
        <Typography sx={{display:{md: 'block', sm:'none', xs:'none'}, 
            marginRight:'auto',
            fontWeight:'800',
            textShadow:'2px 2px 20px #000'}}> {/* // setting display according to the screen sizes */}
            <span style={{fontSize:'20px'}}>MERN</span>GPT
        </Typography>
    </div>
  )
}

export default Logo