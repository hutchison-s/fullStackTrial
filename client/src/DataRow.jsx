import { useState } from "react"
import PropTypes from 'prop-types'
import axios from 'axios'

export default function DataRow({user, update}) {
    const [isEditing, setIsEditing] = useState(false);
    const baseURL = "http://localhost:5000/users";

    function handleUpdate(e, id) {
        const newId = e.target.parentNode.parentNode.querySelector(".rowId")
        const newName = e.target.parentNode.parentNode.querySelector(".rowName")
        axios.post(baseURL+"/update/"+id, {
            id: newId.innerHTML,
            name: newName.innerHTML
        }).then(() => {
            setIsEditing(false)
            update();
        }).catch(err => {
            console.log("Error occurred:", err)
        })
    }

    function handleDelete(id) {
        axios.delete(baseURL+"/"+id)
            .then(()=> update())
            .catch(err => console.log("Error: "+err))
    }

    return (
        <tr>                    
            <td className='rowName' contentEditable={isEditing} style={isEditing ? {background: 'lightblue'} : null}>{user.name}</td>
            <td className='rowId' contentEditable={isEditing} style={isEditing ? {background: 'lightblue'} : null}>{user.id}</td>
            <td style={{display: 'flex', gap: '0.5rem'}}>
                <span 
                    style={{
                        color: 'red', 
                        border: '1px solid red', 
                        cursor: 'pointer', 
                        textAlign: 'center',
                        fontSize: 'smaller',
                        padding: '0.1rem'
                    }} 
                    onClick={() => {handleDelete(user.id)}}>
                    DELETE
                </span>
                {isEditing
                    ? <>
                    <span 
                        style={{
                            color: 'blue', 
                            border: '1px solid blue', 
                            cursor: 'pointer', 
                            textAlign: 'center',
                            fontSize: 'smaller',
                            padding: '0.1rem'
                        }} 
                        onClick={(e) => {handleUpdate(e, user.id)}}>
                        UPDATE
                    </span>
                    <span
                        style={{
                            color: 'grey', 
                            border: '1px solid grey', 
                            cursor: 'pointer', 
                            textAlign: 'center',
                            fontSize: 'smaller',
                            padding: '0.1rem'
                        }} 
                        onClick={() => {setIsEditing(false)}}>
                        CANCEL
                    </span>
                    </>
                    : <span
                        style={{
                            color: 'green', 
                            border: '1px solid green', 
                            cursor: 'pointer', 
                            textAlign: 'center',
                            fontSize: 'smaller',
                            padding: '0.1rem'
                        }} 
                        onClick={() => {setIsEditing(!isEditing)}}>
                        EDIT
                    </span>
                }
            </td>
        </tr>
    )
}

DataRow.propTypes = {
    user: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired
}