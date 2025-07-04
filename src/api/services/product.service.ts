import { HttpException } from "../../common/error/exception.js";
import {
  createProductType,
  deleteProductByIdType,
  getAllProductType,
  productByIdAndStoreIdType,
  productByIdType,
  productByNameType,
  productByStoreIdType,
  updateProductType,
  updateStok,
} from "../../common/types/product.js";
import { categoryService } from "./category.service.js";
import { Product } from "@prisma/client";

export class ProductService {
  public async getAllProduct(data: getAllProductType) {
    const allProducts = await prisma.product.findMany({
      take: data.limit,
      skip: (data.page - 1) * data.limit,
      include: {
        category: true,
        order: true,
        Store: true,
      },
    });

    if (allProducts.length === 0) {
      throw new HttpException(404, " Product tidak ditemukan");
    }

    return allProducts;
  }
  public async getAllProductByName(data: productByNameType) {
    const products = await prisma.product.findMany({
      where: {
        product_name: { contains: data.name },
      },
      skip: (data.page - 1) * data.limit,
      take: data.limit,
      include: { Store: true, category: true, order: true },
    });

    if (products.length === 0) {
      throw new HttpException(404, "Product tidak ditemukan");
    }
    return products;
  }
  public async getAllProductByStoreId(data: productByStoreIdType) {
    const products = await prisma.product.findMany({
      where: {
        storeId: data.storeId,
      },
      skip: (data.page - 1) * data.limit,
      take: data.limit,
      include: { Store: true, category: true },
    });
    return products;
  }
  public async getTopProduct() {
    const getTopProduct = await prisma.product.findMany({
      orderBy: {
        order: {
          _count: "desc",
        },
      },
      take: 6,
      include: {
        order: true,
        Store: true,
      },
    });

    return getTopProduct;
  }
  public async getProductById(data: productByIdType) {
    if (!data.productId) {
      throw new HttpException(400, "All fields are required");
    }
    const catService = new categoryService();
    const product = await prisma.product.findUnique({
      where: { id: data.productId },
      include: {
        Store: true,
        comment: true,
        order: true,
      },
    });

    if (!product) {
      throw new HttpException(404, "Produk Tidak Ditemukan");
    }

    const category = await catService.getCategoryByProductId({
      product_Id: data.productId,
    });

    return { product, category };
  }
  public async getAllProductByStoreIdAndProductId(
    data: productByIdAndStoreIdType
  ) {
    const products = await prisma.product.findMany({
      where: { storeId: data.storeId, id: data.productId },
      skip: (data.page - 1) * data.limit,
      take: data.limit,
      include: { Store: true, category: true, order: true },
    });

    return products;
  }
  public async createProduct(data: createProductType) {
    const existingProduct = await prisma.product.findFirst({
      where: {
        product_name: data.name,
        storeId: data.storeId,
      },
    });

    if (existingProduct) {
      throw new HttpException(400, "Product dengan nama ini sudah ada");
    }

    const createProduct = await prisma.product.create({
      data: {
        product_name: data.name,
        price: data.price,
        description: data.description,
        stok: data.stok,
        storeId: data.storeId,
        image: data.image,
      },
    });
    return createProduct;
  }

  public async updateProduct(data: updateProductType) {
    const updateProduct = await prisma.product.update({
      where: {
        id: data.productId,
        storeId: data.storeId,
      },
      data: {
        product_name: data.name,
        price: data.price,
        description: data.description,
        stok: data.stok,
        storeId: data.storeId,
        image: data.image,
      },
    });
    return updateProduct;
  }

  public async deleteProductByStoreId(data: { storeId: string }) {
    const existingProduct = await prisma.product.findMany({
      where: {
        storeId: data.storeId,
      },
    });
    const deleteCategory = await prisma.categories.deleteMany({
      where: {
        product_id: {
          in: existingProduct.map((item: Product) => item.id),
        },
      },
    });

    const deletekomentar = await prisma.komentar.deleteMany({
      where: {
        product_id: {
          in: existingProduct.map((item : Product) => item.id),
        },
      },
    });

    const deleteOrder = await prisma.order.deleteMany({
      where: {
        product_id: {
          in: existingProduct.map((item : Product) => item.id),
        },
      },
    });

    const deleteProduct = await prisma.product.deleteMany({
      where: {
        storeId: data.storeId,
      },
    });
    return { deleteCategory, deletekomentar, deleteOrder, deleteProduct };
  }
  public async deleteProductById(data: deleteProductByIdType) {
    const deleteOrder = await prisma.order.deleteMany({
      where: {
        product_id: data.productId,
      },
    });
    const deleteCategory = await prisma.categories.deleteMany({
      where: {
        product_id: data.productId,
      },
    });

    const deletekomentar = await prisma.komentar.deleteMany({
      where: {
        product_id: data.productId,
      },
    });

    const deleteProduct = await prisma.product.delete({
      where: {
        id: data.productId,
      },
    });

    return { deleteOrder, deleteCategory, deletekomentar, deleteProduct };
  }
  public async updateStokProduct(data: updateStok) {
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: data.productId,
      },
    });

    if (!existingProduct) {
      throw new HttpException(404, "Product Tidak Ditemukan");
    }

    const updateStok = await prisma.product.update({
      where: {
        id: data.productId,
      },
      data: {
        stok: {
          decrement: data.quantity,
        },
      },
    });

    const updateStatus = await prisma.product.update({
      where: {
        id: data.productId,
      },
      data: {
        status: updateStok.stok <= 0 ? "Habis" : "Tersedia",
      },
    });
    return { updateStatus, updateStok };
  }
}
