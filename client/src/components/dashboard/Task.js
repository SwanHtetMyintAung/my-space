import NoteNavbar from "../common/NoteNavbar"
import NewTask from "../utilities/newTask";
import { useState , useMemo, useEffect } from "react";
import IconX from "../utilities/iconX";
import checkedClicked from "../utilities/checkClicked";

function showModal(){
    const modal = document.querySelector('#newTaskModal');
    modal.showModal();
}
function closeModal(){
    const modal = document.querySelector('#newTaskModal');
    modal.close()
}




export default function Task(){
    const [tasks , setTasks] = useState([]);
    const [query , setQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3000/task', {
              credentials: 'include',
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
    
            const data = await response.json();
            setTasks(data)
          } catch (error) {
            console.error('Error fetching data:', error.message);
          }
        };
    
        fetchData();
      }, []);

      let includedTasks = useMemo(() => {
        if (tasks.length === 0) {
          return [];
        }
      
        return tasks.filter(task => {
          return  task.text.toLowerCase().includes(query.toLowerCase());
        });
      }, [query, tasks]);
      
    async function addNewTask(e){
        const input = e.target.previousSibling;
        if(input.value === "") return;

        const data = {
            text : input.value
        }
        try{
            const response = await fetch('http://localhost:3000/task',{
                method:"POST",
                'credentials' :'include',
                headers:{
                    "Content-Type":"application/json",    
                },
                body:JSON.stringify(data)
            })
            if(response){
                const result = await response.json();
                console.log(result)
                setTasks(prev => 
                    [...prev , result]
                )
                
            }

        }catch(error){
            console.log(error.message)
        }

        input.value="";
        closeModal();//close modal after adding a task
    }
    function searchTask(e){
        const text = e.target.value;
       // if(text === "") return;
        setQuery(text);
       
    }
    async function deleteTask(id) {
        try {
          const response = await fetch('http://localhost:3000/task/' + id, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.ok) {
            // Update state by filtering out the deleted task
            setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
          }
        } catch (err) {
          console.log(err);
        }
      }
      console.log(tasks)
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
                {/********************Display The Tasks********************************/
                    // eslint-disable-next-line eqeqeq
                    includedTasks.length === 0 ? 
                    <p className="no-tasks">there isn't any tasks! </p>  :
                    includedTasks.map(task=>{  
                        return(
                            <NewTask id={task._id} key={tasks.indexOf(task)} clicked={checkedClicked} deleteTask={deleteTask} task={task.text}/>
                        )
                    })
                }
            </div>
            <span role="button" onClick={showModal} className="plus-sign">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="">
                <path strokeLinecap="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

            </span>
        </div>
    )
}