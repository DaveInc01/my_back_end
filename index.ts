import express, {Request, Response} from 'express'
import { reqWithParam, reqWithQuery, reqWithBody } from './types'
import bodyParser from 'body-parser'
import { CreateAnimalModel } from './models/CreateAnimalModel'
import { GetAnimalParamModel } from './models/GetAnimalParamModel'
import { QueryAnimalModel } from './models/QueryAnimalModel'
import { ViewAnimalModel } from './models/ViewAnimalModel'

const app = express()
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

type animalType = {
    id: number,
    name: string,
    count: number
}


const db:{animals:animalType[]} = {
    animals: [
        {id: 1, name: 'cat', count: 2},
        {id: 2, name: 'dog', count: 2},
        {id: 3, name: 'penguin', count: 2},
        {id: 4, name: 'puma', count: 2}
    ]
}


app.get('/', (req, res)=>{
    res.send("Home page")
    res.end()
})

app.get('/animal', (req: Request, res: Response<ViewAnimalModel[]>) =>{
    res.json(db.animals.map(animal =>{
        return{
            id: animal.id,
            name: animal.name
        }
    }))
})

app.get('/animals', (req: reqWithQuery<QueryAnimalModel>, res:Response<ViewAnimalModel>)=>{
        const animalExist = db.animals.find(elem => elem.name === req.query.name)
        if (animalExist){
            res.json({
                    id: animalExist.id,
                    name: animalExist.name
                })  
        }else{
            res.sendStatus(404)
        }
})

app.get('/animals/:id', (req: reqWithParam<GetAnimalParamModel>, res: Response<ViewAnimalModel>)=>{
    const found = db.animals.find(elem => elem.id === +req.params.id)
    if (found){
        res.json({
            id: found.id,
            name: found.name
        })
    }else{
        res.sendStatus(404)
     }
})

app.post('/animals', (req : reqWithBody<CreateAnimalModel>, res: Response<ViewAnimalModel>)=>{
    // console.log(req.body)
    const newAnimal : animalType = {
        id : db.animals.length + 1,
        name: req.body.name,
        count: 2
    }
    db.animals.push(newAnimal)
    res.json({
        id: newAnimal.id,
        name: newAnimal.name
    })
})

app.listen(3000, ()=>{
    console.log("server is up to date")
})