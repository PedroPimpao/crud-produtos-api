import type { Request, Response } from "express";
import { ProductRepository } from "../repositories/productsRepository.ts";

const productRepo = new ProductRepository()

export class ProductController{
    async newProduct(req: Request, res: Response, next: Function){
        try {
            const { nome, tipo, quantidade } = req.body
            const product = await productRepo.createProducts({ nome, tipo, quantidade })
            res.status(201).json(product)
        } catch (error) {
            next(error)
        }
    }

    async getAllProducts(req: Request, res: Response, next: Function){
        try {
            const products = await productRepo.getProducts()
            res.json(products)
        } catch (error) {
            next(error)
        }
    }

    async getOneProduct(req: Request, res: Response, next: Function){
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json({ error: "ID do produto não informado." })
            }
            const product = await productRepo.getProduct(id)
            if (!product) {
                return res.status(404).json({ error: "Produto não encontrado." })
            }
            res.json(product)
        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: Function){
        try {
            const { id } = req.params
            const { nome, tipo, quantidade } = req.body
            if(!id){
                res.status(400).json({ error: "ID do produto não informado" })
            }else{
                const produtoAtualizado = await productRepo.updateProduct(id, { nome, tipo, quantidade })
                res.json(produtoAtualizado)
            }
        } catch (error) {
            next(error) 
        }
    }

    async deleteProduct(req: Request, res: Response, next: Function){
        try {
            const { id } = req.params
            if(!id){
                res.status(400).json({ error: "ID do produto não informado" })
            }else{
                const produtoExcluido = await productRepo.deleteProduct(id)
                res.status(204).send("Produto excluido com sucesso").json(produtoExcluido)
            }
        } catch (error) {
            next(error)
        }
    }
}




