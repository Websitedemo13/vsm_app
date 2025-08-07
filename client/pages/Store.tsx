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
  CheckCircle,
} from "lucide-react";

interface Voucher {
  id: string;
  code: string;
  title: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minimumAmount?: number;
}

export default function Store() {
  const [cartCount, setCartCount] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [availableVouchers, setAvailableVouchers] = useState<Voucher[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [showVouchers, setShowVouchers] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      const response = await fetch(`${apiUrl}/api/vouchers/user_1`);

      if (!response.ok) {
        // Use mock vouchers if backend not available
        setAvailableVouchers([
          { id: "1", title: "Giảm 50k cho đơn từ 300k", discount: 50000, minSpend: 300000, validUntil: "2024-12-31" },
          { id: "2", title: "Free shipping toàn quốc", discount: 30000, minSpend: 200000, validUntil: "2024-12-25" }
        ]);
        return;
      }

      const data = await response.json();
      setAvailableVouchers(data.vouchers || []);
    } catch (error) {
      // Use mock vouchers on error
      setAvailableVouchers([
        { id: "1", title: "Giảm 50k cho đơn từ 300k", discount: 50000, minSpend: 300000, validUntil: "2024-12-31" },
        { id: "2", title: "Free shipping toàn quốc", discount: 30000, minSpend: 200000, validUntil: "2024-12-25" }
      ]);
    }
  };

  const categories = [
    "Tất cả",
    "Áo thun",
    "Giày chạy",
    "Phụ kiện",
    "Đồ uống",
    "Thiết bị",
  ];

  const products = [
    {
      id: 1,
      name: "Áo thun VSM Runner 2024",
      price: "299,000",
      priceNumber: 299000,
      originalPrice: "399,000",
      image: "👕",
      rating: 4.8,
      reviews: 124,
      category: "Áo thun",
      badge: "Bán chạy",
      description:
        "Áo thun chạy bộ chính thức VSM với chất liệu thấm hút mồ hôi tốt",
    },
    {
      id: 2,
      name: "Giày chạy VSM Speed Pro",
      price: "1,299,000",
      priceNumber: 1299000,
      originalPrice: "1,599,000",
      image: "👟",
      rating: 4.9,
      reviews: 89,
      category: "Giày chạy",
      badge: "Mới nhất",
      description:
        "Giày chạy bộ chuyên nghiệp với công nghệ đệm air và thiết kế nhẹ",
    },
    {
      id: 3,
      name: "Bình nước VSM Hydro",
      price: "149,000",
      priceNumber: 149000,
      originalPrice: "",
      image: "🥤",
      rating: 4.7,
      reviews: 203,
      category: "Phụ kiện",
      badge: "",
      description:
        "Bình nước thể thao giữ nhiệt 12 tiếng với thiết kế ergonomic",
    },
    {
      id: 4,
      name: "Nón kết VSM Classic",
      price: "199,000",
      priceNumber: 199000,
      originalPrice: "249,000",
      image: "🧢",
      rating: 4.6,
      reviews: 67,
      category: "Phụ kiện",
      badge: "Giảm giá",
      description:
        "Nón kết thể thao với khả năng chống UV và thông thoáng tối ưu",
    },
    {
      id: 5,
      name: "Vớ chạy bộ VSM Comfort",
      price: "89,000",
      priceNumber: 89000,
      originalPrice: "",
      image: "🧦",
      rating: 4.5,
      reviews: 156,
      category: "Phụ kiện",
      badge: "",
      description:
        "Vớ chạy bộ chống trượt với công nghệ kháng khuẩn và thấm hút",
    },
    {
      id: 6,
      name: "Túi chạy bộ VSM Ultra",
      price: "399,000",
      priceNumber: 399000,
      originalPrice: "499,000",
      image: "🎒",
      rating: 4.8,
      reviews: 91,
      category: "Phụ kiện",
      badge: "Hot",
      description:
        "Túi chạy bộ nhẹ với nhiều ngăn, phản quang và khả năng chống nước",
    },
  ];

  const addToCart = (productId: number, price: number) => {
    setCartCount((prev) => prev + 1);
    setCartTotal((prev) => prev + price);

    toast({
      title: "Đã thêm vào giỏ hàng",
      description: "Sản phẩm đã được thêm vào giỏ hàng của bạn",
    });
  };

  const applyVoucher = (voucher: Voucher) => {
    if (voucher.minimumAmount && cartTotal < voucher.minimumAmount) {
      toast({
        title: "Không thể áp dụng voucher",
        description: `Đơn hàng tối thiểu ${voucher.minimumAmount.toLocaleString()}đ`,
        variant: "destructive",
      });
      return;
    }

    setSelectedVoucher(voucher);
    setShowVouchers(false);

    toast({
      title: "Áp dụng voucher thành công!",
      description: `Voucher "${voucher.code}" đã được áp dụng`,
    });
  };

  const removeVoucher = () => {
    setSelectedVoucher(null);
    toast({
      title: "Đã hủy voucher",
      description: "Voucher đã được gỡ bỏ khỏi đơn hàng",
    });
  };

  const calculateDiscount = () => {
    if (!selectedVoucher) return 0;

    if (selectedVoucher.discountType === "percentage") {
      return Math.min(
        cartTotal * (selectedVoucher.discountValue / 100),
        cartTotal,
      );
    } else {
      return Math.min(selectedVoucher.discountValue, cartTotal);
    }
  };

  const finalTotal = cartTotal - calculateDiscount();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-vsm-black">
                Cửa hàng VSM
              </h1>
              <p className="text-vsm-gray-medium">
                Sản phẩm chạy bộ chính hãng cho sinh viên
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowVouchers(!showVouchers)}
                className="relative"
              >
                <Ticket className="w-5 h-5 mr-2" />
                Voucher
                {availableVouchers.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    {availableVouchers.length}
                  </Badge>
                )}
              </Button>

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
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Voucher Panel */}
        {showVouchers && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800">
                <Gift className="w-5 h-5 mr-2" />
                Voucher khả dụng
              </CardTitle>
            </CardHeader>
            <CardContent>
              {availableVouchers.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {availableVouchers.map((voucher) => (
                    <Card
                      key={voucher.id}
                      className="border-2 border-dashed border-green-300 bg-white"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-green-800">
                            {voucher.title}
                          </h3>
                          <Badge className="bg-green-100 text-green-700">
                            {voucher.discountType === "percentage"
                              ? `${voucher.discountValue}%`
                              : `${voucher.discountValue.toLocaleString()}đ`}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Mã: <strong>{voucher.code}</strong>
                        </p>
                        {voucher.minimumAmount && (
                          <p className="text-xs text-gray-500 mb-3">
                            Đơn hàng tối thiểu:{" "}
                            {voucher.minimumAmount.toLocaleString()}đ
                          </p>
                        )}
                        <Button
                          size="sm"
                          onClick={() => applyVoucher(voucher)}
                          disabled={selectedVoucher?.id === voucher.id}
                          className="w-full bg-green-600 hover:bg-green-700 text-white"
                        >
                          {selectedVoucher?.id === voucher.id ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Đã áp dụng
                            </>
                          ) : (
                            <>
                              <Tag className="w-4 h-4 mr-1" />
                              Áp dụng
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Ticket className="w-12 h-12 text-green-300 mx-auto mb-4" />
                  <p className="text-green-600">Bạn chưa có voucher nào</p>
                  <p className="text-sm text-green-500 mt-2">
                    Nâng cấp Premium để nhận voucher độc quyền!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Cart Summary */}
        {cartCount > 0 && (
          <Card className="mb-6 border-vsm-orange bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-vsm-black">
                    Giỏ hàng ({cartCount} sản phẩm)
                  </h3>
                  {selectedVoucher && (
                    <div className="flex items-center mt-2">
                      <Ticket className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-sm text-green-600">
                        Voucher: {selectedVoucher.code}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeVoucher}
                        className="ml-2 h-auto p-1 text-red-500 hover:text-red-700"
                      >
                        ×
                      </Button>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    Tạm tính: {cartTotal.toLocaleString()}đ
                  </div>
                  {selectedVoucher && (
                    <div className="text-sm text-green-600">
                      Giảm giá: -{calculateDiscount().toLocaleString()}đ
                    </div>
                  )}
                  <div className="text-xl font-bold text-vsm-orange">
                    Tổng cộng: {finalTotal.toLocaleString()}đ
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input placeholder="Tìm kiếm sản phẩm..." className="pl-10" />
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
                className={
                  viewMode === "grid"
                    ? "bg-vsm-orange hover:bg-vsm-orange-dark"
                    : ""
                }
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list"
                    ? "bg-vsm-orange hover:bg-vsm-orange-dark"
                    : ""
                }
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
              className={
                category === "Tất cả"
                  ? "bg-vsm-orange hover:bg-vsm-orange-dark"
                  : ""
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-shadow group"
            >
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
                        <span className="text-sm text-gray-600 ml-1">
                          {product.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ({product.reviews} đánh giá)
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-gray-600 text-sm mb-4">
                      {product.description}
                    </p>

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
                      onClick={() => addToCart(product.id, product.priceNumber)}
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
                        <span className="text-sm text-gray-600 ml-1">
                          {product.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ({product.reviews} đánh giá)
                      </span>
                      {product.badge && (
                        <Badge className="bg-red-500 text-white text-xs">
                          {product.badge}
                        </Badge>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm mb-4">
                      {product.description}
                    </p>

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
                        onClick={() =>
                          addToCart(product.id, product.priceNumber)
                        }
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
