const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
morgan.token('mytoken', function(req, res){return JSON.stringify(req.body)})
app.use(morgan('method :url :status :res[content-length] - :response-time ms :mytoken' ))

const generatedId = () => Math.floor(Math.random()*1000);

let persons= [
          {
            "name": "Martti Tienari",
            "number": "040-123456",
            "id": 2
          },
          {
            "name": "Arto Järvinen",
            "number": "040-123456",
            "id": 3
          },
          {
            "name": "Jaska Jokunen",
            "number": "555 5555",
            "id": 6
          },
          {
            "name": "Jonne Jokunen",
            "number": "555 55555",
            "id": 7
          },
          {
            "name": "Milla Magia",
            "number": "666 66666666",
            "id": 9
          },
          {
            "name": "Mikki Hiiri",
            "number": "555 55555",
            "id": 11
          }
]



app.get('/api', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

app.get('/api/persons/:id', (req, res)=>{
    const id =Number(req.params.id)
    const person= persons.find(persons=>persons.id === id)
    if (person){
        res.json(person)
    } else{
        res.status(404).end()
    }
})  
 
app.get('/info', (req, res)=> {
    const date = new Date()
    const count= persons.length
    res.send(`<p>Phonebook has info for ${count} persons</p> 
    <p>${date}</p>`)
}) 

app.delete('/api/persons/:id', (req, res)=>{
    const id = Number(req.params.id)
    persons= persons.filter(person=>person.id !==id)
    console.log ('poisto', id)
    res.status(204).end()
})  

app.post('/api/persons', (req, res) => {
    const body = req.body
   
    if (body.name === undefined || body.name===''||body.number === undefined || body.number===''){
        return res.status(400).json({error: 'content missing'})
    } else {
          const person ={
          name: body.name,
          number: body.number,
          id: generatedId()
          }
   
          persons = persons.concat(person)
          res.json(person)
        }})


    
    



  
const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })