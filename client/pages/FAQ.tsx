import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  HelpCircle,
  ChevronRight,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Smartphone,
  MapPin,
  CreditCard,
  Settings,
  Shield,
  Users,
  CheckCircle,
} from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  popular: boolean;
  helpful: number;
  notHelpful: number;
  tags: string[];
}

interface FAQCategory {
  id: string;
  title: string;
  icon: any;
  count: number;
  color: string;
}

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [userFeedback, setUserFeedback] = useState<
    Record<string, "helpful" | "not-helpful" | null>
  >({});

  const categories: FAQCategory[] = [
    {
      id: "getting-started",
      title: "Bắt đầu",
      icon: HelpCircle,
      count: 12,
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: "mobile-app",
      title: "Ứng dụng",
      icon: Smartphone,
      count: 18,
      color: "bg-green-100 text-green-700",
    },
    {
      id: "gps-tracking",
      title: "GPS & Tracking",
      icon: MapPin,
      count: 15,
      color: "bg-orange-100 text-orange-700",
    },
    {
      id: "premium",
      title: "Premium",
      icon: CreditCard,
      count: 8,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      id: "account",
      title: "Tài khoản",
      icon: Settings,
      count: 10,
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: "privacy",
      title: "Bảo mật",
      icon: Shield,
      count: 6,
      color: "bg-red-100 text-red-700",
    },
    {
      id: "community",
      title: "Cộng đồng",
      icon: Users,
      count: 9,
      color: "bg-pink-100 text-pink-700",
    },
  ];

  const faqs: FAQItem[] = [
    {
      id: "1",
      question: "VSM là gì và ai có thể sử dụng?",
      answer:
        "VSM (Vietnam Student Marathon) là nền tảng chạy bộ dành riêng cho sinh viên Việt Nam. Mọi sinh viên đang học tại các trường đại học, cao đẳng trên toàn quốc đều có thể tham gia. Ứng dụng giúp kết nối cộng đồng chạy bộ sinh viên, theo dõi hoạt động với GPS, tham gia các sự kiện và thử thách.",
      category: "getting-started",
      popular: true,
      helpful: 247,
      notHelpful: 12,
      tags: ["cơ bản", "sinh viên", "giới thiệu"],
    },
    {
      id: "2",
      question: "Làm thế nào để tải và cài đặt ứng dụng VSM?",
      answer:
        "Bạn có thể tải ứng dụng VSM miễn phí từ:\n\n• App Store (iOS): Tìm kiếm 'Vietnam Student Marathon'\n• Google Play Store (Android): Tìm kiếm 'VSM'\n• Website: vsm.vn/download\n\nSau khi tải, mở ứng dụng và đăng ký tài khoản bằng email sinh viên. Ứng dụng hỗ trợ iOS 12+ và Android 7+.",
      category: "mobile-app",
      popular: true,
      helpful: 189,
      notHelpful: 8,
      tags: ["tải xuống", "cài đặt", "iOS", "Android"],
    },
    {
      id: "3",
      question: "GPS không hoạt động hoặc không chính xác, phải làm gì?",
      answer:
        "Nếu GPS không hoạt động, hãy kiểm tra:\n\n1. **Cài đặt quyền**: Vào Settings > Privacy > Location Services > VSM > Always\n2. **Bật GPS**: Đảm bảo Location Services được bật\n3. **Tín hiệu**: Chạy ở ngoài trời, tránh các tòa nhà cao\n4. **Khởi động lại**: Tắt và mở lại ứng dụng\n5. **Cập nhật**: Đảm bảo ứng dụng ở phiên bản mới nhất\n\nNếu vẫn không được, liên hệ hỗ trợ với thông tin thiết bị.",
      category: "gps-tracking",
      popular: true,
      helpful: 156,
      notHelpful: 23,
      tags: ["GPS", "lỗi", "khắc phục", "vị trí"],
    },
    {
      id: "4",
      question: "Premium có những tính năng gì và giá bao nhiều?",
      answer:
        "VSM Premium có giá 299,000đ (một lần, trọn đời) bao gồm:\n\n✓ **Giáo án tập luyện**: Chương trình từ HLV chuyên nghiệp\n✓ **Phân tích nâng cao**: VO2 Max, Training Load, Recovery\n✓ **Segments premium**: Thử thách độc quyền\n✓ **Voucher cửa hàng**: Giảm giá sản phẩm VSM\n✓ **Hỗ trợ ưu tiên**: 24/7 live chat\n✓ **Badge đặc biệt**: Hiển thị Premium trong cộng đồng\n✓ **Nhóm riêng tư**: Kết nối với Premium users\n\nThanh toán qua QR Code, chuyển khoản hoặc thẻ tín dụng.",
      category: "premium",
      popular: true,
      helpful: 134,
      notHelpful: 15,
      tags: ["premium", "giá", "tính năng", "thanh toán"],
    },
    {
      id: "5",
      question: "Tôi quên mật khẩu, làm sao để lấy lại?",
      answer:
        "Để lấy lại mật khẩu:\n\n1. Mở ứng dụng VSM\n2. Nhấn 'Đăng nhập' > 'Quên mật khẩu?'\n3. Nhập email đăng ký\n4. Kiểm tra email (kể cả thư mục spam)\n5. Nhấn link trong email\n6. Tạo mật khẩu mới\n\nNếu không nhận được email sau 5 phút, kiểm tra:\n• Email có đúng không?\n• Thư mục spam/junk\n• Liên hệ support@vsm.vn nếu vẫn không được",
      category: "account",
      popular: false,
      helpful: 98,
      notHelpful: 7,
      tags: ["mật khẩu", "quên", "email", "reset"],
    },
    {
      id: "6",
      question: "Làm thế nào để tham gia sự kiện chạy bộ?",
      answer:
        "Để tham gia sự kiện VSM:\n\n1. **Tìm sự kiện**: Vào tab 'Sự kiện' trong ứng dụng\n2. **Chọn sự kiện**: Xem chi tiết, địa điểm, thời gian\n3. **Đăng ký**: Nhấn 'Đăng ký' và điền thông tin\n4. **Thanh toán**: Nếu có phí tham gia\n5. **Xác nhận**: Nhận email xác nhận\n6. **Chuẩn bị**: Theo hướng dẫn trước sự kiện\n\nSự kiện free thường là fun run, còn marathon chính thức có phí. Early bird thường được giảm giá 20-30%.",
      category: "community",
      popular: false,
      helpful: 76,
      notHelpful: 5,
      tags: ["sự kiện", "đăng ký", "marathon", "fun run"],
    },
    {
      id: "7",
      question: "Dữ liệu cá nhân của tôi có an toàn không?",
      answer:
        "VSM cam kết bảo vệ dữ liệu cá nhân của bạn:\n\n🔒 **Mã hóa**: Tất cả dữ liệu được mã hóa AES-256\n🔒 **Lưu trữ**: Server tại Việt Nam, tuân thủ luật Cybersecurity\n🔒 **Không chia sẻ**: Không bán dữ liệu cho bên thứ ba\n🔒 **Quyền kiểm soát**: Bạn có thể xóa dữ liệu bất cứ lúc nào\n🔒 **Kiểm toán**: Được kiểm toán bảo mật định kỳ\n\nBạn có thể tải về hoặc xóa dữ liệu trong Settings > Privacy > Data Management.",
      category: "privacy",
      popular: false,
      helpful: 67,
      notHelpful: 3,
      tags: ["bảo mật", "dữ liệu", "privacy", "GDPR"],
    },
    {
      id: "8",
      question: "Ứng dụng có hoạt động offline không?",
      answer:
        "VSM có thể hoạt động offline hạn chế:\n\n✓ **Có thể offline**:\n• Theo dõi GPS và ghi nhận hoạt động\n• Xem dữ liệu đã lưu trước đó\n• Sử dụng timer và stopwatch\n\n❌ **Cần internet**:\n• Đồng bộ dữ liệu lên cloud\n• Xem feed và hoạt động của bạn bè\n• Tham gia challenges và events\n• Cập nhật thông tin profile\n• Sử dụng maps và directions\n\nKhi có internet trở lại, dữ liệu sẽ tự động đồng bộ.",
      category: "mobile-app",
      popular: false,
      helpful: 54,
      notHelpful: 8,
      tags: ["offline", "internet", "đồng bộ", "GPS"],
    },
    {
      id: "9",
      question: "Tại sao pace/distance không chính xác?",
      answer:
        'Độ chính xác của GPS có thể bị ảnh hưởng bởi:\n\n**Nguyên nhân phổ biến**:\n• Tín hiệu GPS yếu (trong nhà, dưới gầm cầu)\n• Thời tiết xấu (mưa to, mây dày)\n• Đặt điện thoại trong túi kín\n• Pin yếu hoặc nhiều app chạy nền\n\n**Cách cải thiện**:\n• Chạy ở ngoài trời thoáng đãng\n• Đợi GPS "lock" trước khi bắt đầu\n• Cầm điện thoại hoặc đeo trên tay\n• Tắt các ứng dụng không cần thiết\n• Bật High Accuracy GPS trong Settings\n\nĐộ lệch 3-5% là bình thường với GPS thông thường.',
      category: "gps-tracking",
      popular: false,
      helpful: 43,
      notHelpful: 12,
      tags: ["GPS", "pace", "distance", "độ chính xác"],
    },
    {
      id: "10",
      question: "Làm thế nào để kết nối với bạn bè?",
      answer:
        "Để kết nối với bạn bè trên VSM:\n\n**Cách 1: Tìm kiếm**\n• Vào tab 'Cộng đồng'\n• Nhấn 'Tìm bạn bè'\n• Tìm theo tên hoặc email\n\n**Cách 2: Contacts**\n• Cho phép truy cập danh bạ\n• VSM sẽ tự động đề xuất\n\n**Cách 3: QR Code**\n• Quét QR code của bạn bè\n• Hoặc chia sẻ QR của bạn\n\n**Cách 4: Nhóm trường**\n• Tham gia nhóm trường đại học\n• Kết nối với sinh viên cùng trường\n\nSau khi kết bạn, bạn có thể xem activities, kudos và comment.",
      category: "community",
      popular: false,
      helpful: 38,
      notHelpful: 4,
      tags: ["bạn bè", "kết nối", "QR code", "nhóm"],
    },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularFAQs = faqs.filter((faq) => faq.popular);

  const handleFeedback = (faqId: string, type: "helpful" | "not-helpful") => {
    setUserFeedback((prev) => ({
      ...prev,
      [faqId]: type,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <HelpCircle className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Câu hỏi thường gặp
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Tìm câu trả lời nhanh chóng cho các vấn đề phổ biến khi sử dụng
              VSM
            </p>

            {/* Search */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
              <Input
                type="text"
                placeholder="Tìm kiếm câu hỏi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-14 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/70"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Popular FAQs */}
        {!searchQuery && selectedCategory === "all" && (
          <Card className="mb-8 -mt-20 relative z-10 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                Câu hỏi phổ biến nhất
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {popularFAQs.map((faq) => (
                  <div
                    key={faq.id}
                    onClick={() => setExpandedFAQ(faq.id)}
                    className="p-4 border rounded-lg hover:shadow-md cursor-pointer transition-shadow"
                  >
                    <h3 className="font-medium text-gray-800 mb-2">
                      {faq.question}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{faq.helpful}</span>
                      </div>
                      <Badge variant="secondary">
                        {categories.find((c) => c.id === faq.category)?.title}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Danh mục</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "ghost"}
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full justify-start ${
                    selectedCategory === "all"
                      ? "bg-vsm-orange hover:bg-vsm-orange-dark"
                      : ""
                  }`}
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Tất cả ({faqs.length})
                </Button>

                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={
                        selectedCategory === category.id ? "default" : "ghost"
                      }
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full justify-start ${
                        selectedCategory === category.id
                          ? "bg-vsm-orange hover:bg-vsm-orange-dark"
                          : ""
                      }`}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {category.title} ({category.count})
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedCategory === "all"
                  ? "Tất cả câu hỏi"
                  : categories.find((c) => c.id === selectedCategory)?.title}
              </h2>
              <Badge variant="secondary">{filteredFAQs.length} kết quả</Badge>
            </div>

            {filteredFAQs.length > 0 ? (
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <Card
                    key={faq.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-0">
                      <button
                        onClick={() =>
                          setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
                        }
                        className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-gray-800">
                                {faq.question}
                              </h3>
                              {faq.popular && (
                                <Badge className="bg-yellow-100 text-yellow-700">
                                  <Star className="w-3 h-3 mr-1" />
                                  Phổ biến
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>
                                {
                                  categories.find((c) => c.id === faq.category)
                                    ?.title
                                }
                              </span>
                              <div className="flex items-center space-x-1">
                                <ThumbsUp className="w-4 h-4" />
                                <span>{faq.helpful}</span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {faq.tags.slice(0, 2).map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <ChevronRight
                            className={`w-5 h-5 text-gray-400 transition-transform ${
                              expandedFAQ === faq.id ? "rotate-90" : ""
                            }`}
                          />
                        </div>
                      </button>

                      {expandedFAQ === faq.id && (
                        <div className="px-6 pb-6 border-t bg-gray-50">
                          <div className="pt-6">
                            <div className="prose prose-gray max-w-none">
                              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {faq.answer}
                              </p>
                            </div>

                            {/* Feedback */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                              <p className="text-sm text-gray-600 mb-3">
                                Câu trả lời này có hữu ích không?
                              </p>
                              <div className="flex items-center space-x-4">
                                <Button
                                  size="sm"
                                  variant={
                                    userFeedback[faq.id] === "helpful"
                                      ? "default"
                                      : "outline"
                                  }
                                  onClick={() =>
                                    handleFeedback(faq.id, "helpful")
                                  }
                                  className={
                                    userFeedback[faq.id] === "helpful"
                                      ? "bg-green-600 hover:bg-green-700"
                                      : ""
                                  }
                                >
                                  <ThumbsUp className="w-4 h-4 mr-1" />
                                  Có ({faq.helpful})
                                </Button>
                                <Button
                                  size="sm"
                                  variant={
                                    userFeedback[faq.id] === "not-helpful"
                                      ? "default"
                                      : "outline"
                                  }
                                  onClick={() =>
                                    handleFeedback(faq.id, "not-helpful")
                                  }
                                  className={
                                    userFeedback[faq.id] === "not-helpful"
                                      ? "bg-red-600 hover:bg-red-700"
                                      : ""
                                  }
                                >
                                  <ThumbsDown className="w-4 h-4 mr-1" />
                                  Không ({faq.notHelpful})
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Không tìm thấy kết quả
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Thử tìm kiếm với từ khóa khác hoặc xem tất cả câu hỏi
                  </p>
                  <div className="space-x-4">
                    <Button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                      }}
                      variant="outline"
                    >
                      Xem tất cả
                    </Button>
                    <Button className="bg-vsm-orange hover:bg-vsm-orange-dark text-white">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Liên hệ hỗ trợ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Contact CTA */}
        <Card className="mt-12 bg-gradient-to-r from-vsm-orange/10 to-orange-100 border-vsm-orange/20">
          <CardContent className="p-8 text-center">
            <MessageCircle className="w-12 h-12 text-vsm-orange mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-vsm-black mb-2">
              Vẫn chưa tìm thấy câu trả lời?
            </h3>
            <p className="text-gray-600 mb-6">
              Đội ngũ hỗ trợ VSM luôn sẵn sàng giúp đỡ bạn 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-vsm-orange hover:bg-vsm-orange-dark text-white">
                <MessageCircle className="w-5 h-5 mr-2" />
                Live Chat
              </Button>
              <Button variant="outline">Gửi email hỗ trợ</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
