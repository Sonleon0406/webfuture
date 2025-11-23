// src/admin/AdminDashboard.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [token, setToken] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("login");

  // Đăng nhập admin
  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", { phone, password });
      setToken(res.data.token);
      localStorage.setItem("adminToken", res.data.token);
      setActiveTab("dashboard");
      loadData(res.data.token);
    } catch (err) {
      alert("Sai số điện thoại hoặc mật khẩu");
    }
  };

  const loadData = async (tk) => {
    const headers = { Authorization: `Bearer ${tk || localStorage.getItem("adminToken")}` };
    const [prods, ords] = await Promise.all([
      axios.get("http://localhost:5000/api/products", { headers }),
      axios.get("http://localhost:5000/api/orders", { headers }),
    ]);
    setProducts(prods.data);
    setOrders(ords.data);
  };

  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      setActiveTab("dashboard");
      loadData();
    }
  }, []);

  // Đăng xuất
  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken("");
    setActiveTab("login");
  };

  if (activeTab === "login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
          <h1 className="text-4xl font-bold text-center text-green-800 mb-8">ADMIN LOGIN</h1>
          <input
            type="text"
            placeholder="Số điện thoại"
            className="w-full px-4 py-3 border border-green-300 rounded-lg mb-4 focus:outline-none focus:border-green-600"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full px-4 py-3 border border-green-300 rounded-lg mb-6 focus:outline-none focus:border-green-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={login}
            className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-xl hover:bg-green-700 transition"
          >
            Đăng Nhập Admin
          </button>
          <p className="text-center mt-4 text-gray-600">
            Dùng thử: <br />
            <strong>SĐT:</strong> 0123456789 <br />
            <strong>Mật khẩu:</strong> admin123
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-green-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-10">Green Haven Admin</h2>
        <button onClick={() => setActiveTab("dashboard")} className="block w-full text-left py-3 px-4 hover:bg-green-700 rounded">Dashboard</button>
        <button onClick={() => { setActiveTab("products"); loadData(); }} className="block w-full text-left py-3 px-4 hover:bg-green-700 rounded">Sản Phẩm</button>
        <button onClick={() => { setActiveTab("orders"); loadData(); }} className="block w-full text-left py-3 px-4 hover:bg-green-700 rounded">Đơn Hàng</button>
        <button onClick={logout} className="block w-full text-left py-3 px-4 hover:bg-red-700 rounded mt-auto">Đăng Xuất</button>
      </div>

      {/* Main */}
      <div className="flex-1 p-10">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-4xl font-bold text-green-800 mb-8">Dashboard</h1>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-xl shadow-lg"><h3 className="text-5xl font-bold text-green-600">{products.length}</h3><p>Sản phẩm</p></div>
              <div className="bg-white p-8 rounded-xl shadow-lg"><h3 className="text-5xl font-bold text-blue-600">{orders.length}</h3><p>Đơn hàng</p></div>
              <div className="bg-white p-8 rounded-xl shadow-lg"><h3 className="text-5xl font-bold text-orange-600">{orders.filter(o => o.status === "pending").length}</h3><p>Chờ xử lý</p></div>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Quản Lý Sản Phẩm</h1>
            <button className="bg-green-600 text-white px-6 py-3 rounded mb-4">+ Thêm sản phẩm mới</button>
            <div className="grid gap-4">
              {products.map(p => (
                <div key={p.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{p.name}</h3>
                    <p>{p.price.toLocaleString()}₫ • Còn {p.stock}</p>
                  </div>
                  <div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Sửa</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded">Xóa</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Quản Lý Đơn Hàng</h1>
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-bold">#{order.id.slice(0,8)}</p>
                      <p>{order.name} • {order.phone}</p>
                      <p className="text-green-600 font-bold">{order.total.toLocaleString()}₫</p>
                    </div>
                    <div>
                      <span className={`px-4 py-2 rounded-full text-white ${order.status === "pending" ? "bg-orange-500" : "bg-green-500"}`}>
                        {order.status === "pending" ? "Chờ xử lý" : "Đã giao"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}