import express from "express";
import { ValidateMiddleware } from "@/common/middlewares/validate.middleware.js";
import { StoreController } from "../controllers/store.controller.js";
import { storeSchema } from "../validators/store.validator.js";
import { authMiddleware } from "@/common/middlewares/auth.middleware.js";

const storeRouter = express.Router();
const storeController = new StoreController();

// stores
storeRouter.post("/" ,authMiddleware, ValidateMiddleware(storeSchema) , storeController.createStore);
storeRouter.delete("/" , storeController.deleteStore);

storeRouter.get("/user" ,authMiddleware , storeController.getAllStoresByUserId);

// by Id
storeRouter.patch("/:storeId" ,authMiddleware, ValidateMiddleware(storeSchema), storeController.updateStore);
storeRouter.get("/:storeId" , storeController.getStoresById);
storeRouter.delete("/:storeId" , storeController.deleteStoreById);

export default storeRouter;