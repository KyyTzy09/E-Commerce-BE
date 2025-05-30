import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product.service";

export class ProductController {
  constructor(private readonly productService : ProductService){}
  public async getAllProductsByName( req: Request, res: Response, next: NextFunction ) {
    try {
      const { name, page, limit } = req.query;

      const allProduct = await this.productService.getAllProductByName({
        name: String(name),
        page: Number(page) || 1,
        limit: Number(limit) || 10,
      });
      res.status(200).json({
        status_code: 200,
        message: `Product dengan nama ${String(name)}ditemukan`,
        data : allProduct
      });
    } catch (error) {
      next(error);
    }
  }

  public async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { page , limit } = req.query;
      const allProduct = await this.productService.getAllProduct({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
      });
      res.status(200).json({
        status_code: 200,
        message: `Product ditemukan`,
        data: allProduct,
      });
    } catch (error) {
      next(error);
    }
  }
    public async getTopProducts( req: Request, res: Response, next: NextFunction ) {
    try {
      const getTopProducts = await this.productService.getTopProduct()
      res.status(200).json({
        status_code: 200,
        message: `Product ditemukan`,
        data : getTopProducts        
      });
    } catch (error) {
      next(error);
    }
  }

  public async getAllProductsByStoreId( req: Request, res: Response, next: NextFunction ) {
    try {
      const { page, limit } = req.query;
      const { storeId } = req.params;

      const allProduct = await this.productService.getAllProductByStoreId({
        storeId,
        page: Number(page) || 1,
        limit: Number(limit) || 10,
      });
      res.status(200).json({
        status_code: 200,
        message: `Product dengan storeId ${storeId} ditemukan`,
        data: allProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getProductsByStoreIdAndProductId( req: Request, res: Response, next: NextFunction ) {
    try {
      const { productId } = req.params;
      const { storeId } = req.body;
      const allProduct = await this.productService.getAllProductByStoreIdAndProductId({
        storeId,
        productId,
        page: 1,
        limit: 10,
      });
      res.status(200).json({
        status_code: 200,
        message: `Berhasil mendapatkan product dengan storeId ${storeId}`,
        data: allProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getProductById( req: Request, res: Response, next: NextFunction ) {
    try {
      const { productId } = req.params;
      const product = await this.productService.getProductById({ productId });
      const category = await
      res.status(200).json({
        status_code: 200,
        message: `Product dengan id ${productId} ditemukan`,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  public async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { storeId, price, stok } = req.body;
      const image = req.file ? req.file.path : "";
      const createdProduct = await this.productService.createProduct({
        storeId,
        ...req.body,
        price: Number(price),
        stok: Number(stok),
        image,
      });
      res.status(201).json({
        status_code: 201,
        message: "Berhasil menambahkan product",
        data: createdProduct,
      });
    } catch (error) {
      next(error);
    }
  }
  
  public async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;
      const { storeId , price, stok } = req.body;

      const product = await this.productService.getProductById({ productId });
      const image = req.file ? req.file.path : product?.product.image;
      const updateProduct = await this.productService.updateProduct({
        storeId,
        productId,
        ...req.body,
        price: Number(price),
        stok: Number(stok),
        image,
      });
      res
        .status(200)
        .json({
          status_code: 200,
          message: "Berhasil mengupdate product",
          data: updateProduct,
        });
    } catch (error) {
      next(error);
    }
  }
  
  public async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;

      const deletedProduct = await this.productService.deleteProductById({
        productId,
      });
      res
        .status(200)
        .json({
          status_code: 200,
          message: "Berhasil menghapus product",
          data: deletedProduct.deleteProduct,
        });
    } catch (error) {
      next(error);
    }
  }
}
