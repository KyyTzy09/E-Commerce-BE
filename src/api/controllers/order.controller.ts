import { NextFunction, Request, Response } from "express";
import { OrderService } from "../services/order.service";

export class OrderController {
  constructor(private readonly service: OrderService) {}

  public async getAllOrders(_req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await this.service.getAllOrders();
      res.status(200).json({
        status_code: 200,
        message: `Berhasil mendapatkan semua data order`,
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getOrdersByUserId( req: Request, res: Response, next: NextFunction ) {
    try {
      const user = await (req as any).user;

      const orders = await this.service.getAllOrdersByUserId({
        userId: user.id,
      });

      res.status(200).json({
        status_code: 200,
        message: `Berhasil mendapatkan data order dengan user id ${user.id}`,
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  }

  public async createTransaction( req: Request, res: Response, next: NextFunction ) {
    try {
      const { productId } = req.body;
      const user = await (req as any).user;
      const createOrder = await this.service.createTransaction({ productId, userId: user.id });
      res.status(200).json({
        status_code: 200,
        message: `Transaksi sukses dibuat`,
        data: createOrder,
      })
    } catch (error) {
      next(error);
    }
  }

  public async deleteOrderById( req: Request, res: Response, next: NextFunction ) {
    try {
        const {orderId} = req.body;

        const deleted = await this.service.deleteOrderById({orderId})

        res.status(200).json({
        status_code: 200,
        message: `Transaksi sukses dibuat`,
        data: deleted
      })
    } catch (error) {
      next(error);
    }
  }
}
