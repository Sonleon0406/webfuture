// server/index.js (ESM) - ĐÃ HOÀN CHỈNH + TỰ ĐỘNG TẠO ADMIN

import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const prisma = new PrismaClient();
const JWT_SECRET = "greenhaven123";

app.use(cors());
app.use(express.json());

// TỰ ĐỘNG TẠO TÀI KHOẢN ADMIN KHI SERVER KHỞI ĐỘNG (CHỈ CHẠY 1 LẦN)
(async () => {
  try {
    const adminPhone = "0123456789";
    const adminExists = await prisma.user.findUnique({
      where: { phone: adminPhone },
    });

    if (!adminExists) {
      await prisma.user.create({
        data: {
          phone: adminPhone,
          password: bcrypt.hashSync("admin123", 10),
          name: "Admin Green Haven",
          role: "admin",
        },
      });
    //   console.log("ĐÃ TẠO SẴN TÀI KHOẢN ADMIN:");
    //   console.log("   SĐT: 0123456789");
    //   console.log("   Mật khẩu: admin123");
    //   console.log("   → Vào http://localhost:8080/admin để đăng nhập ngay!");
    } else {
      console.log("Tài khoản admin đã tồn tại → sẵn sàng dùng!");
    }
  } catch (error) {
    console.error("Lỗi khi tạo admin:", error);
  }
})();

// === ĐĂNG NHẬP ===
app.post("/api/login", async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { phone } });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        { id: user.id, phone: user.phone, role: user.role },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        token,
        user: { phone: user.phone, name: user.name, role: user.role },
      });
    } else {
      res.status(401).json({ success: false, message: "Sai số điện thoại hoặc mật khẩu" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});

// Middleware kiểm tra token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Chưa đăng nhập" });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    res.status(401).json({ message: "Token sai hoặc hết hạn" });
  }
};

// === API SẢN PHẨM ===
app.get("/api/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

app.post("/api/products", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Chỉ admin mới được thêm" });
  const product = await prisma.product.create({ data: req.body });
  res.json(product);
});

app.put("/api/products/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Chỉ admin" });
  const product = await prisma.product.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(product);
});

app.delete("/api/products/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Chỉ admin" });
  await prisma.product.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

// === API ĐƠN HÀNG ===
app.get("/api/orders", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Chỉ admin" });
  const orders = await prisma.order.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(orders);
});

// Khởi động server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend đang chạy tại http://localhost:${PORT}`);
  console.log(`Trang admin: http://localhost:8080/admin`);
});