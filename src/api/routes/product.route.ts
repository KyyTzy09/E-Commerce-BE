import express from "express";
import { ProductController } from "../controllers/product.controller";
import { upload } from "../../common/middlewares/multer.middleware";
import { ValidateMiddleware } from "../../common/middlewares/validate.middleware";
import { productSchema } from "../validators/product.validator";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { ProductService } from "../services/product.service";

const productRouter = express.Router();
const productController = new ProductController(new ProductService);

productRouter.get("/" , productController.getAllProducts.bind(productController));
productRouter.get("/", productController.getAllProductsByStoreId.bind(productController));  
productRouter.post("/", authMiddleware, upload.single("image"),ValidateMiddleware(productSchema), productController.createProduct.bind(productController));

productRouter.get("/search", productController.getAllProductsByName.bind(productController));
productRouter.get("/top" , productController.getTopProducts.bind(productController));


productRouter.get("/:productId", productController.getProductById.bind(productController));
productRouter.patch("/:productId", authMiddleware, upload.single("image"), ValidateMiddleware(productSchema), productController.updateProduct.bind(productController)); // req storeId
productRouter.delete("/:productId", productController.deleteProduct.bind(productController));
productRouter.get("/:productId/store", productController.getProductsByStoreIdAndProductId.bind(productController)); // req body
export default productRouter;