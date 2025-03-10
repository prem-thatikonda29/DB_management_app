// importing libraries
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// importing functions
import connectDB from "./connect.js";

// importing middlewares
import errorMiddleware from "./middlewares/errorMiddleware.js";

// import routers
import productRouter from "./routes/productRoute.js";

// setting up an express application
const app = express();

// configuring a dotenv file
dotenv.config();

const PORT = process.env.PORT || 8000;

// Applying middlewares
app.use(express.json());
app.use(cors());

// handling static file uploads
app.use("/uploads", express.static("uploads"));

// Adding routers
app.use("/api/products", productRouter);

// Adding error handling middleware
app.use(errorMiddleware);

// connecting to mongodb database
connectDB();

// health route
app.get("/health", (req, res) => {
  res.send("API is running...");
});

// application listening
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
