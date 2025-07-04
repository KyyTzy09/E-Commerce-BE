import express from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { adminMiddleware } from "../../common/middlewares/admin-middleware.js";
import { categoryController } from "../controllers/category.controller.js";
import { OrderController } from "../controllers/order.controller.js";

const adminRouter = express.Router();

adminRouter.get("/", authMiddleware , adminMiddleware, (_req , res ) => {
    res.send("Hello Admin");
});

const catController = new categoryController();
const orderController = new OrderController();

adminRouter.post("/category", authMiddleware , adminMiddleware, catController.createCategory);

adminRouter.delete("/category/:categoryId" , authMiddleware, adminMiddleware, catController.deleteCategory);

adminRouter.get("/order" , authMiddleware , adminMiddleware, orderController.getAllOrders);

export default adminRouter;