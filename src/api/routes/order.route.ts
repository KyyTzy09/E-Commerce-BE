import Express from "express";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { OrderController } from "../controllers/order.controller";
import { OrderService } from "../services/order.service";

const orderRouter = Express.Router();

const controller = new OrderController(new OrderService);

orderRouter.get("/" , authMiddleware , controller.getOrdersByUserId.bind(controller));
orderRouter.post("/create" , authMiddleware , controller.createOrder.bind(controller));
orderRouter.post("/pay" , authMiddleware , controller.createTransaction.bind(controller));
orderRouter.post("/success" , authMiddleware , controller.succesTransaction.bind(controller));
orderRouter.post("/cancel" , authMiddleware , controller.cancelTransaction.bind(controller));

export default orderRouter;