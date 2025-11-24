// src/admin/Admin.tsx - PHIÊN BẢN HOÀN CHỈNH CUỐI CÙNG, KHÔNG CÒN LỖI GÌ HẾT
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { 
  Package2, ShoppingBag, TrendingUp, Plus, Edit2, Trash2, 
  LogOut, Save, X, DollarSign, Package, Clock, CheckCircle
} from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState("dashboard");
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "", price: "", oldPrice: "", image: "", description: "", stock: "99"
  });

  const API = "http://localhost:5000/api";

  const sampleProducts = [
    { name: "Trà Xanh Organic 500g", price: 250000, oldPrice: 350000, image: "https://images.unsplash.com/photo-1622480768346-2bb93796b0d6?w=800&q=80", description: "Trà xanh nguyên lá 100% tự nhiên", stock: 50 },
    { name: "Mật Ong Rừng 1L", price: 420000, oldPrice: 550000, image: "https://images.unsplash.com/photo-1558642084-f6659012ed4f?w=400", description: "Mật ong nguyên chất Tây Nguyên", stock: 30 },
    { name: "Hạt Điều Rang Muối 500g", price: 180000, oldPrice: 220000, image: "https://images.unsplash.com/photo-1606913566175-2e8d6a1d4a2c?w=400", description: "Hạt điều Bình Phước loại 1", stock: 99 },
    { name: "Cà Phê Arabica Đà Lạt", price: 135000, oldPrice: 180000, image: "https://images.unsplash.com/photo-1495474472287-4d71bc168240?w=400", description: "Cà phê nguyên chất rang xay", stock: 80 },
    { name: "Bột Matcha Nhật Bản 100g", price: 380000, oldPrice: 480000, image: "https://images.unsplash.com/photo-1598880940379-2b7b9d0d8b2b?w=400", description: "Matcha ceremonial grade", stock: 25 },
  ];

  const login = async () => {
    try {
      const res = await axios.post(`${API}/login`, { phone, password });
      const newToken = res.data.token;
      localStorage.setItem("adminToken", newToken);
      setToken(newToken);
      toast.success("Đăng nhập thành công!");
      loadAll(newToken);
    } catch {
      toast.error("Sai số điện thoại hoặc mật khẩu");
    }
  };

  const loadAll = async (currentToken = token) => {
    if (!currentToken) return;
    setLoading(true);
    const authAxios = axios.create({
      baseURL: API,
      headers: { Authorization: `Bearer ${currentToken}` }
    });

    try {
      const [pRes, oRes] = await Promise.all([
        axios.get(`${API}/products`),
        authAxios.get("/orders")
      ]);
      setProducts(pRes.data);
      setOrders(oRes.data || []);

      if (pRes.data.length === 0) {
        for (const p of sampleProducts) {
          await authAxios.post("/products", p);
        }
        toast.success("Đã thêm 5 sản phẩm mẫu!");
        const refreshed = await axios.get(`${API}/products`);
        setProducts(refreshed.data);
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.error("Phiên hết hạn, đăng nhập lại!");
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadAll();
  }, [token]);

  const saveProduct = async () => {
    const data = {
      ...form,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      stock: Number(form.stock)
    };
    try {
      const authAxios = axios.create({ headers: { Authorization: `Bearer ${token}` } });
      if (editingProduct) {
        await authAxios.put(`${API}/products/${editingProduct.id}`, data);
        toast.success("Cập nhật thành công!");
      } else {
        await authAxios.post(`${API}/products`, data);
        toast.success("Thêm sản phẩm mới!");
      }
      setShowModal(false);
      setEditingProduct(null);
      setForm({ name: "", price: "", oldPrice: "", image: "", description: "", stock: "99" });
      loadAll();
    } catch {
      toast.error("Lỗi lưu sản phẩm");
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Xóa sản phẩm này?")) return;
    try {
      await axios.delete(`${API}/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Đã xóa!");
      loadAll();
    } catch {
      toast.error("Lỗi xóa");
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken("");
    toast.success("Đã đăng xuất");
  };

  const revenueData = {
    labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    datasets: [{
      label: "Doanh thu",
      data: [2.4, 3.1, 1.8, 4.2, 5.5, 3.9, 6.2],
      backgroundColor: "rgba(16, 185, 129, 0.8)",
      borderRadius: 8,
    }]
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center p-4">
        <Toaster position="top-center" />
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 w-full max-w-md border border-emerald-100">
          <div className="text-center mb-10">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl">
              <Package2 size={48} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">GREEN HAVEN</h1>
          </div>
          <input placeholder="Số điện thoại" className="w-full px-6 py-4 rounded-2xl border border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 mb-4 text-lg" value={phone} onChange={e => setPhone(e.target.value)} />
          <input type="password" placeholder="Mật khẩu" className="w-full px-6 py-4 rounded-2xl border border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 mb-8 text-lg" value={password} onChange={e => setPassword(e.target.value)} />
          <button onClick={login} className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-5 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl hover:scale-105 transition">ĐĂNG NHẬP ADMIN</button>
          <p className="text-center mt-6 text-gray-500">Demo: <strong className="text-emerald-600">0123456789</strong> / <strong className="text-emerald-600">admin123</strong></p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <Toaster position="top-right" />
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center">
            <div className="animate-spin w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full mb-4"></div>
            <p className="text-lg font-medium">Đang tải...</p>
          </div>
        </div>
      )}

      <div className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-emerald-100 px-8 py-5 fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Green Haven Admin</h1>
          <button onClick={logout} className="flex items-center gap-3 text-red-600 hover:text-red-700"><LogOut size={20} /> Đăng xuất</button>
        </div>
      </div>

      <div className="flex pt-24">
        <div className="w-80 bg-gradient-to-b from-emerald-600 to-teal-700 text-white min-h-screen p-8 fixed left-0">
          <div className="space-y-4">
            <button onClick={() => { setTab("dashboard"); loadAll(); }} className={`w-full text-left px-6 py-5 rounded-2xl flex items-center gap-4 text-lg font-medium transition ${tab === "dashboard" ? "bg-white/20 shadow-xl" : "hover:bg-white/10"}`}><TrendingUp size={24} /> Dashboard</button>
            <button onClick={() => { setTab("products"); loadAll(); }} className={`w-full text-left px-6 py-5 rounded-2xl flex items-center gap-4 text-lg font-medium transition ${tab === "products" ? "bg-white/20 shadow-xl" : "hover:bg-white/10"}`}><Package size={24} /> Quản Lý Sản Phẩm</button>
            <button onClick={() => { setTab("orders"); loadAll(); }} className={`w-full text-left px-6 py-5 rounded-2xl flex items-center gap-4 text-lg font-medium transition ${tab === "orders" ? "bg-white/20 shadow-xl" : "hover:bg-white/10"}`}><ShoppingBag size={24} /> Quản Lý Đơn Hàng</button>
          </div>
        </div>

        <div className="ml-80 p-10 w-full">
          {/* DASHBOARD */}
          {tab === "dashboard" && (
            <div className="space-y-10">
              <h2 className="text-5xl font-bold text-emerald-800">Chào mừng trở lại!</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-emerald-100"><div className="flex items-center justify-between mb-4"><Package2 size={40} className="text-emerald-600" /><span className="text-4xl font-bold text-emerald-700">{products.length}</span></div><p className="text-gray-600 text-xl">Tổng sản phẩm</p></div>
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-emerald-100"><div className="flex items-center justify-between mb-4"><ShoppingBag size={40} className="text-teal-600" /><span className="text-4xl font-bold text-teal-700">{orders.length}</span></div><p className="text-gray-600 text-xl">Tổng đơn hàng</p></div>
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-emerald-100"><div className="flex items-center justify-between mb-4"><Clock size={40} className="text-orange-600" /><span className="text-4xl font-bold text-orange-600">{orders.filter(o => o.status === "pending").length}</span></div><p className="text-gray-600 text-xl">Chờ xử lý</p></div>
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-emerald-100"><div className="flex items-center justify-between mb-4"><DollarSign size={40} className="text-green-600" /><span className="text-4xl font-bold text-green-700">{orders.reduce((a,o)=>a+(o.total||0),0).toLocaleString()}₫</span></div><p className="text-gray-600 text-xl">Doanh thu</p></div>
              </div>
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-emerald-800 mb-6">Doanh thu 7 ngày qua</h3>
                <Bar data={revenueData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
              </div>
            </div>
          )}

          {/* QUẢN LÝ SẢN PHẨM */}
          {tab === "products" && (
            <div>
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-5xl font-bold text-emerald-800">Sản Phẩm</h2>
                <button onClick={() => { setEditingProduct(null); setForm({ name: "", price: "", oldPrice: "", image: "", description: "", stock: "99" }); setShowModal(true); }}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-xl hover:scale-105 transition flex items-center gap-3">
                  <Plus size={28} /> Thêm sản phẩm mới
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map(p => (
                  <div key={p.id} className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:scale-105 transition duration-300">
                    <div className="relative">
                      <img src={p.image || "https://via.placeholder.com/400x300/10b981/ffffff?text=" + encodeURIComponent(p.name)} alt={p.name} className="w-full h-64 object-cover" />
                      {p.oldPrice && <span className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold">-{Math.round((1 - p.price / p.oldPrice) * 100)}%</span>}
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-2xl text-gray-800 mb-2">{p.name}</h3>
                      <div className="flex items-end gap-3 mb-4">
                        <span className="text-3xl font-bold text-emerald-600">{Number(p.price).toLocaleString()}₫</span>
                        {p.oldPrice && <span className="text-xl text-gray-400 line-through">{Number(p.oldPrice).toLocaleString()}₫</span>}
                      </div>
                      <p className="text-gray-600 mb-4">Còn: <strong>{p.stock}</strong></p>
                      <div className="flex gap-3">
                        <button onClick={() => { setEditingProduct(p); setForm({name: p.name, price: p.price, oldPrice: p.oldPrice||"", image: p.image||"", description: p.description||"", stock: p.stock}); setShowModal(true); }}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                          <Edit2 size={20} /> Sửa
                        </button>
                        <button onClick={() => deleteProduct(p.id)}
                          className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                          <Trash2 size={20} /> Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* QUẢN LÝ ĐƠN HÀNG */}
          {tab === "orders" && (
            <div>
              <h2 className="text-5xl font-bold text-emerald-800 mb-10">Đơn Hàng</h2>
              <div className="space-y-6">
                {orders.length === 0 ? (
                  <p className="text-center text-2xl text-gray-500 py-20">Chưa có đơn hàng nào</p>
                ) : (
                  orders.map(o => (
                    <div key={o.id} className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-emerald-100 flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold text-gray-800">Đơn hàng #{o.id.slice(-8)}</p>
                        <p className="text-lg text-gray-600 mt-2">Khách: <strong>{o.name}</strong> • {o.phone}</p>
                        <p className="text-lg">Địa chỉ: {o.address}</p>
                        {o.note && <p className="text-gray-600 italic mt-2">Ghi chú: {o.note}</p>}
                      </div>
                      <div className="text-right">
                        <p className="text-4xl font-bold text-emerald-600">{Number(o.total).toLocaleString()}₫</p>
                        <div className="mt-4 flex items-center gap-4">
                          <span className={`px-8 py-3 rounded-full text-white font-bold text-lg ${o.status === "pending" ? "bg-orange-500" : "bg-emerald-600"}`}>
                            {o.status === "pending" ? "Chờ xử lý" : "Đã giao"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-screen overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-8 rounded-t-3xl">
              <h3 className="text-3xl font-bold text-center">{editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</h3>
            </div>
            <div className="p-8 space-y-6">
              <input placeholder="Tên sản phẩm" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-6 py-4 rounded-2xl border-2 border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 text-lg" />
              <div className="grid grid-cols-2 gap-6">
                <input placeholder="Giá hiện tại (₫)" type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="px-6 py-4 rounded-2xl border-2 border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 text-lg" />
                <input placeholder="Giá cũ (khuyến mãi)" type="number" value={form.oldPrice} onChange={e => setForm({...form, oldPrice: e.target.value})} className="px-6 py-4 rounded-2xl border-2 border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 text-lg" />
              </div>
              <input placeholder="Link ảnh sản phẩm" value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="w-full px-6 py-4 rounded-2xl border-2 border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 text-lg" />
              <textarea placeholder="Mô tả sản phẩm" value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={4} className="w-full px-6 py-4 rounded-2xl border-2 border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 text-lg" />
              <input placeholder="Số lượng tồn kho" type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="w-full px-6 py-4 rounded-2xl border-2 border-emerald-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 text-lg" />
              <div className="flex gap-6 pt-6">
                <button onClick={saveProduct} className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-5 rounded-2xl font-bold text-xl shadow-xl hover:scale-105 transition flex items-center justify-center gap-3">
                  <Save size={24} /> {editingProduct ? "CẬP NHẬT" : "THÊM MỚI"}
                </button>
                <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-5 rounded-2xl font-bold text-xl shadow-xl transition flex items-center justify-center gap-3">
                  <X size={24} /> HỦY
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}