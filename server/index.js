// server/index.js - PHIÊN BẢN CUỐI CÙNG, CHỐNG 403 HOÀN HẢO
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const prisma = new PrismaClient();
const JWT_SECRET = "greenhaven2025";

app.use(cors());
app.use(express.json());

// TẠO HOẶC CẬP NHẬT ADMIN LUÔN LUÔN (CHỐNG 403)
(async () => {
  const hashed = bcrypt.hashSync("admin123", 10);
  await prisma.user.upsert({
    where: { phone: "0123456789" },
    update: {
      password: hashed,
      role: "admin",
      name: "Admin Green Haven"
    },
    create: {
      phone: "0123456789",
      password: hashed,
      name: "Admin Green Haven",
      role: "admin"
    }
  });
  console.log("ĐÃ ĐẢM BẢO ADMIN: 0123456789 / admin123 (role: admin)");
})();

// LOGIN - ĐƠN GIẢN HOÁ, CHỐNG 403
app.post("/api/login", async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user) return res.status(401).json({ message: "Không tìm thấy user" });

    const ok = bcrypt.compareSync(password, user.password);
    if (!ok) return res.status(401).json({ message: "Sai mật khẩu" });

    // BUỘC PHẢI LÀ ADMIN MỚI ĐƯỢC VÀO
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Không phải admin" });
    }

    const token = jwt.sign({ id: user.id, role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Middleware admin
const adminAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return res.status(401).json({ message: "No token" });
  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin") return res.status(403).json({ message: "Not admin" });
    next();
  } catch {
    res.status(401).json({ message: "Token sai" });
  }
};

// API PRODUCTS
app.get("/api/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});
app.post("/api/products", adminAuth, async (req, res) => {
  const p = await prisma.product.create({ data: req.body });
  res.json(p);
});
app.put("/api/products/:id", adminAuth, async (req, res) => {
  const p = await prisma.product.update({ where: { id: req.params.id }, data: req.body });
  res.json(p);
});
app.delete("/api/products/:id", adminAuth, async (req, res) => {
  await prisma.product.delete({ where: { id: req.params.id } });
  res.json({ ok: true });
});

// API ORDERS
app.get("/api/orders", adminAuth, async (req, res) => {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" } });
  res.json(orders);
});

app.get("/test", (req, res) => res.json({ message: "Backend OK nè!" }));

app.listen(5000, () => {
  console.log("Backend chạy tại http://localhost:5000");
  console.log("Đăng nhập admin: 0123456789 / admin123");
});