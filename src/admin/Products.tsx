import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const products = [
  { 
    id: 1, 
    name: "Mật ong rừng nguyên chất", 
    category: "Mật ong", 
    price: "350.000đ", 
    stock: 45, 
    status: "active", 
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784acc?w=100&q=80" 
  },
  { 
    id: 2, 
    name: "Tinh dầu bạc hà hữu cơ", 
    category: "Tinh dầu", 
    price: "180.000đ", 
    stock: 67, 
    status: "active", 
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=100&q=80" 
  },
  { 
    id: 3, 
    name: "Trà hoa cúc sấy khô", 
    category: "Trà thảo mộc", 
    price: "120.000đ", 
    stock: 156, 
    status: "active", 
    image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=100&q=80" 
  },
  { 
    id: 4, 
    name: "Tinh bột nghệ hữu cơ", 
    category: "Thực phẩm chức năng", 
    price: "95.000đ", 
    stock: 0, 
    status: "inactive", 
    image: "https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=100&q=80" 
  },
  { 
    id: 5, 
    name: "Dầu dừa nguyên chất", 
    category: "Mỹ phẩm hữu cơ", 
    price: "220.000đ", 
    stock: 89, 
    status: "active", 
    image: "https://images.unsplash.com/photo-1474440692490-2e83ae13ba29?w=100&q=80" 
  },
  { 
    id: 6, 
    name: "Hạt chia Organic", 
    category: "Hạt & Ngũ cốc", 
    price: "145.000đ", 
    stock: 234, 
    status: "active", 
    image: "https://images.unsplash.com/photo-1517666005606-69dea9b54865?w=100&q=80" 
  },
  { 
    id: 7, 
    name: "Sâm tươi Hàn Quốc", 
    category: "Thảo dược", 
    price: "850.000đ", 
    stock: 23, 
    status: "active", 
    image: "https://images.unsplash.com/photo-1612640837886-b94a80c5b49d?w=100&q=80" 
  },
  { 
    id: 8, 
    name: "Tinh dầu lavender", 
    category: "Tinh dầu", 
    price: "195.000đ", 
    stock: 78, 
    status: "active", 
    image: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=100&q=80" 
  },
];

const Products = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sản phẩm thiên nhiên</h1>
          <p className="text-muted-foreground mt-2">Quản lý danh sách sản phẩm organic & thiên nhiên</p>
        </div>
        <Button className="gap-2 shadow-lg shadow-primary/20">
          <Plus className="h-4 w-4" />
          Thêm sản phẩm
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Tìm kiếm sản phẩm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Tìm kiếm sản phẩm..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sản phẩm</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Tồn kho</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 rounded-lg ring-2 ring-primary/10">
                        <AvatarImage src={product.image} alt={product.name} className="object-cover" />
                        <AvatarFallback className="rounded-lg bg-primary/10">{product.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{product.name}</div>
                        <div className="text-sm text-muted-foreground">ID: #{product.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-primary">{product.price}</TableCell>
                  <TableCell>
                    <Badge variant={product.stock > 0 ? "default" : "destructive"} className="shadow-sm">
                      {product.stock > 0 ? `${product.stock} SP` : "Hết hàng"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.status === "active" ? "default" : "secondary"}>
                      {product.status === "active" ? "Hoạt động" : "Tạm dừng"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="hover:bg-accent/10 hover:text-accent">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-destructive/10 hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Products;