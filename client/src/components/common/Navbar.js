import { useEffect , useRef } from "react";

export default function Navbar(){
    const menuRef = useRef()
    useEffect(() => {
        const handleOutsideClick = (event) => {
            const icon = document.getElementById('menu-toggler').firstChild
            //check if what the user click is  NOT bar-icon AND the menu is NOT already turn-off
            //https://github.com/SwanHtetMyintAung/JavaScript/blob/main/toggleNavbarHandled.js
            if(!(icon === event.target) && !menuRef.current.contains(event.target)) toggleNav('toggle-menu',false)
        }
        
        // Add event listener when the component mounts
        document.addEventListener('click', handleOutsideClick);
        
        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);
    
    function toggleNav(elementId , bol = true){
        const toggleElement = document.getElementById(elementId);
        if(bol){
            toggleElement.classList.toggle('d-none')
        }else if(!toggleElement.classList.contains('d-none')){
            toggleElement.classList.add('d-none')
        }
        
    }
    return(
        <>
        <div className="navbar">
            <h2 className="nav-icon">
                <a href="/">MySpace</a>
            </h2>
            <ul className="nav-list">
                <li><a href="/music">Music</a></li>
                <li><a href="/note">Note</a></li>
                <li><a href="/profile">Profile</a></li>
            </ul>
            <span id="menu-toggler" onClick={()=> toggleNav("toggle-menu")} className="nav-list-icon">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </span>
        </div>
        <ul ref={menuRef} id="toggle-menu" className="nav-toggle-list d-none">
                <li><a href="/music">Music</a></li>
                <hr/>
                <li><a href="/note">Note</a></li>
                <hr/>
                <li><a href="/profile">Profile</a></li>
            </ul>
        </>
    )
}