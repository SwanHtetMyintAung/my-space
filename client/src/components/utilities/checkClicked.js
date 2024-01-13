
//look the data and decide whether is already checked or not.
function checkedClicked(e){
    let idToChange = e.target.id;//get the id
    let element = document.getElementById(idToChange);//select the id
    let nextSibling = element.nextElementSibling;//this isn't a good thing but works in my project xD

    if(e.target.checked){
        element.classList.add('checked');
        nextSibling.classList.add('checked');
    }else if(!e.target.checked){
        element.classList.remove('checked');
        nextSibling.classList.remove('checked');
    }
}
//this function allowed the user to edit if the task is checked or not.

async function updateCheck(url , taskId){
    //make the full url for eg. http://localhost:3000 + / + (task id from mongodb)
    const fullUrl = url + '/'+ taskId;
    try{
        const response = await fetch(fullUrl , {
            credentials:"include",
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            }
        })
        if(response.ok){
            const result = await response.json();
            return result
        }else{
            console.log('fetch failed')
        }
    }catch(error){
        console.log(error)
    }

}
module.exports = {
    checkedClicked , updateCheck
}