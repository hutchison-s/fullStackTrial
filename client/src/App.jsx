import axios from 'axios'
import { useState, useEffect } from 'react';


export default function App() {
    const idInput = document.getElementById("idInput");
    const nameInput = document.getElementById("nameInput");

    const [resData, setResData] = useState(null)
    let baseURL = "/api/users";

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

    function handleIdQuery() {
        nameInput.value = "";
        let query = idInput.value;
        axios.get(baseURL+"?id="+query)
            .then(res => {
                setResData(res.data)
            })
    }

    function handleNameQuery() {
        idInput.value = ""
        let query = nameInput.value;
        axios.get(baseURL+"?name="+query)
            .then(res => {
                setResData(res.data)
            })
    }

    function handleAdd(e) {
        e.preventDefault()
        const {newId, newName} = e.currentTarget;
        axios.post(baseURL, {
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
            <h1>API results:</h1>
            <label htmlFor='idInput'>ID Search: </label><input type='text' id='idInput' onInput={handleIdQuery}/>
            <label htmlFor='nameInput'>Name Search: </label><input type='text' id='nameInput' onInput={handleNameQuery}/>
            <form style={{display: 'grid', gap: '0.5rem', border: '1px solid grey', padding: '1rem', margin: '1rem 0'}} onSubmit={handleAdd}>
                <h2>Add new:</h2>
                <div><label htmlFor='newName'>Name to Add: </label><input type='text' name='newName' id='newName'/></div>
                <div><label htmlFor='newId'>Id: </label><input type='text' name='newId' id='newId'/></div>
                <button style={{width: '6rem', margin: '0.5rem auto'}} type='submit'>+ Add +</button>
            </form>
            

            <div>{
                resData && resData.length > 0
                    ? <table style={{width: '50%', textAlign: 'left'}}>
                        <thead >
                            <th style={{borderBottom: '2px solid black'}}>Name</th>
                            <th style={{borderBottom: '2px solid black'}}>ID</th>
                        </thead>
                        <tbody>
                            {resData.map(x => (
                                <tr key={x.id}><td>{x.name}</td><td>{x.id}</td></tr>
                            ))}
                        </tbody>
                    </table>
                    : <p>No Matches</p>
                }
            </div>
        </>
    )
}