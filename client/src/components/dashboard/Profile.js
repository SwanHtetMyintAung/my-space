const defaultProfile = require('../../img/default-profile.jpg')

export default function Profile(props){
    return(
        <div className="profile-container">
            <div className="profile-first-part">
                <div className="profile-pic">
                    <img alt="default" src={defaultProfile}></img>
                </div>
                <div className="profile-info">
                    <b className="profile-user-name">Name : Swan Htet Myint Aung</b>
                    <br/>
                    <s className="profile-user-email">email : swan60953@gmail.com</s>
                </div>
            </div>
            <hr/>
            <div className="profile-second-part">

            </div>
        </div>
    )
}