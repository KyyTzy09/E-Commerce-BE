import express from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { RoleGuard } from "../../common/guards/role.guard";
import storeRouter from "./store.route";
import { categoryController } from "../controllers/category.controller";
import { categoryService } from "../services/category.service";
import { OrderController } from "../controllers/order.controller";
import { OrderService } from "../services/order.service";
import { CommentController } from "../controllers/command.controller";
import { CommentService } from "../services/comment.service";

const adminRouter = express.Router();

adminRouter.get("/", authMiddleware , RoleGuard, (_req , res ) => {
    res.send("Hello Admin");
})

const catController = new categoryController(new categoryService)
const orderController = new OrderController(new OrderService)
const commentController = new CommentController(new CommentService)

adminRouter.use("/store" , authMiddleware , RoleGuard , storeRouter);

adminRouter.get("/comment" , authMiddleware, RoleGuard, commentController.getAllComment.bind(commentController))

adminRouter.post("/category", authMiddleware , RoleGuard, catController.createCategory.bind(catController))

adminRouter.delete("/category" , authMiddleware, RoleGuard, catController.deleteCategory.bind(catController))

adminRouter.get("/order" , authMiddleware , RoleGuard, orderController.getAllOrders.bind(orderController))

export default adminRouter;