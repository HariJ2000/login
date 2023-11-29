import React, { useEffect, useState } from 'react'
import LoginScreen from './Login'
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios"

const Login = () => {

  const [loginMethod, setloginMethod] = useState('gmail')
  const [apiresponse, setapiresponse] = useState({})

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async respose => {
      try {
        console.log(respose);
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            "Authorization": `Bearer ${respose.access_token}`
          }
        })
        setapiresponse(res.data)
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }
  })

  const loginWithMeta = () => {

  }

  const loginWithApple = () => {

  }

  useEffect(() => {
    if (Object.keys(apiresponse).length) {
      axios.post('http://localhost:8080/login', {
        email: apiresponse.email,
        grantType: loginMethod
      }).then(res => {
        console.log(res);
        
      }).catch(err => {
        console.log(err);
      })
    }
  }, [apiresponse])

  return (
    <>
    {/* <button onClick={()=>setapiresponse({email:'hari@gmail.com'})}>click</button> */}
      <LoginScreen loginWithGoogle={loginWithGoogle} loginWithApple={loginWithApple} loginWithMeta={loginWithMeta} />
    </>
  )
}

export default Login