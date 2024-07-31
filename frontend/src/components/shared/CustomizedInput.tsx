import React from 'react'
import { TextField } from '@mui/material'

type Props = {
    name:string
    type: string
    label:string
}

function CustomizedInput(props: Props) {
  return (
    <TextField // Change the login design from here
        margin='normal'
        InputLabelProps={{style:{color:'white'}}} 
        name={props.name} 
        label={props.label} 
        type={props.type}
        inputProps={{style:{width:"400px", borderRadius:8, fontSize: 20, color:"white"}}}
        />

  )
}

export default CustomizedInput