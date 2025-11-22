import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Sparkles, Leaf, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import categoryCosmetics from "@/assets/category-cosmetics.png";
import categoryOils from "@/assets/category-oils.png";
import categoryTea from "@/assets/category-tea.png";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: hero1,
      title: "Khám phá vẻ đẹp thiên nhiên",
      subtitle: "Sản phẩm organic cao cấp từ thiên nhiên thuần khiết",
      cta: "Khám phá ngay",
    },
    {
      image: hero2,
      title: "Chăm sóc da tự nhiên",
      subtitle: "Mỹ phẩm thiên nhiên an toàn, lành tính cho mọi làn da",
      cta: "Mua sắm ngay",
    },
    {
      image: hero3,
      title: "Tinh dầu thiên nhiên",
      subtitle: "Thư giãn và chữa lành từ những giọt tinh dầu quý",
      cta: "Xem thêm",
    },
  ];

  const categories = [
    {
      name: "Mỹ phẩm thiên nhiên",
      icon: categoryCosmetics,
      count: 45,
      href: "/products?category=cosmetics",
    },
    {
      name: "Tinh dầu",
      icon: categoryOils,
      count: 32,
      href: "/products?category=oils",
    },
    {
      name: "Trà thảo mộc",
      icon: categoryTea,
      count: 28,
      href: "/products?category=tea",
    },
    {
      name: "Nông sản sạch",
      icon: categoryCosmetics,
      count: 56,
      href: "/products?category=organic-food",
    },
    {
      name: "Handmade",
      icon: categoryCosmetics,
      count: 23,
      href: "/products?category=handmade",
    },
    {
      name: "Thực phẩm chức năng",
      icon: categoryCosmetics,
      count: 34,
      href: "/products?category=supplements",
    },
  ];

  const featuredProducts = [
    {
      id: "1",
      name: "Serum Vitamin C Thiên Nhiên",
      price: 450000,
      originalPrice: 550000,
      image: hero2,
      category: "Mỹ phẩm",
      isNew: true,
      discount: 18,
    },
    {
      id: "2",
      name: "Tinh Dầu Lavender Organic",
      price: 320000,
      image: hero3,
      category: "Tinh dầu",
      isNew: true,
    },
    {
      id: "3",
      name: "Trà Thảo Mộc Thải Độc",
      price: 180000,
      originalPrice: 220000,
      image: hero1,
      category: "Trà",
      discount: 18,
    },
    {
      id: "4",
      name: "Mặt Nạ Đất Sét Tự Nhiên",
      price: 280000,
      image: hero2,
      category: "Mỹ phẩm",
    },
    {
      id: "5",
      name: "Dầu Dừa Nguyên Chất",
      price: 150000,
      image: hero3,
      category: "Tinh dầu",
      isNew: true,
    },
    {
      id: "6",
      name: "Trà Hoa Cúc Hữu Cơ",
      price: 120000,
      image: hero1,
      category: "Trà",
    },
    {
      id: "7",
      name: "Sữa Rửa Mặt Thiên Nhiên",
      price: 220000,
      originalPrice: 280000,
      image: hero2,
      category: "Mỹ phẩm",
      discount: 21,
    },
    {
      id: "8",
      name: "Xà Phòng Handmade",
      price: 85000,
      image: hero3,
      category: "Handmade",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Slider */}
        <section className="relative h-[500px] md:h-[600px] overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/20 z-10" />
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl space-y-6 animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-playfair font-bold text-foreground">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl text-foreground/80">
                      {slide.subtitle}
                    </p>
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      asChild
                    >
                      <Link to="/products">{slide.cta}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Slider Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-background/80 hover:bg-background rounded-full p-2 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-background/80 hover:bg-background rounded-full p-2 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Slider Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-8 bg-primary"
                    : "w-2 bg-background/50"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start gap-4 p-6 bg-card rounded-xl">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">100% Thiên nhiên</h3>
                  <p className="text-sm text-muted-foreground">
                    Sản phẩm từ thiên nhiên, không chất bảo quản độc hại
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-card rounded-xl">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Chứng nhận organic</h3>
                  <p className="text-sm text-muted-foreground">
                    Được chứng nhận bởi các tổ chức uy tín quốc tế
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-card rounded-xl">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Hiệu quả cao</h3>
                  <p className="text-sm text-muted-foreground">
                    Được hàng ngàn khách hàng tin tưởng và yêu thích
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                Danh mục sản phẩm
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Khám phá bộ sưu tập đa dạng các sản phẩm thiên nhiên chất lượng cao
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={category.href}
                  className="group p-6 bg-card rounded-xl border hover-lift text-center"
                >
                  <div className="mb-4 mx-auto h-20 w-20 rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                  <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count} sản phẩm
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-2">
                  Sản phẩm nổi bật
                </h2>
                <p className="text-muted-foreground">
                  Những sản phẩm được yêu thích nhất
                </p>
              </div>
              <Button variant="outline" asChild className="hidden sm:flex">
                <Link to="/products">Xem tất cả</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
            <div className="text-center mt-8 sm:hidden">
              <Button variant="outline" asChild>
                <Link to="/products">Xem tất cả sản phẩm</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <img
                  src={hero1}
                  alt="Pure Nature Story"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold">
                  Câu chuyện của chúng tôi
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Pure Nature ra đời từ niềm đam mê với thiên nhiên và mong muốn mang đến
                  những sản phẩm chăm sóc sức khỏe, làm đẹp an toàn, lành tính cho người
                  Việt Nam.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Với cam kết sử dụng 100% nguyên liệu thiên nhiên, không chất bảo quản độc hại,
                  chúng tôi tin rằng vẻ đẹp thực sự đến từ sự thuần khiết và hài hòa với thiên nhiên.
                </p>
                <Button size="lg" asChild>
                  <Link to="/about">Tìm hiểu thêm</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
