import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";

import { databaseConnect } from "./src/config/databaseConfig.js";

import errorMiddleware from "./src/middleware/errorMiddleware.js";

import authRouter from "./src/routes/authRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import procurementRoutes from "./src/routes/procurementRoutes.js";

import seedDatabase from "./seedDatabase.js";
import productCategoryRoutes from "./src/routes/productCategoryRoutes.js";

const app = express();

const server = http.createServer(app);

dotenv.config();

databaseConnect();

app.use(cors());

app.use(express.json());

app.use(express.static("./public/uploads"));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/auth", authRouter);

app.use("/api/user", userRouter);

app.use("/api/procurement", procurementRoutes);

app.use("/api/productCategory", productCategoryRoutes);

app.use(errorMiddleware.notFound);

app.use(errorMiddleware.errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(
  PORT,
  console.log(`Server started in ${process.env.NODE_ENV} mode on port: ${PORT}`)
);

seedDatabase();
