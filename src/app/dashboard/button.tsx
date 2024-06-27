"use client"
import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {}
function getCookieValue(cookieName:string) {
    // Split document.cookie on "; " to get an array of "name=value" strings
    let cookies = document.cookie.split('; ');
    // Iterate over the array to find the cookie with the given name
    for (let i = 0; i < cookies.length; i++) {
        // Split each "name=value" string into an array [name, value]
        let cookie = cookies[i].split('=');
        // If the cookie name matches the requested name, return the value
        if (cookie[0] === cookieName) {
            return cookie[1];
        }
    }
    // Return null if the cookie is not found
    return null;
}
const ButtonMe = (props: Props) => {
  return (
   <Button onClick={()=>{
    console.log(getCookieValue("authjs.session-token"))
   }}>click me</Button>
  )
}

export default ButtonMe