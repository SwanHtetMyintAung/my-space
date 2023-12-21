import {useEffect , useState} from 'react'
import {useNavigate} from "react-router-dom"
import fetchData from '../utilities/fetchData'
const defaultProfile = require('../../img/default-profile.jpg')

export default function Profile(props){
    //const navigate = useNavigate();
    const [data , setData] = useState({})

    useEffect(() => {
        const fetchDataAsync = async () => {
          try {
            // Assuming fetchData is an asynchronous function that returns a promise
            const information = await fetchData(props.url);
            setData(information);//set the data to state but error-handling is missing.
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchDataAsync();
      }, [props.url]);
    
    
    return(
        <div className="profile-container">
            <div className="profile-first-part">
                <div className="profile-pic">
                    <img alt="default" src={defaultProfile}></img>
                </div>
                <div className="profile-info">
                    <b className="profile-user-name">{data === undefined ? "Loading ..." : data.name}</b>
                    <br/>
                    <s className="profile-user-email">{data === undefined ? "Loading ..." : data.email}</s>
                </div>
            </div>
            <hr/>
            <div className="profile-second-part">

            </div>
        </div>
    )
}