

function checkedClicked(e){
    let idToChange = e.target.id;
    let element = document.getElementById(idToChange);
    let nextSibling = element.nextElementSibling;

    if(e.target.checked){
        element.classList.add('checked');
        nextSibling.classList.add('checked');
    }else if(!e.target.checked){
        element.classList.remove('checked');
        nextSibling.classList.remove('checked');
    }
}

async function updateCheck(url , taskId){
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