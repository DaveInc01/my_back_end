import { app } from "./app"
import { getAnimalsRoutes } from "./routes/routes"

const PORT = 3000

const animalRoutes = getAnimalsRoutes(app)
app.use('/animals', animalRoutes)


app.listen(PORT, ()=>{
    console.log("server is up to date")
})