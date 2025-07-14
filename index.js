import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/connection.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static("public"));
connectDB();

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Ecommerce Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
