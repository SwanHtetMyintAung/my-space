import { useState ,useEffect  } from "react";
import NoteNavbar from "../common/NoteNavbar";
import fetchData from "../utilities/fetchData";
import Modal from "../common/Modal";
import postData from "../utilities/postData";

const URL = "http://localhost:3000/note"

function showModal(elementId){
    const modal = document.getElementById(elementId);
    modal.showModal();
}
function closeModal(eventTarget){
  const modal = eventTarget;
  modal.close();
}

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

    async function addNewNote(e){
        const input = e.target.previousSibling;
        if(input.value === "") return;

        const data = {
            text : input.value
        }
        try{
          //the function will return the data already .json()
            const response = await postData("http://localhost:3000/note", data , true)
            if(response){
                setNotes(prev => 
                    [ ...prev ,response]
                )       
            }
        }catch(error){
            console.log(error.message)
        }

        input.value="";
        closeModal(e.target.parentElement.parentElement);//close modal after adding a note
    }

    return(
        <>
            <NoteNavbar/>
            {/*********** Modal Box ***********/}
            <Modal h="50vh" addNewTask={addNewNote} closeModal={closeModal} textarea={true}/>
            <div className="note-container">
                {/* this codes changes the value of "notes" with "!!" to boolean and check if there's any elements in the array */}
                {   !notes && notes.length === 0 ?
                    <p className="no-note">No Note Yet!</p>  :
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
            
            <span role="button" onClick={()=>showModal("newModal")} className="plus-sign">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="">
                    <path strokeLinecap="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>

            </span>
           
        </>
    )
}