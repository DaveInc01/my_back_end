import request from 'supertest'
// import { describe } from 'yargs'
import { app } from './app'

describe('Posting new animals to db', ()=> {
    it("should return an array", async()=>{
        await request(app).get("/animals")
        .expect(304, [{"id":1,"name":"cat"},{"id":2,"name":"dog"},{"id":3,"name":"penguin"},{"id":4,"name":"puma"}])
    })
})