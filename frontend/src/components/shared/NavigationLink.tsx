import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
    to: string
    bg: string
    text: string
    textcolor: string
    onClick?: () => Promise<void>
}

function NavigationLink(props: Props) {
  return (
    <Link className='nav-link' to={props.to} style={{background: props.bg, color:props.textcolor}}>{props.text}</Link>
  )
}

export default NavigationLink