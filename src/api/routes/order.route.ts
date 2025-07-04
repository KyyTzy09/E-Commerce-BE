import Express from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware.js";
import { OrderController } from "../controllers/order.controller.js";

const orderRouter = Express.Router();

const controller = new OrderController();

orderRouter.get("/" , authMiddleware , controller.getOrdersByUserId);
orderRouter.post("/create" , authMiddleware , controller.createOrder);
orderRouter.post("/pay" , authMiddleware , controller.createTransaction);
orderRouter.post("/success" , authMiddleware , controller.succesTransaction);
orderRouter.post("/cancel" , authMiddleware , controller.cancelTransaction);

orderRouter.delete("/:orderId" , authMiddleware , controller.deleteOrderById);
export default orderRouter;