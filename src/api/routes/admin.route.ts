import express from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { adminMiddleware } from "../../common/middlewares/admin-middleware";
import { categoryController } from "../controllers/category.controller";
import { categoryService } from "../services/category.service";
import { OrderController } from "../controllers/order.controller";
import { OrderService } from "../services/order.service";

const adminRouter = express.Router();

adminRouter.get("/", authMiddleware , adminMiddleware, (_req , res ) => {
    res.send("Hello Admin");
});

const catController = new categoryController(new categoryService);
const orderController = new OrderController(new OrderService);

adminRouter.post("/category", authMiddleware , adminMiddleware, catController.createCategory.bind(catController));

adminRouter.delete("/category/:categoryId" , authMiddleware, adminMiddleware, catController.deleteCategory.bind(catController));

adminRouter.get("/order" , authMiddleware , adminMiddleware, orderController.getAllOrders.bind(orderController));

export default adminRouter;