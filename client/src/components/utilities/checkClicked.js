export default function checkedClicked(e){
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