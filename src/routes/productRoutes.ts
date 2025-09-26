import { Router } from "express";
import { ProductController } from "../controllers/productsController";

const router = Router()
const productController = new ProductController()

router.post('/produtos', productController.newProduct)
router.get('/produtos', productController.getAllProducts)
router.get('/produtos/:id', productController.getOneProduct)
router.patch('/produtos/:id', productController.update)
router.delete('/produtos/:id', productController.deleteProduct)

// export default router

