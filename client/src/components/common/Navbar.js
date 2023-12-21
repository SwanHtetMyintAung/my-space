import { useEffect , useRef } from "react";
import { useNavigate } from "react-router";
import logout from "../utilities/logout";

/*
this function check whether the user click outside the navbar or not.
this function will do its work only on mobile/narrow screen where the drop down would appear.
*/
export default function Navbar(){
    const menuRef = useRef();//to keep track of where the user click.
    const navigate = useNavigate();
    //useEffect is for to mount the function when the component is loaded and unmounted the function when is unloaded.
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
    //to control the visiblity of navbar-menu in narrow screen. 
    //if the "bol" value is TRUE , the function works like a toggler . 
    //but if the "bol" value is FALSE ,this will only close the nav-menu. 
    function toggleNav(elementId , bol = true){
        const toggleElement = document.getElementById(elementId);
        if(bol){
            toggleElement.classList.toggle('d-none')
        }else if(!toggleElement.classList.contains('d-none')){
            toggleElement.classList.add('d-none')
        }
    }
    //basically call the "logout()" function and navigate to somewhere that "logout" function return  , presumably home page
    async function handledLogout(){
        try{
            const result = await logout();
            if(result === "/login"){
                navigate(result)
            }
        }catch(error){
            console.log(error)
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
                <li><a href="/note">Note</a></li>
                <hr/>
                <li><a href="/task">Task</a></li>
                <hr/>
                <li><a href="/profile">Profile</a></li>
                <hr/>
                
               {/*  eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <li><a href="#" onClick={handledLogout}>Logout</a></li>
            </ul>
        </>
    )
}