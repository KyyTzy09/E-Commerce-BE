import express, { urlencoded } from "express";
import { errorMiddleware } from "./common/middlewares/error.middleware.js";
import authRouter from "./api/routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./api/routes/user.route.js";
import adminRouter from "./api/routes/admin.route.js";
import productRouter from "./api/routes/product.route.js";
import orderRouter from "./api/routes/order.route.js";
import storeRouter from "./api/routes/store.route.js";
import categoryRouter from "./api/routes/category.route.js";
import commentRouter from "./api/routes/comment.route.js";

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/api/v2", (_req, res) => {
  res.send("hello world");
});

app.use("/api/v2/auth", authRouter);
app.use("/api/v2/me", userRouter);
app.use("/api/v2/admin", adminRouter);
app.use("/api/v2/store", storeRouter);
app.use("/api/v2/product", productRouter);
app.use("/api/v2/category", categoryRouter);
app.use("/api/v2/order", orderRouter);
app.use("/api/v2/komentar", commentRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
