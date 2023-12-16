import NoteNavbar from "../common/NoteNavbar"
import NewTask from "../utilities/newTask";
import { useState , useMemo, useEffect } from "react";

import { checkedClicked , updateCheck} from "../utilities/checkClicked";
import postData from "../utilities/postData";
import Modal from "../common/Modal"

function showModal(elementId){
    const modal = document.getElementById(elementId);
    modal.showModal();
}
function closeModal(eventTarget){
  const modal = eventTarget;
  modal.close();
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
          //the function will return the data already .json()
            const response = await postData("http://localhost:3000/task", data , true)
            if(response){
                setTasks(prev => 
                    [  ...prev, response ]
                )       
            }
        }catch(error){
            console.log(error.message)
        }

        input.value="";
        closeModal(e.target.parentElement.parentElement);//close modal after adding a task
    }
    function searchTask(e){
        const text = e.target.value;
        //if we check empty condition and clear the query , there would be a bug
        //if(text === "") return;
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
      function finalCheckClick(event,url,id){
        updateCheck(url,id);
        checkedClicked(event)
      }
    
    return(
        <div className="task-wrapper">
            {/*********** Modal Box ***********/}
            <Modal h="" addNewTask={addNewTask} closeModal={closeModal}/>
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
                            <NewTask
                            checked={task.checked || false}
                            className={task.checked ? "checked" : ""} 
                            id={task._id} 
                            key={tasks.indexOf(task)} 
                            clicked={(event)=> finalCheckClick(event , "http://localhost:3000/task" , task._id)} 
                            deleteTask={deleteTask} 
                            task={task.text}
                            />
                        )
                    })
                }
            </div>
            <span role="button" onClick={()=>showModal("newModal")} className="plus-sign">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="">
                <path strokeLinecap="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

            </span>
        </div>
    )
}