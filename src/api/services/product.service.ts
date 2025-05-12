import { idText } from "typescript";
import { HttpException } from "../../common/error/exception";
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
} from "../../common/types/product";

export class ProductService {
  public async getAllProduct(data: getAllProductType) {
    const allProducts = await prisma.product.findMany({
      take: data.limit,
      skip: (data.page - 1) * data.limit,
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
      include: { Store: true, category: true },
    });
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
  public async getProductById(data: productByIdType) {
    if (!data.productId)
      throw new HttpException(400, "All fields are required");
    const product = await prisma.product.findUnique({
      where: { id: data.productId },
      include: { Store: true, category: true },
    });

    if (!product) {
      throw new HttpException(404 , "Produk Tidak Ditemukan")
    }

    return product;
  }
  public async getAllProductByStoreIdAndProductId(
    data: productByIdAndStoreIdType
  ) {
    const products = await prisma.product.findMany({
      where: { storeId: data.storeId, id: data.productId },
      skip: (data.page - 1) * data.limit,
      take: data.limit,
      include: { Store: true, category: true },
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
  public async deleteProductById(data: deleteProductByIdType) {
    const updateProduct = await prisma.product.delete({
      where: {
        id: data.productId,
        storeId: data.storeId,
      },
    });
    return updateProduct;
  }
  public async updateStokProduct(data: updateStok) {
    const existingProduct = await prisma.product.findFirst({
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
          decrement: 1,
        },
      },
    });

    const updateStatus = await prisma.product.update({
      where: {
        id: data.productId,
      },
      data: {
        status: updateStok.stok === 0 ? "Habis" : "Tersedia",
      },
    });
    return {updateStatus , updateStok}
  }
}
