

async function postUser(url , data){
    try{
        const response = await fetch(url , {
            method:"POST",
            credentials:'include',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data)
        })
        
        if(response.ok){
            //const result = await response.json();
            return true;
        }else{
            return false
        }

    }catch(error){
        console.log(error)
    }
}

module.exports = postUser;