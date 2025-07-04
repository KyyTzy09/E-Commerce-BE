import { HttpException } from "../../common/error/exception.js";
import {
  allStoresType,
  createStoreType,
  deleteStoreById,
  deleteStoreByUserIdTypes,
  storeByIdType,
  storeByUserIdType,
  updateStoreType,
} from "../../common/types/store.js";
import { ProductService } from "./product.service.js";
import { Store } from "@prisma/client";
import prisma from "../../common/utils/prisma.js";

export class StoreService {
  public async getAllStores(data: allStoresType) {
    const allStores = await prisma.store.findMany({
      include: {
        product: true,
      },
      skip: (data.page - 1) * 10,
      take: data.limit,
    });
    if (allStores.length === 0) {
      throw new HttpException(404, "No stores found");
    }

    return allStores;
  }
  public async getAllStoresByUserId(data: storeByUserIdType) {
    const allStores = await prisma.store.findMany({
      where: {
        userId: data.userId,
      },
      include: {
        product: true,
        user: true,
      },
      skip: (data.page - 1) * data.limit,
      take: data.limit,
    });
    if (allStores.length === 0) {
      throw new HttpException(404, "No stores found");
    }

    return allStores;
  }

  public async getStoreById(data: storeByIdType) {
    if (!data.id) {
      throw new HttpException(400, "All fields are required");
    }

    const store = await prisma.store.findUnique({
      where: {
        id: data.id,
      },
      include: {
        product: true,
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!store) {
      throw new HttpException(404, "Store not found");
    }

    return store;
  }

  public async createStore(data: createStoreType) {
    if (!data.userId || !data.name || !data.info) {
      throw new HttpException(400, "All fields are required");
    }

    const store = await prisma.store.findUnique({
      where: {
        store_name: data.name,
      },
    });

    if (store) {
      throw new HttpException(404, "Store dengan nama ini sudah tersedia");
    }

    const createStore = await prisma.store.create({
      data: {
        store_name: data.name,
        info: data.info,
        userId: data.userId,
      },
    });

    return createStore;
  }

  public async updateStore(data: updateStoreType) {
    if (!data.id || !data.name || !data.info) {
      throw new HttpException(400, "All fields are required");
    }

    const store = await prisma.store.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!store) {
      throw new HttpException(400, "Store Tidak tersedia");
    }

    const updateStore = await prisma.store.update({
      where: {
        userId: data.userId,
        id: data.id,
      },
      data: {
        store_name: data.name,
        info: data.info,
      },
    });

    return updateStore;
  }
  public async deleteAllStore(data: deleteStoreByUserIdTypes) {
    if (!data.userId) {
      throw new HttpException(400, "All fields are required");
    }

    const existingStores = await prisma.store.findMany({
      where: {
        userId: data.userId,
      },
      include: {
        product: true,
      },
    });

    if (existingStores.length === 0) {
      throw new HttpException(404, "No stores found");
    }

    const deletedProducts = await prisma.product.deleteMany({
      where: {
        storeId: {
          in: existingStores.map((store: Store) => store.id),
        },
      },
    });

    const deleteStore = await prisma.store.deleteMany({
      where: {
        userId: data.userId,
      },
    });

    return { deletedProducts, deleteStore };
  }
  public async deleteStoreById(data: deleteStoreById) {
    if (!data.id) {
      throw new HttpException(400, "All fields are required");
    }

    const productService = new ProductService();

    const existingStores = await prisma.store.findUnique({
      where: {
        userId: data.userId,
        id: data.id,
      },
    });

    if (!existingStores) {
      throw new HttpException(404, "No stores found");
    }

    const deleteProduct = await productService.deleteProductByStoreId({
      storeId: data.id,
    });

    const deletedStore = await prisma.store.deleteMany({
      where: {
        id: existingStores?.id,
      },
    });

    return { deletedStore, deleteProduct };
  }
}
