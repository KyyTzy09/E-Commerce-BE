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
      const user = (req as any).user;

      const orders = await this.service.getAllOrdersByUserId({
        userId: user.id,
      });

      res.status(200).json({
        status_code: 200,
        message: `Berhasil mendapatkan data order`,
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  }
  
  public async createOrder( req: Request, res: Response, next: NextFunction ) {
    try {
      const { productId, price, quantity } = req.body;
      const user = await (req as any).user;

      const createOrder = await this.service.createOrder({ productId, userId: user.id, price, quantity });
      res.status(200).json({
        status_code: 201,
        message: `Order sukses dibuat`,
        data: createOrder,
      })
    } catch (error) {
      next(error);
    }
  }
  public async createTransaction( req: Request, res: Response, next: NextFunction ) {
    try {
      const { productId, orderId } = req.body;
      const user = await (req as any).user;
      const transaction = await this.service.createTransaction({ productId, userId: user.id, orderId });
      res.status(200).json({
        status_code: 201,
        message: `Transaksi sukses dibuat`,
        data: transaction,
      })
    } catch (error) {
      next(error);
    }
  }
  public async succesTransaction( req: Request, res: Response, next: NextFunction ) {
    try {
      const { productId, orderId } = req.body;
      const user = await (req as any).user;
      const createOrder = await this.service.successTransaction({ productId, userId: user.id, orderId });
      res.status(200).json({
        status_code: 200,
        message: `Transaksi berhasil`,
        data: createOrder,
      })
    } catch (error) {
      next(error);
    }
  }
    public async cancelTransaction( req: Request, res: Response, next: NextFunction ) {
    try {
      const { productId, orderId } = req.body;
      const user = await (req as any).user;
      const createOrder = await this.service.cancelTransaction({ productId, userId: user.id, orderId });
      res.status(200).json({
        status_code: 200,
        message: `Transaksi Dibatalkan`,
        data: createOrder,
      })
    } catch (error) {
      next(error);
    }
  }
  public async deleteOrderById( req: Request, res: Response, next: NextFunction ) {
    try {
        const {orderId} = req.params;

        const deleted = await this.service.deleteOrderById({orderId})

        res.status(200).json({
        status_code: 200,
        message: `Order sukses dihapus`,
        data: deleted
      })
    } catch (error) {
      next(error);
    }
  }
}
