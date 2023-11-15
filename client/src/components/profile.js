export default function Profile(){
    return(
        <div className="profile-container">
            <div className="profile-first-part">
                <div className="profile-pic">
                    <img alt="default" src={require('../img/default-profile.png')}></img>
                </div>
                <div className="profile-info"></div>
            </div>
            <div className="profile-second-part">

            </div>
        </div>
    )
}