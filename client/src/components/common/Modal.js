import IconX from "../utilities/iconX";

// a function to change the height of the "text area" and "button" depending on the value of props
function setHeight(height , inputElement , buttonElement){
    if(inputElement==null)return; 
    inputElement.style.minHeight = height;
    buttonElement.style.minHeight = height;
   // console.log(inputElement ,buttonElement)
}

export default  function Modal({h , addNewTask , closeModal , textarea=false }){
    
        return(
            <dialog id="newModal">
            
                <div className="firstPartInModal">
                    <h3>{textarea ? "Add a Note" : "Add a Task"}</h3>
                    <span className="modal-close-button-container" onClick={(e)=> closeModal(e.target.parentElement.parentElement.parentElement)}>
                    <IconX/>
                    </span>
                </div>
                <div className="secondPartInModal">
                    {   textarea ? 
                        <textarea id="newModalInput" /> :
                        <input  id="newModalInput" type="text"/>
                    }
                    <button id="newModalBtn" onClick={(e)=>addNewTask(e)}>Done</button>
                </div>
                {setHeight( h , document.querySelector('#newModalInput') ,  document.querySelector('#newModalBtn'))}
            </dialog>
        )
}