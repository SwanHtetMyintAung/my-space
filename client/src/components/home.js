import React from "react"

export default function Home(){
    return(
        <div className="home-container">
            <div className="home">
                <div className="text-container">
                    <h2>What is This Website About</h2>
                    <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. 
                    </p>
                    
                </div>
                <button className="home-signup-button"><a href="/signup">Sing Up Now</a></button>
            </div>
        </div>
    )
}