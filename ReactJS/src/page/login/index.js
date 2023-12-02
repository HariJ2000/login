import React, { useEffect, useState } from 'react'
import LoginScreen from './Login'
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios"

const Login = () => {

  const [loginMethod, setloginMethod] = useState('gmail')
  const [gmailresponse, setgmailresponse] = useState({})
  const [refetch, setrefetch] = useState(false)

  const loginWithGoogle = useGoogleLogin({
    onSuccess: respose => {
        console.log(respose);
        axios.post('http://localhost:8080/api/auth/login', {
        ...respose,
        grantType: 'gmail'
      }).then(res => {
        console.log(res);
        setgmailresponse(res.data)
        localStorage.setItem('accessToken',res.data.accessToken)
      }).catch(err => {
        console.log(err);
      })
    }
  })

  const loginWithMeta = () => {

  }

  const loginWithApple = () => {

  }

  useEffect(() => {
    console.log(gmailresponse);
    if(gmailresponse.accessToken){
      axios.post('http://localhost:8080/api/contextpath/getdata',{
        userId:gmailresponse.userId
      },{
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    }
  },[refetch])

  return (
    <>
    {Object.keys(gmailresponse).length ? 
      <>
        {gmailresponse.accessToken}<br/>
        <button onClick={()=>setrefetch(!refetch)}>click</button>
      </> 
    :
      <LoginScreen loginWithGoogle={loginWithGoogle} loginWithApple={loginWithApple} loginWithMeta={loginWithMeta} />}
    </>
  )
}

export default Login