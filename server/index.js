// server/index.js - HOÀN CHỈNH, CHỈ 1 FILE DUY NHẤT
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const prisma = new PrismaClient();
const JWT_SECRET = "webfuture2025";

app.use(cors());
app.use(express.json());

// TỰ ĐỘNG TẠO ADMIN KHI CHẠY LẦN ĐẦU
(async () => {
  try {
    await prisma.user.upsert({
      where: { phone: "0123456789" },
      update: {},
      create: {
        phone: "0123456789",
        password: bcrypt.hashSync("admin123", 10),
        name: "Admin",
        role: "admin"
      }
    });
    console.log("Admin đã sẵn sàng → SĐT: 0123456789 | MK: admin123");
  } catch (e) { }
})();

// Đăng nhập
app.post("/api/login", async (req, res) => {
  const { phone, password } = req.body;
  const user = await prisma.user.findUnique({ where: { phone } });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: "Sai thông tin" });
  }
});

// Middleware bảo vệ admin
const adminOnly = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin") return res.status(403).json({ message: "Not admin" });
    next();
  } catch (e) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// API Sản phẩm (khách xem được, admin thêm/sửa/xóa)
app.get("/api/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

app.post("/api/products", adminOnly, async (req, res) => {
  const p = await prisma.product.create({ data: req.body });
  res.json(p);
});

app.put("/api/products/:id", adminOnly, async (req, res) => {
  const p = await prisma.product.update({ where: { id: req.params.id }, data: req.body });
  res.json(p);
});

app.delete("/api/products/:id", adminOnly, async (req, res) => {
  await prisma.product.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

// API Đơn hàng
app.get("/api/orders", adminOnly, async (req, res) => {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" } });
  res.json(orders);
});

app.listen(5000, () => console.log("Backend chạy tại http://localhost:5000"));