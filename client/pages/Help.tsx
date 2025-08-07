import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail,
  Clock,
  Users,
  BookOpen,
  Video,
  Download,
  Star,
  ArrowRight,
  ChevronRight,
  Play,
  Smartphone,
  MapPin,
  Settings,
  CreditCard,
  Shield,
  Headphones
} from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  popular: boolean;
}

interface HelpCategory {
  id: string;
  title: string;
  description: string;
  icon: any;
  articleCount: number;
  color: string;
}

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const categories: HelpCategory[] = [
    {
      id: "getting-started",
      title: "Bắt đầu sử dụng",
      description: "Hướng dẫn cơ bản để sử dụng VSM",
      icon: Play,
      articleCount: 8,
      color: "bg-blue-100 text-blue-700"
    },
    {
      id: "mobile-app",
      title: "Ứng dụng mobile",
      description: "Tải và sử dụng app trên điện thoại",
      icon: Smartphone,
      articleCount: 12,
      color: "bg-green-100 text-green-700"
    },
    {
      id: "gps-tracking",
      title: "GPS & Theo dõi",
      description: "Sử dụng GPS và theo dõi hoạt động",
      icon: MapPin,
      articleCount: 15,
      color: "bg-orange-100 text-orange-700"
    },
    {
      id: "account",
      title: "Tài khoản",
      description: "Quản lý tài khoản và cài đặt",
      icon: Settings,
      articleCount: 10,
      color: "bg-purple-100 text-purple-700"
    },
    {
      id: "premium",
      title: "Premium",
      description: "Tính năng và thanh toán Premium",
      icon: CreditCard,
      articleCount: 6,
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      id: "privacy",
      title: "Bảo mật",
      description: "Quyền riêng tư và bảo mật dữ liệu",
      icon: Shield,
      articleCount: 7,
      color: "bg-red-100 text-red-700"
    }
  ];

  const faqs: FAQ[] = [
    {
      id: "1",
      question: "Làm thế nào để tải ứng dụng VSM?",
      answer: "Bạn có thể tải ứng dụng VSM từ App Store (iOS) hoặc Google Play Store (Android). Tìm kiếm 'Vietnam Student Marathon' hoặc 'VSM' và tải xuống miễn phí.",
      category: "mobile-app",
      popular: true
    },
    {
      id: "2",
      question: "GPS không hoạt động, tôi phải làm gì?",
      answer: "Vui lòng kiểm tra: 1) Cho phép VSM truy cập vị trí trong cài đặt điện thoại, 2) Bật GPS/Location Services, 3) Chạy ở ngoài trời có tín hiệu tốt, 4) Khởi động lại ứng dụng.",
      category: "gps-tracking",
      popular: true
    },
    {
      id: "3",
      question: "Tôi có thể hủy Premium không?",
      answer: "Có, bạn có thể hủy Premium bất cứ lúc nào trong phần 'Quản lý đăng ký' của tài khoản. Premium sẽ tiếp tục hoạt động đến hết chu kỳ thanh toán hiện tại.",
      category: "premium",
      popular: true
    },
    {
      id: "4",
      question: "Làm thế nào để thay đổi thông tin cá nhân?",
      answer: "Vào Cá nhân > Cài đặt > Thông tin cá nhân. Bạn có thể chỉnh sửa tên, email, số điện thoại và các thông tin khác. Một số thay đổi có thể cần xác thực qua email.",
      category: "account",
      popular: false
    },
    {
      id: "5",
      question: "Dữ liệu chạy bộ của tôi có được bảo mật không?",
      answer: "Có, VSM sử dụng mã hóa end-to-end để bảo vệ dữ liệu của bạn. Chúng tôi không bao giờ chia sẻ thông tin cá nhân với bên thứ ba mà không có sự đồng ý của bạn.",
      category: "privacy",
      popular: false
    },
    {
      id: "6",
      question: "Tôi có thể sử dụng VSM mà không cần internet không?",
      answer: "Ứng dụng có thể hoạt động offline cho việc theo dõi GPS cơ bản, nhưng bạn cần internet để đồng bộ dữ liệu, xem feed, tham gia sự kiện và sử dụng hầu hết các tính năng xã hội.",
      category: "getting-started",
      popular: false
    }
  ];

  const popularArticles = [
    { title: "Hướng dẫn sử dụng GPS tracking", views: "12.5k", icon: MapPin },
    { title: "Cách tham gia sự kiện VSM", views: "8.3k", icon: Users },
    { title: "Nâng cấp lên Premium", views: "7.1k", icon: Star },
    { title: "Khắc phục lỗi đồng bộ dữ liệu", views: "5.9k", icon: Settings }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-vsm-orange to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <HelpCircle className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Trung tâm trợ giúp VSM
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Tìm câu trả lời cho mọi thắc mắc về ứng dụng và dịch vụ VSM
            </p>
            
            {/* Search */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Tìm kiếm câu hỏi, hướng dẫn..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-14 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/70"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Contact */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 -mt-20 relative z-10">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-4">Trò chuyện trực tiếp với đội hỗ trợ</p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Bắt đầu chat
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Hotline</h3>
              <p className="text-sm text-gray-600 mb-4">Gọi điện trực tiếp 24/7</p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                1900 VSM (876)
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
              <p className="text-sm text-gray-600 mb-4">Gửi email chi tiết</p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                support@vsm.vn
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Categories */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-vsm-orange" />
                  Danh mục hỗ trợ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant={selectedCategory === "all" ? "default" : "ghost"}
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full justify-start h-auto p-3 ${
                    selectedCategory === "all" ? "bg-vsm-orange hover:bg-vsm-orange-dark" : ""
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <HelpCircle className="w-5 h-5 mr-3" />
                      <span>Tất cả</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Button>

                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full justify-start h-auto p-3 ${
                        selectedCategory === category.id ? "bg-vsm-orange hover:bg-vsm-orange-dark" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${category.color}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium">{category.title}</div>
                            <div className="text-xs text-gray-500">{category.articleCount} bài viết</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Popular Articles */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Bài viết phổ biến
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {popularArticles.map((article, index) => {
                  const IconComponent = article.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <IconComponent className="w-5 h-5 text-vsm-orange" />
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-800">{article.title}</div>
                        <div className="text-xs text-gray-500">{article.views} lượt xem</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2 text-vsm-orange" />
                    Câu hỏi thường gặp
                  </div>
                  <Badge variant="secondary">
                    {filteredFAQs.length} kết quả
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredFAQs.length > 0 ? (
                  <div className="space-y-4">
                    {filteredFAQs.map((faq) => (
                      <Card key={faq.id} className="border hover:shadow-md transition-shadow">
                        <CardContent className="p-0">
                          <button
                            onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                            className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h3 className="font-medium text-gray-800">{faq.question}</h3>
                                  {faq.popular && (
                                    <Badge className="bg-yellow-100 text-yellow-700 text-xs">
                                      Phổ biến
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500">
                                  {categories.find(c => c.id === faq.category)?.title}
                                </p>
                              </div>
                              <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                                expandedFAQ === faq.id ? 'rotate-90' : ''
                              }`} />
                            </div>
                          </button>
                          
                          {expandedFAQ === faq.id && (
                            <div className="px-6 pb-6 border-t bg-gray-50">
                              <p className="text-gray-700 leading-relaxed pt-4">
                                {faq.answer}
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">
                      Không tìm thấy kết quả
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Thử tìm kiếm với từ khóa khác hoặc liên hệ hỗ trợ
                    </p>
                    <Button className="bg-vsm-orange hover:bg-vsm-orange-dark text-white">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Liên hệ hỗ trợ
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Resources */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <Video className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-blue-800 mb-2">Video hướng dẫn</h3>
                  <p className="text-sm text-blue-600 mb-4">
                    Xem video chi tiết cách sử dụng VSM
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Play className="w-4 h-4 mr-2" />
                    Xem video
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-6 text-center">
                  <Download className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-green-800 mb-2">Tài liệu PDF</h3>
                  <p className="text-sm text-green-600 mb-4">
                    Tải hướng dẫn sử dụng chi tiết
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Tải xuống
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Support Info */}
        <Card className="mt-12 bg-gradient-to-r from-vsm-orange/10 to-orange-100 border-vsm-orange/20">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-vsm-orange rounded-full flex items-center justify-center">
                  <Headphones className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-vsm-black mb-1">
                    Cần hỗ trợ thêm?
                  </h3>
                  <p className="text-gray-600">
                    Đội ngũ hỗ trợ 24/7 luôn sẵn sàng giúp đỡ bạn
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Phản hồi trong 2 phút</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>99% hài lòng</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button className="bg-vsm-orange hover:bg-vsm-orange-dark text-white px-8">
                <MessageCircle className="w-5 h-5 mr-2" />
                Liên hệ ngay
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
