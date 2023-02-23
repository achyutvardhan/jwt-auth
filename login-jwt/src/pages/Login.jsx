import React ,{useState} from 'react'
import './css/Login.css'

export default function Login() {
    const [log, setlog] = useState({
        email : "",
        pass : ""
    })

    const loginUser = async(e)=>{
        e.preventDefault();
        const respone = await fetch('http://localhost:8080/api/login',
        {
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(log)
        }
        )
        const data = await Response.json();
        console.log(data)
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
