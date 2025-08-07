import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  ShoppingCart,
  Star,
  Filter,
  Search,
  Heart,
  Grid3X3,
  List,
  Ticket,
  Gift,
  Percent,
  Tag,
  CheckCircle
} from "lucide-react";

export default function Store() {
  const [cartCount, setCartCount] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = ["Tất cả", "Áo thun", "Giày chạy", "Phụ kiện", "Đồ uống", "Thiết bị"];
  
  const products = [
    {
      id: 1,
      name: "Áo thun VSM Runner 2024",
      price: "299,000",
      originalPrice: "399,000",
      image: "👕",
      rating: 4.8,
      reviews: 124,
      category: "Áo thun",
      badge: "Bán chạy",
      description: "Áo thun chạy bộ chính thức VSM với chất liệu thấm hút mồ hôi tốt"
    },
    {
      id: 2,
      name: "Giày chạy VSM Speed Pro",
      price: "1,299,000",
      originalPrice: "1,599,000",
      image: "👟",
      rating: 4.9,
      reviews: 89,
      category: "Giày chạy",
      badge: "Mới nhất",
      description: "Giày chạy bộ chuyên nghiệp với công nghệ đệm air và thiết kế nhẹ"
    },
    {
      id: 3,
      name: "Bình nước VSM Hydro",
      price: "149,000",
      originalPrice: "",
      image: "🥤",
      rating: 4.7,
      reviews: 203,
      category: "Phụ kiện",
      badge: "",
      description: "Bình nước thể thao giữ nhiệt 12 tiếng với thiết kế ergonomic"
    },
    {
      id: 4,
      name: "Nón kết VSM Classic",
      price: "199,000",
      originalPrice: "249,000",
      image: "🧢",
      rating: 4.6,
      reviews: 67,
      category: "Phụ kiện",
      badge: "Giảm giá",
      description: "Nón kết thể thao với khả năng chống UV và thông thoáng tối ưu"
    },
    {
      id: 5,
      name: "Vớ chạy bộ VSM Comfort",
      price: "89,000",
      originalPrice: "",
      image: "🧦",
      rating: 4.5,
      reviews: 156,
      category: "Phụ kiện",
      badge: "",
      description: "Vớ chạy bộ chống trượt với công nghệ kháng khuẩn và thấm hút"
    },
    {
      id: 6,
      name: "Túi chạy bộ VSM Ultra",
      price: "399,000",
      originalPrice: "499,000",
      image: "🎒",
      rating: 4.8,
      reviews: 91,
      category: "Phụ kiện",
      badge: "Hot",
      description: "Túi chạy bộ nhẹ với nhiều ngăn, phản quang và khả năng chống nước"
    }
  ];

  const addToCart = (productId: number) => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-vsm-black">Cửa hàng VSM</h1>
              <p className="text-vsm-gray-medium">Sản phẩm chạy bộ chính hãng cho sinh viên</p>
            </div>
            <Button className="relative bg-vsm-orange hover:bg-vsm-orange-dark text-white">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Giỏ hàng
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              placeholder="Tìm kiếm sản phẩm..." 
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Bộ lọc
            </Button>
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-vsm-orange hover:bg-vsm-orange-dark" : ""}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-vsm-orange hover:bg-vsm-orange-dark" : ""}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "Tất cả" ? "default" : "outline"}
              size="sm"
              className={category === "Tất cả" ? "bg-vsm-orange hover:bg-vsm-orange-dark" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              {viewMode === "grid" ? (
                <>
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-vsm-orange/20 to-vsm-orange/40 flex items-center justify-center text-6xl">
                      {product.image}
                    </div>
                    {product.badge && (
                      <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                        {product.badge}
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                    >
                      <Heart className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg leading-tight group-hover:text-vsm-orange transition-colors">
                      {product.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews} đánh giá)</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-vsm-orange">
                          {product.price}đ
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {product.originalPrice}đ
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => addToCart(product.id)}
                      className="w-full bg-vsm-orange hover:bg-vsm-orange-dark text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Thêm vào giỏ
                    </Button>
                  </CardContent>
                </>
              ) : (
                <div className="flex">
                  <div className="w-32 h-32 bg-gradient-to-br from-vsm-orange/20 to-vsm-orange/40 flex items-center justify-center text-4xl flex-shrink-0">
                    {product.image}
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg leading-tight group-hover:text-vsm-orange transition-colors">
                        {product.name}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Heart className="w-5 h-5" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews} đánh giá)</span>
                      {product.badge && (
                        <Badge className="bg-red-500 text-white text-xs">
                          {product.badge}
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-vsm-orange">
                          {product.price}đ
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {product.originalPrice}đ
                          </span>
                        )}
                      </div>
                      <Button 
                        onClick={() => addToCart(product.id)}
                        className="bg-vsm-orange hover:bg-vsm-orange-dark text-white"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Thêm vào giỏ
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button className="bg-vsm-orange hover:bg-vsm-orange-dark text-white px-8">
            Xem thêm sản phẩm
          </Button>
        </div>
      </div>
    </div>
  );
}
