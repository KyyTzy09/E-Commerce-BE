import { NextFunction, Request, Response } from "express";
import { categoryService } from "../services/category.service.js";


const categoryServices = new categoryService()
export class categoryController {
  async getAllCategory(_req: Request, res: Response, next: NextFunction) {
    try {
      const allCategory = await categoryServices.getAllCategory();
      res.status(200).json({
        status_code: 200,
        message: "Berhasil mendapatkan semua Category",
        data: allCategory,
      });
    } catch (error) {
      next(error);
    }
  }
  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;
      const category = await categoryServices.getCategoryById({
        id: categoryId,
      });
      res.status(200).json({
        status_code: 200,
        message: `Category dengan id ${categoryId} ditemukan`,
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const createCategory = await categoryServices.createCategory({
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

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const { categoryId } = req.params;

      const updateCategory = await categoryServices.updateCategory({
        id: categoryId,
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

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;

      const deleteCategory = await categoryServices.deleteCategory({
        id: categoryId,
      });

      res.status(200).json({
        status_code: 200,
        message: "Berhasil menghapus Category",
        data: deleteCategory,
      });
    } catch (error) {
      next(error);
    }
  }
  
  async getProductByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, page, limit } = req.query;
      const firstCategory = await categoryServices.getFirstCategory();
      const productByCategory =
        await categoryServices.getProductByCategory({
          name: name ? String(name) : (firstCategory?.category_name as string),
          page: Number(page) || 1,
          limit: Number(limit) || 10,
        });

      res.status(200).json({
        status_code: 200,
        message: `${name ? name : firstCategory?.category_name}`,
        data: productByCategory,
      });
    } catch (error) {
      next(error);
    }
  }
  async addProductToCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId, name } = req.body;

      const addProduct = await categoryServices.addProductToCategory({
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

  async removeProductFromCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { productId } = req.body;

      const removeProduct =
        await categoryServices.removeProductFromCategory({
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
