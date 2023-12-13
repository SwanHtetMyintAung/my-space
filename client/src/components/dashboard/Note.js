import { useState ,useEffect  } from "react";
import NoteNavbar from "../common/NoteNavbar";
import fetchData from "../utilities/fetchData";

const URL = "http://localhost:3000/note"

export default function Note(){
    const [notes , setNotes] = useState([]);

    useEffect(()=>{
        const getData = async() =>{
            try{
                const data =  await fetchData(URL);
                setNotes(data);
            }catch(error){
                console.log(error)
            }
        }

        getData();
    } ,[])

    return(
        <>
            <NoteNavbar/>
            <div className="note-container">
                {/* this codes changes the value of "notes" with "!!" to boolean and check if there's any elements in the array */}
                {   !notes && notes.length === 0 ?
                    (<p className="no-note">No Note Yet!</p> ) :
                    notes.map(note =>{
                        return(
                            <div key={note._id} className="note-item">
                                <b></b>
                                <div className="note-text-container">
                                    <p>{note.text}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            
                <a href="/note/new" className="plus-sign">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="">
                        <path strokeLinecap="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </a>
           
        </>
    )
}