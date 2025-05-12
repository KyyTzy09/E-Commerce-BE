import { NextFunction, Request, Response } from "express";
import { categoryService } from "../services/category.service";

export class categoryController {
  constructor(private readonly categoryServices: categoryService) {}
  async getAllCategory( _req: Request, res: Response, next: NextFunction ) {
    try {
      const allCategory = await this.categoryServices.getAllCategory();
      res.status(200).json({
        status_code: 200,
        message: "Berhasil mendapatkan semua Category",
        data: allCategory,
      });
    } catch (error) {
      next(error);
    }
  }
  async getCategoryById( req: Request, res: Response, next: NextFunction ) {
    try {
      const { categoryId } = req.params;
      const category = await this.categoryServices.getCategoryById({id : categoryId});
      res.status(200).json({
        status_code: 200,
        message: `Category dengan id ${categoryId} ditemukan`,
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }
  
  async createCategory( req: Request, res: Response, next: NextFunction ) {
    try {
      const { name } = req.body;
      const createCategory = await this.categoryServices.createCategory({
        name,
      });

      res.status(201).json({
        status_code: 201,
        message: "Berhasil menambahkan Category",
        data: createCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCategory( req: Request, res: Response, next: NextFunction ) {
    try {
      const { name } = req.body;
      const { categoryId } = req.params;

      const updateCategory = await this.categoryServices.updateCategory({
        id : categoryId,
        name,
      });

      res.status(200).json({
        status_code: 200,
        message: "Berhasil mengupdate Category",
        data: updateCategory,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteCategory( req: Request, res: Response, next: NextFunction ) {
    try {
      const { categoryId } = req.params;

      const deleteCategory = await this.categoryServices.deleteCategory({id : categoryId});

      res.status(200).json({
        status_code: 200,
        message: "Berhasil menghapus Category",
        data: deleteCategory,
      });
    } catch (error) {
      next(error);
    }
  }
  async getProductByCategory( req: Request, res: Response, next: NextFunction ) {
    try {
      const { name } = req.query;

      const productByCategory =
        await this.categoryServices.getProductByCategory({
          name: String(name),
        });

      res.status(200).json({
        status_code: 200,
        message: `Berhasil mendapatkan Product dengan Category ${name}`,
        data: productByCategory,
      });
    } catch (error) {
      next(error);
    }
  }
  async addProductToCategory( req: Request, res: Response, next: NextFunction ) {
    try {
      const { productId, name } = req.body;

      const addProduct = await this.categoryServices.addProductToCategory({
        name,
        product_Id: productId,
      });

      res.status(200).json({
        status_code: 200,
        message: `Berhasil menambahkan Product ke Category ${String(name)}`,
        data: addProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  async removeProductFromCategory( req: Request, res: Response, next: NextFunction ) {
    try {
      const { productId } = req.body;
      const { categoryId } = req.params;

      const removeProduct =
        await this.categoryServices.removeProductFromCategory({
          id: categoryId,
          product_Id: productId,
        });

      res.status(200).json({
        status_code: 200,
        message: "Berhasil menghapus Product From Category",
        data: removeProduct,
      });
    } catch (error) {
      next(error);
    }
  }
}
