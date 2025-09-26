import express from "express";
import type { Express, Request, Response } from "express";
import { connect } from "./repositories/productsRepository.js";
import { ProductController } from "./controllers/productsController.js";

connect()

const app: Express = express()
const PORT: number = 3300

const productController = new ProductController()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send("Express com Typescript e PRISMA funcionando!")
})

app.post('/produtos', productController.newProduct)
app.get('/produtos', productController.getAllProducts)
app.get('/produtos/:id', productController.getOneProduct)
app.patch('/produtos/:id', productController.update)
app.delete('/produtos/:id', productController.deleteProduct)

app.use((err: any, req: Request, res: Response, next: Function) => {
    console.log(err)
    res.status(500).json({ error: 'Erro interno do servidor...' })
})

app.listen(PORT,'0.0.0.0', ()=>{
    console.log(`Servidor rodando na porta ${PORT}...`)
})


