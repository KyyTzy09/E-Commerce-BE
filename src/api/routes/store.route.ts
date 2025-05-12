import express from "express";
import { ValidateMiddleware } from "../../common/middlewares/validate.middleware";
import { StoreController } from "../controllers/store.controller";
import { storeSchema } from "../validators/store.validator";
import { StoreService } from "../services/store.service";
import { authMiddleware } from "../../common/middlewares/auth.middleware";

const storeRouter = express.Router();
const storeController = new StoreController(new StoreService);

// stores
storeRouter.post("/" ,authMiddleware, ValidateMiddleware(storeSchema) , storeController.createStore.bind(storeController));
storeRouter.delete("/" , storeController.deleteStore.bind(storeController));

storeRouter.get("/user" ,authMiddleware , storeController.getAllStoresByUserId.bind(storeController));

// by Id
storeRouter.patch("/:storeId" ,authMiddleware, ValidateMiddleware(storeSchema), storeController.updateStore.bind(storeController));
storeRouter.get("/:storeId" , storeController.getStoresById.bind(storeController));
storeRouter.delete("/:storeId" , storeController.deleteStoreById.bind(storeController));

export default storeRouter;