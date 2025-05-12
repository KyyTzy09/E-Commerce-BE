import express, { urlencoded } from "express";
import { errorMiddleware } from "./common/middlewares/error.middleware";
import authRouter from "./api/routes/auth.route";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./api/routes/user.route";
import adminRouter from "./api/routes/admin.route";
import productRouter from "./api/routes/product.route";
import orderRouter from "./api/routes/order.route";
import storeRouter from "./api/routes/store.route";
import categoryRouter from "./api/routes/category.route";

const app = express();
const port = 5001;

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/v2", (_req, res) => {
  res.send("hello world");
});

app.use("/api/v2/auth", authRouter);
app.use("/api/v2/me", userRouter);
app.use("/api/v2/admin", adminRouter);
app.use("/api/v2/store" , storeRouter);
app.use("/api/v2/product", productRouter);
app.use("/api/v2/category" , categoryRouter);
app.use("/api/v2/order", orderRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});