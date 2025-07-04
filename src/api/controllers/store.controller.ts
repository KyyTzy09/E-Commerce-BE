import { NextFunction, Request, Response } from "express";
import { StoreService } from "../services/store.service.js";

const storeService = new StoreService()
export class StoreController {
  public async getAllStores(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit } = req.query;

      const allStores = await storeService.getAllStores({
        page: Number(page) | 1,
        limit: Number(limit) | 10,
      });

      res.status(200).json({
        status_code: 200,
        message: "Berhasil mendapatkan semua store",
        pagination: {
          page: Number(page) | 1,
          limit: Number(limit) | 10,
        },
        data: allStores,
      });
    } catch (error) {
      next(error);
    }
  }
  public async getAllStoresByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit } = req.query;
      const user = (req as any).user;

      const allStores = await storeService.getAllStoresByUserId({
        userId: user.id,
        page: Number(page) | 1,
        limit: Number(limit) | 10,
      });

      res.status(200).json({
        status_code: 200,
        message: "Berhasil mendapatkan semua store",
        pagination: {
          page: Number(page) | 1,
          limit: Number(limit) | 10,
        },
        data: allStores,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getStoresById(req: Request, res: Response, next: NextFunction) {
    try {
      const { storeId } = req.params;
      const store = await storeService.getStoreById({ id : storeId });
      res.status(200).json({
        status_code: 200,
        message: "Berhasil mendapatkan store",
        data: store,
      });
    } catch (error) {
      next(error);
    }
  }
  public async createStore(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, info } = req.body;
      const user = await (req as any).user;
      const createdStore = await storeService.createStore({
        userId: user.id,
        name,
        info,
      });

      res.status(200).json({
        status_code: 201,
        message: "Berhasil membuat store",
        data: createdStore,
      });
    } catch (error) {
      next(error);
    }
  }
  public async updateStore(req: Request, res: Response, next: NextFunction) {
    try {
      const { storeId } = req.params;
      const { name, info } = req.body;
      const user = await (req as any).user;

      const updatedStore = await storeService.updateStore({
        id : storeId,
        userId: user.id,
        name,
        info,
      });
      res.status(200).json({
        status_code: 200,
        message: "Berhasil mengupdate store",
        data: updatedStore,
      });
    } catch (error) {
      next(error);
    }
  }
  public async deleteStore(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await (req as any).user;

      const deletedStores = await storeService.deleteAllStore({ userId: user.id });

      res.status(200).json({
        status_code: 200,
        message: "Berhasil menghapus semua store",
        data: deletedStores,
      });
    } catch (error) {
      next(error);
    }
  }
  public async deleteStoreById( req: Request, res: Response, next: NextFunction ) {
    try {
      const { storeId } = req.params;
      const user = await (req as any).user;

      const deletedStore = await storeService.deleteStoreById({ userId: user?.id, id : storeId });

      res.status(200).json({
        status_code: 200,
        message: "Berhasil menghapus store berdasarkan id",
        data: deletedStore.deletedStore,
      });
    } catch (error) {
      next(error);
    }
  }
}
