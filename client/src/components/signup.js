//import { useEffect } from 'react';
// eslint-disable-next-line 
import axios from 'axios'
import { useNavigate} from "react-router-dom"

const apiUrl = "http://localhost:3000/"

export default function SignUp(){
    const navigate = useNavigate();
    function signUp(e){
        e.preventDefault();
        let data = {
            name : e.target.form[0].value,
            email : e.target.form[1].value,
            password : e.target.form[2].value
        }
        //console.log(data)
        //axios.post(apiUrl+"signUp" , JSON.stringify(data))
        fetch(apiUrl+'signUp',{
            method:"POST",
            'credentials' :'include',
            headers:{
                "Content-Type":"application/json",
                
            },
            body:JSON.stringify(data)
        })
        .then(result => {
            result.status === 200 && navigate('/')
            
        })
        .catch(err=> console.log(err))
    }
    return(
        <div className="signup-form-container">
            <h2 className="sign-up-title">Sign Up</h2>
            <form method="POST" action="http://localhost:3000/signup" className="sign-up-form">
                <div>
                <label htmlFor="#name">User Name:</label>
                <input name="name" id="name" maxLength={40} type="txt"></input>
                </div>
                <div>
                <label htmlFor="#email">Email:</label>
                <input name="email" id="email" maxLength={40} type="email"></input>
                </div>
                <div>
                <label htmlFor="#password">password:</label>
                <input name="password" id="password" maxLength={40} type="password"></input>
                </div>
                <button onClick={(e)=>signUp(e)}>Sign Up</button>
            </form>
        </div>
    )
}