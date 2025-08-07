import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Smartphone,
  Download,
  Star,
  Play,
  MapPin,
  Users,
  Trophy,
  Camera,
  Heart,
  Zap,
  Shield,
  CheckCircle,
  Monitor,
  Tablet,
  Globe,
  ArrowRight,
} from "lucide-react";

export default function MobileApp() {
  const features = [
    {
      icon: MapPin,
      title: "GPS Tracking chính xác",
      description:
        "Theo dõi quãng đường, pace, calories với GPS độ chính xác cao",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Users,
      title: "Cộng đồng sinh viên",
      description:
        "Kết nối với hàng nghìn sinh viên đam mê chạy bộ trên toàn quốc",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Trophy,
      title: "Sự kiện & Thử thách",
      description: "Tham gia marathon, fun run và các thử thách hấp dẫn",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      icon: Camera,
      title: "Chia sẻ hoạt động",
      description: "Đăng ảnh, video và chia sẻ thành tích với cộng đồng",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Heart,
      title: "Theo dõi sức khỏe",
      description:
        "Giám sát nhịp tim, calories và các chỉ số sức khỏe quan trọng",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: Zap,
      title: "Phân tích nâng cao",
      description: "Báo cáo chi tiết về hiệu suất và xu hướng cải thiện",
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const screenshots = [
    { id: 1, title: "Trang chủ", description: "Dashboard tổng quan hoạt động" },
    { id: 2, title: "GPS Tracking", description: "Theo dõi chạy bộ real-time" },
    { id: 3, title: "Social Feed", description: "Hoạt động của cộng đồng" },
    { id: 4, title: "Sự kiện", description: "Marathon và fun run" },
    { id: 5, title: "Profile", description: "Thống kê cá nhân" },
  ];

  const testimonials = [
    {
      name: "Minh Anh Nguyen",
      university: "ĐH Bách Khoa Hà Nội",
      rating: 5,
      comment:
        "App tuyệt vời! GPS rất chính xác và cộng đồng rất sôi động. Đã giúp tôi cải thiện pace từ 6:00 xuống 5:20!",
    },
    {
      name: "Thu Ha Le",
      university: "ĐH Y Hà Nội",
      rating: 5,
      comment:
        "Giao diện đẹp, dễ sử dụng. Tính năng theo dõi sức khỏe rất hữu ích cho việc tập luyện khoa học.",
    },
    {
      name: "Duc Huy Tran",
      university: "ĐH Kinh tế Quốc dân",
      rating: 5,
      comment:
        "Kết nối được với nhiều bạn cùng sở thích. Các sự kiện VSM tổ chức rất chuyên nghiệp và ý nghĩa!",
    },
  ];

  const stats = [
    { label: "Tổng tải xuống", value: "150K+", icon: Download },
    { label: "Đánh giá", value: "4.8/5", icon: Star },
    { label: "Người dùng hoạt động", value: "25K+", icon: Users },
    { label: "Km đã theo dõi", value: "2.5M+", icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-vsm-orange via-orange-500 to-red-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                <Play className="w-4 h-4 mr-1" />
                Ứng dụng #1 cho sinh viên Việt Nam
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                VSM Mobile
                <br />
                <span className="text-white/90">Chạy bộ thông minh</span>
              </h1>

              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Ứng dụng chạy bộ được thiết kế đặc biệt cho sinh viên Việt Nam.
                Theo dõi GPS chính xác, kết nối cộng đồng và tham gia các sự
                kiện hấp dẫn.
              </p>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button className="bg-black hover:bg-gray-800 text-white h-14 px-6 text-lg">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-6 h-6" />
                    <div className="text-left">
                      <div className="text-xs">Tải xuống trên</div>
                      <div className="font-semibold">App Store</div>
                    </div>
                  </div>
                </Button>

                <Button className="bg-black hover:bg-gray-800 text-white h-14 px-6 text-lg">
                  <div className="flex items-center space-x-3">
                    <Play className="w-6 h-6" />
                    <div className="text-left">
                      <div className="text-xs">Tải xuống trên</div>
                      <div className="font-semibold">Google Play</div>
                    </div>
                  </div>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <IconComponent className="w-6 h-6 mx-auto mb-2 opacity-80" />
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm opacity-80">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              {/* Phone Mockup */}
              <div className="relative mx-auto w-80 h-96 bg-black rounded-3xl p-2 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-b from-vsm-orange/20 to-orange-500/40 rounded-2xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <Smartphone className="w-20 h-20 mx-auto mb-4 opacity-80" />
                    <h3 className="text-lg font-semibold mb-2">VSM App</h3>
                    <p className="text-sm opacity-80">
                      Trải nghiệm chạy bộ hoàn hảo
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Tính năng nổi bật
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            VSM Mobile tích hợp đầy đủ các tính năng cần thiết cho việc chạy bộ
            và kết nối cộng đồng
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Screenshots Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Giao diện ứng dụng
            </h2>
            <p className="text-gray-600">
              Thiết kế hiện đại, trực quan và thân thiện với người dùng
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {screenshots.map((screenshot) => (
              <Card
                key={screenshot.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="aspect-[9/16] bg-gradient-to-b from-gray-200 to-gray-300 rounded-lg mb-4 flex items-center justify-center">
                    <Smartphone className="w-12 h-12 text-gray-500" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    {screenshot.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {screenshot.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Sinh viên nói gì về VSM?
          </h2>
          <p className="text-gray-600">
            Hàng nghìn sinh viên đã tin tưởng và sử dụng VSM
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.comment}"
                </p>
                <div>
                  <p className="font-semibold text-gray-800">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonial.university}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Device Compatibility */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Tương thích đa nền tảng
            </h2>
            <p className="text-gray-600">
              Sử dụng VSM trên mọi thiết bị với trải nghiệm tối ưu
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <Smartphone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Mobile</h3>
                <p className="text-gray-600 mb-4">iOS 12+ & Android 7+</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• GPS tracking chính xác</li>
                  <li>• Notifications thông minh</li>
                  <li>• Offline mode hỗ trợ</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Tablet className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Tablet</h3>
                <p className="text-gray-600 mb-4">iPad & Android Tablet</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Giao diện tối ưu màn lớn</li>
                  <li>• Xem dữ liệu chi tiết</li>
                  <li>• Quản lý group dễ dàng</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Monitor className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Web</h3>
                <p className="text-gray-600 mb-4">Mọi trình duyệt hiện đại</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Đồng bộ real-time</li>
                  <li>• Phân tích nâng cao</li>
                  <li>• Quản lý sự kiện</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Security & Privacy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Bảo mật & Quyền riêng tư
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            VSM cam kết bảo vệ dữ liệu cá nhân của bạn với các tiêu chuẩn bảo
            mật cao nhất
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Shield,
              title: "Mã hóa AES-256",
              description: "Dữ liệu được bảo vệ tối đa",
            },
            {
              icon: Globe,
              title: "Server tại VN",
              description: "Tuân thủ luật Cybersecurity",
            },
            {
              icon: CheckCircle,
              title: "GDPR Compliant",
              description: "Quyền kiểm soát dữ liệu",
            },
            {
              icon: Heart,
              title: "Không bán dữ liệu",
              description: "Không chia sẻ bên thứ 3",
            },
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Download CTA */}
      <div className="bg-gradient-to-r from-vsm-orange to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sẵn sàng bắt đầu hành trình?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Tải VSM ngay và tham gia cộng đồng chạy bộ sinh viên lớn nhất Việt
            Nam
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button className="bg-black hover:bg-gray-800 text-white h-14 px-8 text-lg">
              <Download className="w-5 h-5 mr-2" />
              Tải cho iOS
            </Button>
            <Button className="bg-black hover:bg-gray-800 text-white h-14 px-8 text-lg">
              <Download className="w-5 h-5 mr-2" />
              Tải cho Android
            </Button>
          </div>

          <p className="text-white/80">
            💯 Miễn phí • ⭐ 4.8/5 rating • 📱 Tương thích iOS & Android
          </p>
        </div>
      </div>
    </div>
  );
}
