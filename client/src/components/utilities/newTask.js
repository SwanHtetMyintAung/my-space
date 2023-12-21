import IconX from "./iconX"


export default function NewTask(props){
    // function returnClickedOrNot(){
    //     console.log('checked')
    //     return props.checked ? "checked" : ""
    // }
    return(
        <div className="task-item">
            <input 
            defaultChecked={props.checked} 
            id={props.id} type="checkbox" 
            className={props.className} 
            onClick={props.clicked} />
            <label 
            className={props.className} 
            htmlFor={props.id}  
            id={props.id}>{props.task}</label>
            <div className="icon-container">
                <div className="task-delete-button-container">
                    <span 
                    onClick={()=>props.deleteTask(props.id)} 
                    className="task-delete-button">
                    <IconX/>
                    </span>
                </div>
            </div>
            
        </div>
    ) 
}