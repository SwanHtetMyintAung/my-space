import { useNavigate } from "react-router";
import postData from "../utilities/postData";

export default function Login(){
    const navigate = useNavigate();

    function LoginHandled(event){
        event.preventDefault();
        const url = event.target.form.action;
        const data = {
            email : event.target.form.email.value,
            password : event.target.form.password.value
        }

        postData(url , data)
        .then(result => {
            if(result){
                navigate('/profile')
            }
            //result && navigate('/profile')
        })
        .catch(err => console.log(err))
    }
    return(
        <div className="login-form-container">
            <h2 className="login-form-title">Login</h2>
            <form method="POST" action="http://localhost:3000/login" className="login-form">
                <div>
                <label htmlFor="#email">Email:</label>
                <input autoComplete="none" name="email" id="email" maxLength={40} type="email"></input>
                </div>
                <div>
                <label autoComplete="none" htmlFor="#password">password:</label>
                <input name="password" id="password" maxLength={40} type="password"></input>
                </div>
                <button onClick={(e)=>LoginHandled(e)}>Login</button>
            </form>
            <a href="/signup">Don't Have An account? Signup Here!</a>
        </div>
    )
}