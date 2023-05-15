const express = require('express');
const app = express();
const PORT = 5000

const data = {
    users: [
        {id: "001", name: "George"}, 
        {id: "002", name: "Julie"}, 
        {id: "003", name: "Zachary"}, 
        {id: "004", name: "Edda"}, 
        {id: "005", name: "Miles"}, 
        {id: "006", name: "Gerald"}, 
        {id: "007", name: "Quincy"}, 
        {id: "008", name: "Cassandra"}, 
        {id: "009", name: "Elizabeth"}, 
        {id: "010", name: "Cleo"} 
    ],
}

app.use(express.json())

app.get("/api/users", (req, res)=> {
    console.log(req.query)
    const {id, name} = req.query;
    if (id) {
        res.send(
            JSON.stringify(data.users.filter(
                x => (x.id.includes(id))
            ))
        )
    } else if (name) {
        res.send(
            JSON.stringify(data.users.filter(
                x => (x.name.toLowerCase().includes(name.toLowerCase()))
            ))
        )
    } else {
        res.send(JSON.stringify(data.users))
    }
})

app.post("/api/users", (req, res) => {
    data.users.push(req.body);
    res.send(req.body);
    console.log("Added", req.body, "to Users.")
})

app.listen(PORT, ()=>{
    console.log("Listening on port ", PORT)
})