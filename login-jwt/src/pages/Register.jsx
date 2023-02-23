import React from 'react'
import {useState} from 'react'
import './css/Login.css'
export default function Login() {
    const [submit ,setsubmit] = useState({
        "user" : "",
        "email": "",
        "pass" : ""
    })
    async function registerUser(e) {
        e.preventDefault();
       const responce = await fetch('http://localhost:8080/api/register',
       {
            method: 'POST' ,
            headers : {
                'content-type' : 'application/json',
            },
            body : JSON.stringify({
                submit,
            }),
        })
        const data = await Response.json()
        console.log(data)
    }
  return (
    <>
    <div className= "loginextdiv">
        <div className= "loginIntdiv">
            <p className="login">REGISTER</p>
            <form className= "form" onSubmit={registerUser}>
            <label>
                    <p>Username :</p> <input type="text"  onChange={(e)=>setsubmit({...submit , user : e.target.value})} value={submit.user}/>
                </label>
                <label>
                    <p>E - mail :</p> <input type="email"   onChange={(e)=>setsubmit({...submit , email : e.target.value})} value={submit.email} />
                </label>
                <label>
                    <p>password :</p> <input type="password"  onChange={(e)=>setsubmit({...submit , pass : e.target.value})} value={submit.pass} />
                </label>
                <input type="submit" value="Register"  />
            </form>
        </div>
    </div>
    </>
  )
}
