import express from "express";
import { categoryController } from "../controllers/category.controller";
import { categoryService } from "../services/category.service";

const categoryRouter = express.Router();
const controller = new categoryController(new categoryService);

categoryRouter.get("/" , controller.getAllCategory.bind(controller)); 
categoryRouter.post("/" , controller.createCategory.bind(controller));

categoryRouter.get("/all" , controller.getProductByCategory.bind(controller));
categoryRouter.post("/add" , controller.addProductToCategory.bind(controller));
categoryRouter.delete("/remove" , controller.removeProductFromCategory.bind(controller));

categoryRouter.get("/:categoryId" , controller.getCategoryById.bind(controller));
categoryRouter.patch("/:categoryId" , controller.updateCategory.bind(controller));
categoryRouter.delete("/:categoryId" , controller.deleteCategory.bind(controller));


export default categoryRouter;