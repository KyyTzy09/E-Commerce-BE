import { randomUUID } from "crypto";
import Snap from "@/common/configs/midtrans.js";
import { HttpException } from "@/common/error/exception.js";
import {
  createOrderTypes,
  createTransasctionTypes,
  orderByIdTypes,
  orderByUserIdTypes,
  successTransaction,
  updateOrderTypes,
} from "@/common/types/order.js";
import { ProductService } from "./product.service.js";
import { UserService } from "./user.service.js";

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
      include: {
        product: true,
        user: true,
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
      },include : {
        product :true,
        user : true
      }
    });

    if (!order) {
      throw new HttpException(404, "Data Pesanan Tidak Ditemukan");
    }

    return order;
  }

  public async createOrder(data: createOrderTypes) {
    const order_id = `${Date.now()}-${randomUUID()}`;
    const create = await prisma.order.create({
      data: {
        user_id: data.userId,
        product_id: data.productId,
        order_id: order_id,
        price: data.price * data.quantity,
      },
    });
    return create;
  }

  public async updateOrder(data: updateOrderTypes) {
    const existingOrder = await prisma.order.findFirst({
      where: {
        user_id: data.userId,
        order_id: data.orderId,
      },
    });

    if (!existingOrder) {
      throw new HttpException(404, "Data Pesanan Tidak Ditemukan");
    }

    const updateOrder = await prisma.order.update({
      where: {
        user_id: data.userId,
        order_id: data.orderId,
      },
      data: {},
    });

    return;
  }

  public async deleteOrderByProductId(data: { productId: string }) {
    const existingOrder = await prisma.order.findMany({
      where: {
        product_id: data.productId,
      },
    });

    if (existingOrder.length === 0) {
      throw new HttpException(404, "Order Tidak Ditemukan");
    }

    const deleteOrder = await prisma.order.deleteMany({
      where: {
        product_id: data.productId,
      },
    });

    return deleteOrder;
  }

  public async deleteOrderById(data: orderByIdTypes) {
    const existingOrder = await this.getOrderById({ orderId: data.orderId });

    if (!existingOrder) {
      throw new HttpException(404, "Product Tidak Ditemukan");
    }

    const deleteOrder = await prisma.order.delete({
      where: {
        order_id: existingOrder.order_id,
      },
    });

    return deleteOrder;
  }

  public async createTransaction(data: createTransasctionTypes) {
    const existingOrder = await this.getOrderById({orderId : data.orderId})
    
    if (!existingOrder) {
      throw new HttpException(404 , "Order tidak ditemukan");
    }
    const user = await userService.getProfileById({ id: data.userId });

    const parameter = {
      transaction_details: {
        order_id : existingOrder.order_id,
        gross_amount: existingOrder?.price,
      },
      item_details: [
        {
          id: existingOrder?.product.id,
          price: existingOrder?.product.price,
          name: existingOrder?.product.product_name,
          quantity: existingOrder.price / existingOrder.product.price,
        },
      ],
      customer_details: {
        first_name: user.profile?.name,
        email: user.email,
      },
      callbacks: {
        finish: "http://localhost:5173",
      },
    };

    const transaction = await Snap.createTransaction(parameter);
    return transaction.token
  }
  public async successTransaction(data: successTransaction) {
    const order = await this.getOrderById({orderId : data.orderId})

    const product = await productService.getProductById({
      productId: data.productId,
    });

    const updateOrder = await prisma.order.update({
      where: {
        order_id: data.orderId,
        user_id: data.userId,
        product_id: product.product.id,
      },
      data: {
        status: "Success",
      },
    });

    const updateProduct = await productService.updateStokProduct({
      productId: data.productId,
      quantity: order.price / product.product.price,
    });

    return {
      order: updateOrder,
      updated: updateProduct,
    };
  }
  public async cancelTransaction(data: {
    productId: string;
    userId: string;
    orderId: string;
  }) {
    const product = await productService.getProductById({
      productId: data.productId,
    });

    const updateOrder = await prisma.order.update({
      where: {
        order_id: data.orderId,
        user_id: data.userId,
        product_id: product.product.id,
      },
      data: {
        status: "Canceled",
      },
    });

    return updateOrder;
  }
}
