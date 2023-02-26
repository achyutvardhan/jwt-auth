import React ,{useEffect} from 'react'
// import jwt from 'jsonwebtoken'
import jwt from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const navi = useNavigate()
         
      async function populateQuote(){
        const req = await fetch('http://localhost:8080/api/quote',{
          headers:{
            'x-access-token':localStorage.getItem('token')
          }
        })

        const data = req.json()

        console.log(data)
      }
  
       useEffect(()=>{
           const token = localStorage.getItem('token')
           if (token) {
              const user =  jwt(token)
              if(!user)
              {
                localStorage.removeItem('token')
                navi('/login')
              }else{
                populateQuote()
              }
           }
       },[])

  return (
    <div>welcome to the dashboard</div>
  )
}
