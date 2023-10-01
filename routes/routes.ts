import { Express, Response, Request } from "express-serve-static-core"
import { reqWithParam, reqWithQuery, reqWithBody } from '../types'
import { CreateAnimalModel } from '../models/CreateAnimalModel'
import { GetAnimalParamModel } from '../models/GetAnimalParamModel'
import { QueryAnimalModel } from '../models/QueryAnimalModel'
import { ViewAnimalModel } from '../models/ViewAnimalModel'
import { db, animalType } from "../app"
import express, { NextFunction } from 'express'


const animalsMiddleware = (req :Request, res: Response, next: NextFunction) => {
    if (req.query.role === "bear")
        next()
    else
        res.sendStatus(401)
}

export const getAnimalsRoutes = (app: Express) => {

    const router = express.Router()
// app.get('/', (req, res)=>{
//     res.send("Home page")
//     res.end()
// })

router.get('/', animalsMiddleware, (req: Request, res: Response<ViewAnimalModel[]>) =>{
    res.json(db.animals.map(animal =>{
        return{
            id: animal.id,
            name: animal.name
        }
    }))
})

router.get('/', (req: reqWithQuery<QueryAnimalModel>, res:Response<ViewAnimalModel>)=>{
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

router.get('/:id', (req: reqWithParam<GetAnimalParamModel>, res: Response<ViewAnimalModel>)=>{
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

router.post('/', (req : reqWithBody<CreateAnimalModel>, res: Response<ViewAnimalModel>)=>{
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
return router
}