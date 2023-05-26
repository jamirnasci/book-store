const express = require('express')
const app = express()
const fs = require('fs/promises')

app.use(express.static("public"))
const port = process.env.PORT

async function readJson(){
    const fileString = await fs.readFile("./data.json", {encoding:'utf8'})
    return String(fileString)
}

app.get('/getbook', (req, res)=>{
    let type = req.query.type
    let jsonObj = ''
    let jsonStringResponse = ''

    readJson().then((objString) => { 
        jsonObj = JSON.parse(objString)
        jsonStringResponse = jsonObj[type]
        res.send(JSON.stringify(jsonStringResponse))
    })
    
})

app.get('/', (req, res) => {
    res.sendFile(__dirname+"\index.html")
})

app.listen(port, ()=>{console.log('Running on '+port)})
