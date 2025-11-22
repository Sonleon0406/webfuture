import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const Products = () => {
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - replace with real data later
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: String(i + 1),
    name: `Sản phẩm thiên nhiên ${i + 1}`,
    price: Math.floor(Math.random() * 500000) + 100000,
    originalPrice: i % 3 === 0 ? Math.floor(Math.random() * 600000) + 200000 : undefined,
    image: [hero1, hero2, hero3][i % 3],
    category: ["Mỹ phẩm", "Tinh dầu", "Trà"][i % 3],
    isNew: i % 4 === 0,
    discount: i % 3 === 0 ? 15 : undefined,
  }));

  const categories = [
    "Mỹ phẩm thiên nhiên",
    "Tinh dầu",
    "Trà thảo mộc",
    "Nông sản sạch",
    "Handmade",
    "Thực phẩm chức năng",
  ];

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-4">Danh mục</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={category} />
              <Label
                htmlFor={category}
                className="text-sm font-normal cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-4">Khoảng giá</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={1000000}
          step={10000}
          className="mb-4"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{priceRange[0].toLocaleString('vi-VN')}₫</span>
          <span>{priceRange[1].toLocaleString('vi-VN')}₫</span>
        </div>
      </div>

      {/* Features */}
      <div>
        <h3 className="font-semibold mb-4">Đặc điểm</h3>
        <div className="space-y-3">
          {["Organic", "Vegan", "Không paraben", "Không hóa chất"].map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox id={feature} />
              <Label
                htmlFor={feature}
                className="text-sm font-normal cursor-pointer"
              >
                {feature}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full">Áp dụng bộ lọc</Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-2">
              Sản phẩm
            </h1>
            <p className="text-muted-foreground">
              Khám phá bộ sưu tập sản phẩm thiên nhiên của chúng tôi
            </p>
          </div>

          <div className="flex gap-8">
            {/* Desktop Filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-card rounded-xl border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold">Bộ lọc</h2>
                  <Button variant="ghost" size="sm">
                    Xóa
                  </Button>
                </div>
                <FilterContent />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 gap-4">
                <p className="text-sm text-muted-foreground">
                  Hiển thị {products.length} sản phẩm
                </p>

                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <Sheet open={showFilters} onOpenChange={setShowFilters}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden">
                        <Filter className="h-4 w-4 mr-2" />
                        Bộ lọc
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 overflow-y-auto">
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold">Bộ lọc</h2>
                      </div>
                      <FilterContent />
                    </SheetContent>
                  </Sheet>

                  {/* Sort */}
                  <Select defaultValue="featured">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sắp xếp" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Nổi bật</SelectItem>
                      <SelectItem value="newest">Mới nhất</SelectItem>
                      <SelectItem value="price-asc">Giá: Thấp đến cao</SelectItem>
                      <SelectItem value="price-desc">Giá: Cao đến thấp</SelectItem>
                      <SelectItem value="bestselling">Bán chạy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Products */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Trước
                  </Button>
                  <Button variant="default" size="sm">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Sau
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
