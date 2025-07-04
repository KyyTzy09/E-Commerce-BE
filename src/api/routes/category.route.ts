import express from "express";
import { categoryController } from "../controllers/category.controller.js";

const categoryRouter = express.Router();
const controller = new categoryController();

categoryRouter.get("/" , controller.getAllCategory); 
categoryRouter.post("/" , controller.createCategory);

categoryRouter.get("/product" , controller.getProductByCategory);
categoryRouter.post("/add" , controller.addProductToCategory);
categoryRouter.delete("/remove" , controller.removeProductFromCategory);

categoryRouter.get("/:categoryId" , controller.getCategoryById);
categoryRouter.patch("/:categoryId" , controller.updateCategory);
categoryRouter.delete("/:categoryId" , controller.deleteCategory);


export default categoryRouter;