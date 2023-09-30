import express from 'express'
import bodyParser from 'body-parser'


export const app = express()
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

export type animalType = {
    id: number,
    name: string,
    count: number
}


export const db:{animals:animalType[]} = {
    animals: [
        {id: 1, name: 'cat', count: 2},
        {id: 2, name: 'dog', count: 2},
        {id: 3, name: 'penguin', count: 2},
        {id: 4, name: 'puma', count: 2}
    ]
}

