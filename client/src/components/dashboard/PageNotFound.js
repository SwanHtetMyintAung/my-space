import { useNavigate } from "react-router";



const PageNotFound = () => {
    const navigate = useNavigate();
    function redirectToProfile(){
        setTimeout(()=>{
            navigate('/')
        } , "3000")
    }
    redirectToProfile();
    return (
        <div className="PageNotFound-container">
            <h1>404</h1>
            <s>Page Not Found! redirecting in 3 seconds...</s>

        </div>
    )
}

export default PageNotFound