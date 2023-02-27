import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './css/Login.css'

export default function Login() {
    const navi = useNavigate();
    const [log, setlog] = useState({
        email : "",
        pass : ""
    })

    const loginUser = async(e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:8080/api/login',
        {
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(log)
        }
        )
       
        const data = await response.json();
        console.log(data)
        if (data.user) {
            localStorage.setItem('token',data.user)
            alert('login successful')
            navi('/home')
        }else{
            alert('Invalid credential')
        }
    }
  return (
    <>
    <div className= "loginextdiv">
        <div className= "loginIntdiv">
            <p className="login">LOGIN</p>
            <form className= "form" onSubmit={loginUser}>
                <label>
                    <p>E - mail :</p> <input type="email"   onChange={(e)=>setlog({...log , email : e.target.value})} value={log.email} />
                </label>
                <label>
                    <p>password :</p> <input type="password"  onChange={(e)=>setlog({...log , pass : e.target.value})} value={log.pass} />
                </label>
                <input type="submit" value="Login "  />
            </form>
        </div>
    </div>
    </>
  )
}
