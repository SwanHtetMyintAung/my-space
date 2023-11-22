import { useNavigate } from "react-router";
import postUser from "../utilities/postUser";

export default function Login(){
    const navigate = useNavigate();

    function LoginHandled(event){
        event.preventDefault();
        const url = event.target.form.action;
        const data = {
            email : event.target.form.email.value,
            password : event.target.form.password.value
        }

        postUser(url , data)
        .then(result => result && navigate('/profile'))
        .catch(err => console.log(err))
    }
    return(
        <div className="login-form-container">
            <h2 className="login-form-title">Login</h2>
            <form method="POST" action="http://localhost:3000/login" className="login-form">
                <div>
                <label htmlFor="#email">Email:</label>
                <input name="email" id="email" maxLength={40} type="email"></input>
                </div>
                <div>
                <label htmlFor="#password">password:</label>
                <input name="password" id="password" maxLength={40} type="password"></input>
                </div>
                <button onClick={(e)=>LoginHandled(e)}>Login</button>
            </form>
        </div>
    )
}