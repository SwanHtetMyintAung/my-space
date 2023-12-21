import NoteNavbar from "../common/NoteNavbar"
import NewTask from "../utilities/newTask";
import { useState , useMemo, useEffect } from "react";
import fetchData from "../utilities/fetchData";
import { checkedClicked , updateCheck} from "../utilities/checkClicked";
import postData from "../utilities/postData";
import Modal from "../common/Modal"

//show the model.
function showModal(elementId){
    const modal = document.getElementById(elementId);
    modal.showModal();
}
//hide the model.
function closeModal(eventTarget){
  const modal = eventTarget;
  modal.close();
}
const URL = 'http://localhost:3000/task'




export default function Task(){
    const [tasks , setTasks] = useState([]);//to store tasks data . in case there's none , the value would be empty.
    const [query , setQuery] = useState("");//to store the search input

    useEffect(() => {
      //use fetchData function to get Data from server-side and store it in "tasks" state. 
        const getData = async () => {
          
            try{
                const data =  await fetchData(URL);
                setTasks(data);
            }catch(error){
                console.log(error)
            
        }
          // try {
          //   const response = await fetch('http://localhost:3000/task', {
          //     credentials: 'include',
          //   });
    
          //   if (!response.ok) {
          //     throw new Error('Failed to fetch data');
          //   }
    
          //   const data = await response.json();
          //   setTasks(data)
          // } catch (error) {
          //   console.error('Error fetching data:', error.message);
          // }
        };
    
        getData();
      }, []);
      //useMemo is used to prevent wasting resources by making same search.
      let includedTasks = useMemo(() => {
        if (tasks.length === 0) {
          return [];
        }
      //search the "tasks" state
      //first make the task.text to lowerCase and find if the search-input is matched . search-input is also lowerCase to prevent case sensitivity.
        return tasks.filter(task => {
          return  task.text.toLowerCase().includes(query.toLowerCase());
        });
      }, [query, tasks]);//this will allowed to do the calculation only when the two inputs "query , tasks"(both states) are changed.
      
    //this function works when you add new task
    async function addNewTask(e){
      // //get the input value but this is not really re-usable since we are using previousSibling
        const input = e.target.previousSibling;
        if(input.value === "") return;//quit the function if the input value is empty
        //format the data like server-side is expected.
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
          //we should show the user the error message!
            console.log(error.message)
        }

        input.value="";//close modal after adding a note
        closeModal(e.target.parentElement.parentElement);//close modal after adding a task
    }
    //a search function triggered when you type something in search-bar
    function searchTask(e){
        const text = e.target.value;
        //if we check empty condition and clear the query , there would be a bug
        //if(text === "") return;
        setQuery(text);
       
    }
    //trigger when you delete a task.
    async function deleteTask(id) {
      //send a request to sever-side to delete the task and filter it from the state.
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
      //this is like a compound function to call another two functions
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
                //display the <p><p/> if there's no tasks. 
                    // eslint-disable-next-line eqeqeq
                    includedTasks.length === 0 ? 
                    <p className="no-tasks">there isn't any tasks! </p>  :
                    //map the tasks that the search-input is included. Basically SEARCH-RESULT 
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