import { useNavigate} from "react-router-dom"
import postUser from "../utilities/postUser";

export default function SignUp(){
    const navigate = useNavigate();
    function signUpHandled(event){
        event.preventDefault();
        const url = event.target.form.action;
        const data = {
            name : event.target.form.name.value,
            email: event.target.form.email.value,
            password : event.target.form.password.value
        }
        postUser(url , data)
        .then(result =>{
            // if(result){
            //     navigate('/profile')
            // }
            result && navigate('/profile')
        })
        .catch(err=> console.log(err))
    }
    return(
        <div className="sign-up-form-container">
            <h2 className="sign-up-title">Sign Up</h2>
            <form method="POST" action="http://localhost:3000/signup" className="sign-up-form">
                <div>
                <label htmlFor="name">User Name:</label>
                <input autoComplete="off" name="name" id="name" maxLength={40} type="txt"></input>
                </div>
                <div>
                <label htmlFor="email">Email:</label>
                <input autoComplete="off" name="email" id="email" maxLength={40} type="email"></input>
                </div>
                <div>
                <label htmlFor="password">password:</label>
                <input autoComplete="off" name="password" id="password" maxLength={40} type="password"></input>
                </div>
                <button onClick={(e)=>signUpHandled(e)}>Sign Up</button>
            </form>

            <a href="/login">Already have an account? Login </a>
        </div>
    )
}