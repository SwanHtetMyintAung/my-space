
export default async function logout(){
    try{
        const response = await fetch("http://localhost:3000/logout",{
            credentials:"include",
            method:"DELETE"
        });
        const result = await response.json();
        if(response.ok){
           return '/login'
        }else{
            console.log(result)
            return '/'
        }

    }catch(error){
        console.log(error)
    }
  }