import { useEffect , useRef } from "react";

export default function Navbar(){
    const menuRef = useRef()
    useEffect(() => {
        const handleOutsideClick = (event) => {
            // Check if the clicked element is outside the menu and the menu button
                // Close the menu if it's open
                if(menuRef.current.classList.contains('d-none')){
                    if(menuRef.current === event.target){
                        console.log('this should work')
                        makeMenuDisappear("toggle-menu")
                    }else{
                        console.log('menu is opened but the target is wrong')
                    }
                }
                // console.log(event.target)
                // console.log(menuRef.current)
                // console.log(!menuRef.current.classList.contains('d-none') )
           
        };
        
        // Add event listener when the component mounts
        document.addEventListener('click', handleOutsideClick);
        
        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []); // Empty dependency array ensures the effect runs only once
    function toggleNav(elementId , bol = true){
        const toggleElement = document.getElementById(elementId);
        if(bol){
            toggleElement.classList.toggle('d-none')
        }else if(!toggleElement.classList.contains('d-none')){
            console.log('helo')
            toggleElement.classList.add('d-none')
        }
        
    }
    function makeMenuDisappear(elementId){
        const toggleElement = document.getElementById(elementId);
        toggleElement.classList.add('d-none')
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
            <span onClick={()=> toggleNav("toggle-menu" , true)} className="nav-list-icon">

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