export default function Navbar(){
    return(
        <div className="navbar">
            <h2 className="nav-icon">
                <a href="/">MySpace</a>
            </h2>
            <ul className="nav-list">
                <li><a href="/music">Music</a></li>
                <li><a href="/note">Note</a></li>
                <li><a href="/profile">Profile</a></li>
            </ul>
        </div>
    )
}