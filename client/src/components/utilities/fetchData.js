async function fetchData(url){
    try{
        const response = await fetch(url);
        if(response.ok){
            const result = await response.json();
            return result;
        }else{
            console.log('fetch failed')
        }

    }catch(error){
        console.log(error)
    }
}