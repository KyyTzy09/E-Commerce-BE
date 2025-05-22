import { randomUUID } from "crypto";
import Snap from "../../common/configs/midtrans";
import { HttpException } from "../../common/error/exception";
import {
  createOrderTypes,
  createTransasctionTypes,
  orderByIdTypes,
  orderByUserIdTypes,
} from "../../common/types/order";
import { ProductService } from "./product.service";
import { UserService } from "./user.service";

const productService = new ProductService();
const userService = new UserService();

export class OrderService {
  public async getAllOrders() {
    const getAllOrder = await prisma.order.findMany();

    if (getAllOrder.length === 0) {
      throw new HttpException(404, "Data Pesanan Tidak Ditemukan");
    }

    return getAllOrder;
  }
  public async getAllOrdersByUserId(data: orderByUserIdTypes) {
    const order = await prisma.order.findMany({
      where: {
        user_id: data.userId,
      },
    });

    if (order.length === 0) {
      throw new HttpException(404, "Data Pesanan Tidak Ditemukan");
    }

    return order;
  }
  public async getOrderById(data: orderByIdTypes) {
    const order = await prisma.order.findUnique({
      where: {
        order_id: data.orderId,
      },
    });

    if (!order) {
      throw new HttpException(404, "Data Pesanan Tidak Ditemukan");
    }

    return order;
  }
  public async createOrder(data: createOrderTypes) {
    const create = await prisma.order.create({
      data: {
        user_id: data.userId,
        product_id: data.productId,
        order_id: data.orderId,
      },
    });

    return create;
  }

  // public async updateOrder(data: updateOrderTypes) {
  //   let status_db

  //   const existingOrder = await prisma.order.findFirst({
  //     where: {
  //       user_id: data.userId,
  //       order_id: data.orderId,
  //     },
  //   });

  //   if (!existingOrder) {
  //     throw new HttpException(404, "Data Pesanan Tidak Ditemukan");
  //   }

  //   const updateOrder = await prisma.order.update({
  //     where: {
  //       user_id: data.userId,
  //       order_id: data.orderId,
  //     },
  //     data: {
  //     },
  //   });

  //   return;
  // }

  public async deleteOrder() {}

  public async createTransaction(data: createTransasctionTypes) {
    const product = await productService.getProductById({
      productId: data.productId,
    });

    const order_id = `${Date.now()}-${randomUUID()}`;

    const user = await userService.getProfileById({ id: data.userId });

    const parameter = {
      transaction_details: {
        order_id,
        gross_amount: product?.product.price,
      },
      item_details: [
        {
          id: product?.product.id,
          price: product?.product.price,
          name: product?.product.product_name,
          quantity: 1,
        },
      ],
      customer_details: {
        first_name: user.profile?.name,
        email: user.email,
      },
      callbacks : {
        finish: "http://localhost:5173"
      }
    };

    const transaction = await Snap.createTransaction(parameter);

    const createOrder = await this.createOrder({
      userId: data.userId,
      productId: data.productId,
      orderId: order_id,
    });

    const updateProduct = await productService.updateStokProduct({
      productId: data.productId,
    });
    return {
      order: createOrder,
      transaction: transaction.token,
      updated: updateProduct,
    };
  }
}
