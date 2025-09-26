import { PrismaClient } from "../generated/prisma/index.js";
import type { Product } from "../models/productModel";

const prisma = new PrismaClient()

export const connect = async () => {
    await prisma.$connect()
    console.log('Banco de dados conectado com sucesso')
}
// connect()

export class ProductRepository{

    // createProducts(data : { nome: string, tipo: string, quantidade: number }){
    //     return prisma.produto.create({ data })
    // }
    
    createProducts(data : Omit<Product, 'id'>){
        return prisma.produto.create({ data })
    }

    getProducts(){
        return prisma.produto.findMany()
    }

    getProduct(id: string){
        return prisma.produto.findUnique({
            where: { id }
        })
    }

    // updateProduct(id: string, newData: { nome?: string, tipo?: string, quantidade?: number }){
    //     return prisma.produto.update({
    //         where: { id },
    //         data: newData
    //     })
    // }

    updateProduct(id: string, newData: Partial<Omit<Product, 'id'>>){
        return prisma.produto.update({
            where: { id },
            data: newData
        })
    }

    deleteProduct(id: string){
        return prisma.produto.delete({
            where: { id }
        })
    }

}