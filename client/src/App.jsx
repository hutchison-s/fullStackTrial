import axios from 'axios'
import { useState, useEffect } from 'react';
import DataRow from './DataRow';


export default function App() {
    // const idInput = document.getElementById("idInput");
    // const nameInput = document.getElementById("nameInput");

    const [resData, setResData] = useState(null)
    let baseURL = "http://localhost:5000/users";

    useEffect(()=>{
        update()
    }, [])

    function update() {
        axios.get(baseURL)
            .then(res => {
                setResData([...new Set(res.data)])
                console.log("requested")
            }).catch(err => {console.log(err)})
    }

    // function handleIdQuery() {
    //     nameInput.value = "";
    //     let query = idInput.value;
    //     axios.get(baseURL+"?id="+query)
    //         .then(res => {
    //             setResData(res.data)
    //         })
    // }

    // function handleNameQuery() {
    //     idInput.value = ""
    //     let query = nameInput.value;
    //     axios.get(baseURL+"?name="+query)
    //         .then(res => {
    //             setResData(res.data)
    //         })
    // }

    function handleAdd(e) {
        e.preventDefault()
        const {newId, newName} = e.currentTarget;
        axios.post(baseURL+"/add", {
            id: newId.value,
            name: newName.value
        }).then(res => {
            console.log(res.status, res.data)
            e.target.reset();
            update();
        }).catch(err => {
            console.log("Error occurred:", err)
        })
    }
    

    return(
        <>
            <h1>MongoDB results:</h1>
            {/* <label htmlFor='idInput'>ID Search: </label><input type='text' id='idInput' onInput={handleIdQuery}/>
            <label htmlFor='nameInput'>Name Search: </label><input type='text' id='nameInput' onInput={handleNameQuery}/> */}
            <form style={{position: 'fixed', top: '1rem', right: '1rem', display: 'grid', gap: '0.5rem', border: '1px solid grey', padding: '1rem', margin: '1rem 0', width: '40%'}} onSubmit={handleAdd}>
                <h2>Add new:</h2>
                <div><label htmlFor='newName'>Name: </label><input type='text' name='newName' id='newName' required/></div>
                <div><label htmlFor='newId'>Id: </label><input type='text' name='newId' id='newId' required/></div>
                <button style={{width: '6rem'}} type='submit'>+ Add +</button>
            </form>
            <div>{
                resData && resData.length > 0
                    ? <table style={{width: '50%', textAlign: 'left'}}>
                        <thead >
                            <th style={{borderBottom: '2px solid black'}}>Name</th>
                            <th style={{borderBottom: '2px solid black'}}>ID</th>
                            <th style={{borderBottom: '2px solid black'}}>Tools</th>
                        </thead>
                        <tbody>
                            {resData.sort((a,b) => (a.id - b.id)).map(x => (
                                <DataRow user={x} update={update} key={x.id}/>
                            ))}
                        </tbody>
                    </table>
                    : <p>No Matches</p>
                }
            </div>
        </>
    )
}