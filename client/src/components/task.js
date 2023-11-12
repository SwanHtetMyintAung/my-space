import NoteNavbar from "./noteNavbar"
import NewTask from "./utilities/newTask";
import { useState , useMemo, useEffect } from "react";
//import {v4 as uuidv4} from 'uuid';
import IconX from "./utilities/iconX";
import checkedClicked from "./utilities/checkClicked";

function showModal(){
    const modal = document.querySelector('#newTaskModal');
    modal.showModal();
}
function closeModal(){
    const modal = document.querySelector('#newTaskModal');
    modal.close()
}




export default function Task(){
    const [tasks , setTask] = useState(()=>{
        return JSON.parse(localStorage.getItem("TASKS")) || []
    });
    const [query , setQuery] = useState("");

    useEffect(()=>{
        localStorage.setItem("TASKS",JSON.stringify(tasks))
    },[tasks]);

    let includedTasks = useMemo(()=>{
        return tasks.filter(task =>{
            return task.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    })},[query , tasks])

    function addNewTask(e){
        const input = e.target.previousSibling;
        if(input.value === "") return;
        let newTask = [input.value , ...tasks  ]
        setTask(newTask)

        input.value="";
        closeModal();//close modal after adding a task
    }
    function searchTask(e){
        const text = e.target.value;
       // if(text === "") return;
        setQuery(text);
       
    }
    function deleteTask(text){
        let newTask = tasks.filter(task=> task !== text)
        setTask(newTask);
    }
    function noTasks(){
        console.log(includedTasks) 
    }
    
    return(
        <div className="task-wrapper">
            {/*********** Modal Box ***********/}
            <dialog id="newTaskModal">
            
                <div className="firstPartInModal">
                    <h3>Add A Task</h3>
                    <span className="modal-close-button-container" onClick={closeModal}>
                    <IconX/>
                    </span>
                </div>
                <div className="secondPartInModal">
                    <input id="newTaskInput" type="text"/>
                    <button id="newTaskBtn" onClick={(e)=>addNewTask(e)}>Done</button>
                </div>
                
            </dialog>
            <NoteNavbar/>
            <div className="task-container">
                {/**************Search Bar************************/}
                <div className="search-container">
                    <input  onChange={(e)=>searchTask(e)} type='txt'className="search-task" placeholder="Search for tasks"></input>
                </div>
                  {noTasks}
                {/********************Display The Tasks********************************/
                    // eslint-disable-next-line eqeqeq
                    includedTasks == "" ? 
                    <p className="no-tasks">there isn't any tasks! </p>  :
                    includedTasks.map(task=>{  
                        return(
                            <NewTask id={crypto.randomUUID()} key={tasks.indexOf(task)} clicked={checkedClicked} deleteTask={deleteTask} task={task}/>
                        )
                    })
                }
            </div>
            <span role="button" onClick={showModal}  /*onClick={showModal}*/ className="plus-sign">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

            </span>
        </div>
    )
}