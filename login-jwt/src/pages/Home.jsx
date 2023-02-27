import React ,{useEffect,useState} from 'react'
// import jwt from 'jsonwebtoken'
import jwt from 'jwt-decode'
import './css/Login.css'
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const navi = useNavigate()
         const [quote,setQuote] = useState('')
         const [TempQuote,setTempQuote] = useState('')
      async function populateQuote(){
        const req = await fetch('http://localhost:8080/api/quote',{
          method: 'GET',
          headers:{
            'x-access-token':localStorage.getItem('token')
          }
        })

        const data = await req.json()

        if (data.status === 'ok') {
          setQuote(data.quote)
          console.log(data)
        }else{
          alert(data.error)
        }
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

       async function changeQuote(e){
        e.preventDefault();
        const req = await fetch('http://localhost:8080/api/quote',{
          method: 'POST',
          headers: {
            'content-type' : 'application/json',
            'x-access-token': localStorage.getItem('token')
          },
          body : JSON.stringify({quote : TempQuote}),
        })

        const data =  await req.json();
        console.log(data)
        if (data.status ==='ok') {
          setQuote(TempQuote)
            setTempQuote('')
        }
        else{
          console.log(data.error)
        }
       }
       

  return (
    
    <>
    {/* <div>welcome to the dashboard</div> */}

    <div className= "loginextdiv">
        <div className= "loginIntdiv">
        <div>welcome to the dashboard</div>
            <p className="login">quote : {quote || 'NO QUOTE FOUND'}</p>
            <form className= "form" onSubmit={changeQuote} >
                <label>
                    <p>Quote :</p> <input type="text"   onChange={(e)=>setTempQuote(e.target.value)} value={TempQuote} />
                </label>
                <input type="submit" value="Update"  />
            </form>
        </div>
    </div>
    </>
  )
}
