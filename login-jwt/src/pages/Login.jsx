import React from 'react'
import {useState} from 'react'
import './css/Login.css'
export default function Login() {
    // const [submit ,setsubmit] = useState({
    //     ""
    // })
  return (
    <>
    <div className= "loginextdiv">
        <div className= "loginIntdiv">
            <p className="login">LOGIN</p>
            <form className= "form">
            <label>
                    <p>Username :</p> <input type="text" name="usern" id="usern" />
                </label>
                <label>
                    <p>password :</p> <input type="password" name="usern" id="userp" />
                </label>
                <input type="submit" value="Login"  />
            </form>
        </div>
    </div>
    </>
  )
}
