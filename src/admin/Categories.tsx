import { Plus, Search, Edit, Trash2 } from "lucide-react";
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

const categories = [
  { id: 1, name: "Mật ong & Sữa ong chúa", slug: "mat-ong-sua-ong-chua", products: 45, status: "active" },
  { id: 2, name: "Tinh dầu thiên nhiên", slug: "tinh-dau-thien-nhien", products: 67, status: "active" },
  { id: 3, name: "Trà thảo mộc", slug: "tra-thao-moc", products: 89, status: "active" },
  { id: 4, name: "Mỹ phẩm hữu cơ", slug: "my-pham-huu-co", products: 123, status: "active" },
  { id: 5, name: "Thực phẩm chức năng", slug: "thuc-pham-chuc-nang", products: 78, status: "active" },
  { id: 6, name: "Hạt & Ngũ cốc", slug: "hat-ngu-coc", products: 56, status: "active" },
  { id: 7, name: "Thảo dược sấy khô", slug: "thao-duoc-say-kho", products: 34, status: "inactive" },
];

const Categories = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Danh mục sản phẩm</h1>
          <p className="text-muted-foreground mt-2">Quản lý danh mục sản phẩm thiên nhiên</p>
        </div>
        <Button className="gap-2 shadow-lg shadow-primary/20">
          <Plus className="h-4 w-4" />
          Thêm danh mục
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Tìm kiếm danh mục</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Tìm kiếm danh mục..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên danh mục</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Số sản phẩm</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">#{category.id}</TableCell>
                  <TableCell className="font-semibold">{category.name}</TableCell>
                  <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                      {category.products} sản phẩm
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={category.status === "active" ? "default" : "secondary"}>
                      {category.status === "active" ? "Hoạt động" : "Tạm dừng"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
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

export default Categories;