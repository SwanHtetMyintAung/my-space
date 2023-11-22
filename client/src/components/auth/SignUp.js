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
            if(result){
                navigate('/profile')
            }
        })
        .catch(err=> console.log(err))
    }
    // function signUp(e){
    //     e.preventDefault();
    //     let data = {
    //         name : e.target.form[0].value,
    //         email : e.target.form[1].value,
    //         password : e.target.form[2].value
    //     }
        
    //     fetch(apiUrl+'signUp',{
    //         method:"POST",
    //         'credentials' :'include',
    //         headers:{
    //             "Content-Type":"application/json",
                
    //         },
    //         body:JSON.stringify(data)
    //     })
    //     .then(result => {
    //         result.status === 200 && navigate('/profile')
            
    //     })
    //     .catch(err=> console.log(err))
    // }
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
                <button onClick={(e)=>signUpHandled(e)}>Sign Up</button>
            </form>
        </div>
    )
}