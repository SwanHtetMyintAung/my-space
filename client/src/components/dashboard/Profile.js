import {useEffect , useState} from 'react'
import fetchData from '../utilities/fetchData'
const defaultProfile = require('../../img/default-profile.jpg')

export default function Profile(props){
    const [data , setData] = useState({})

    useEffect(() => {
        const fetchDataAsync = async () => {
          try {
            // Assuming fetchData is an asynchronous function that returns a promise
            const information = await fetchData(props.url);
            setData(information);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchDataAsync();
      }, [props.url]);
    async function logout(){
      try{
          const response = await fetch("http://localhost:3000/logout",{
              credentials:"include",
              method:"DELETE"
          });
          if(response.ok){
              const result = await response.json();
              console.log(result)
          }else{
              console.log('account deletion failed')
          }

      }catch(error){
          console.log(error)
      }
    }
    
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
            <button onClick={logout}>Click To Logout</button>
            <div className="profile-second-part">

            </div>
        </div>
    )
}