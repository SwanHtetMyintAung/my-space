import IconX from "./iconX"
import IconEdit from "./iconEdit"

export default function NewTask(props){
    return(
        <div className="task-item">
            <input id={props.id} type="checkbox" onClick={props.clicked} ></input>
            <label className="" htmlFor={props.id}  id={props.id}>{props.task}</label>
            <div className="icon-container">
                <div className="task-edit-button-container">
                    <span onClick={()=>props.deleteTask(props.task)} className="task-dit-button">
                    <IconEdit/>
                    </span>
                </div>
                <div className="task-delete-button-container">
                    <span onClick={()=>props.deleteTask(props.task)} className="task-delete-button">
                    <IconX/>
                    </span>
                </div>
            </div>
            
        </div>
    ) 
}