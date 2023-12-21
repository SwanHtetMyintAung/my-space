
//basically upload the data , you can give "true" to needResult if you want the result . the default is false and it will return "true" instead of the data
async function postData(url , data , needResult = false){
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
            const result = await response.json();
            return needResult ? result : true
        }else{
            return false
        }

    }catch(error){
        console.log(error)
    }
}

module.exports = postData;