import React from 'react'
import LoginCss from './css/Login.css'
export default function Login() {
    console.log("first")
  return (
    <>
    <div className={LoginCss.loginextdiv}>
        <div className={LoginCss.loginIntdiv}>
            <form className={LoginCss.form}>
            <label>
                    Username : <input type="text" name="usern" id="usern" />
                </label>
                <label>
                    password : <input type="password" name="usern" id="userp" />
                </label>
                <input type="submit" value="Login" />
            </form>
        </div>
    </div>
    </>
  )
}
