import { useEffect, useState } from "react";
import {
  Play,
  Users,
  MapPin,
  Calendar,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CountdownProps {
  targetDate: string;
}

function CountdownTimer({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-4 md:gap-8">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[100px]">
            <div className="text-2xl md:text-4xl font-bold text-white">
              {value.toString().padStart(2, "0")}
            </div>
            <div className="text-white/80 text-sm md:text-base uppercase tracking-wide">
              {unit}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Index() {
  const stats = [
    { icon: Users, value: "25,000+", label: "Sinh viên tham gia" },
    { icon: MapPin, value: "63", label: "Tỉnh thành" },
    { icon: Star, value: "4.9", label: "Đánh giá ứng dụng" },
    { icon: Calendar, value: "120+", label: "Sự kiện đã tổ chức" },
  ];

  const features = [
    "Theo dõi GPS chính xác",
    "Cộng đồng sinh viên sôi động",
    "Giải thưởng hấp dẫn",
    "Ứng dụng dễ sử dụng",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 vsm-gradient"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
              🏃‍♂️ Vietnam Student Marathon 2025
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-up">
              Chạy Vì Ước Mơ
              <br />
              <span className="text-white/90">Kết Nối Sinh Viên</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Tham gia cộng đồng chạy bộ lớn nhất dành cho sinh viên Việt Nam.
              Theo dõi tiến độ, tham gia thử thách và kết nối với hàng nghìn
              sinh viên cùng đam mê.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-white text-vsm-orange hover:bg-gray-50 text-lg px-8 py-4"
              >
                <Play className="w-6 h-6 mr-2 fill-current" />
                Bắt đầu chạy ngay
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-vsm-orange text-lg px-8 py-4"
              >
                Xem video giới thiệu
              </Button>
            </div>

            {/* Countdown Timer */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Marathon chính thức bắt đầu sau:
              </h3>
              <CountdownTimer targetDate="2025-12-15T06:00:00" />
            </div>
          </div>
        </div>

        {/* Hero image/illustration */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mx-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About VSM Section */}
      <section className="py-20 md:py-32 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-vsm-orange/10 text-vsm-orange border-vsm-orange/20">
                Về chúng tôi
              </Badge>

              <h2 className="text-3xl md:text-5xl font-bold text-vsm-black mb-6">
                Vietnam Student Marathon
                <span className="block text-vsm-orange">
                  Kết nối đam mê chạy bộ
                </span>
              </h2>

              <p className="text-lg text-vsm-gray-medium mb-8 leading-relaxed">
                VSM là nền tảng hàng đầu tại Việt Nam dành riêng cho sinh viên
                yêu thích chạy bộ. Chúng tôi tin rằng thể thao không chỉ giúp
                rèn luyện sức khỏe mà còn xây dựng tinh thần đoàn kết và kỷ luật
                trong học tập.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-vsm-orange" />
                    <span className="text-vsm-black">{feature}</span>
                  </div>
                ))}
              </div>

              <Button className="bg-vsm-orange hover:bg-vsm-orange-dark text-white px-8 py-4">
                Tìm hiểu thêm
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-vsm-orange/20 to-vsm-orange/40 rounded-3xl p-8">
                <div className="w-full h-full bg-white/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-vsm-orange rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-12 h-12 text-white fill-current" />
                    </div>
                    <p className="text-vsm-black font-semibold">
                      Hình ảnh sinh viên chạy bộ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-vsm-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-vsm-black mb-4">
              Cộng đồng VSM trên toàn quốc
            </h3>
            <p className="text-lg text-vsm-gray-medium max-w-2xl mx-auto">
              Hàng nghìn sinh viên đã tin tướng và đồng hành cùng VSM trong hành
              trình rèn luyện sức khỏe
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "1,250,000", label: "Km đã chạy", suffix: "km+" },
              { number: "25,000", label: "Sinh viên", suffix: "+" },
              { number: "120", label: "Sự kiện", suffix: "+" },
              { number: "95", label: "Hài lòng", suffix: "%" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="text-3xl md:text-4xl font-bold text-vsm-orange mb-2">
                    {stat.number.includes(".")
                      ? stat.number
                      : stat.number.slice(0, -3)}
                    <span className="text-2xl">{stat.suffix}</span>
                  </div>
                  <p className="text-vsm-gray-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 vsm-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Sẵn sàng gia nhập cộng đồng?
          </h2>

          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Tải ứng dụng VSM ngay hôm nay và bắt đầu hành trình chạy bộ cùng
            hàng nghìn sinh viên khắp Việt Nam
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-vsm-orange hover:bg-gray-50 text-lg px-8 py-4"
            >
              <Play className="w-6 h-6 mr-2 fill-current" />
              Tải ứng dụng miễn phí
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-vsm-orange text-lg px-8 py-4"
            >
              Xem hướng dẫn sử dụng
            </Button>
          </div>

          <div className="mt-12 flex justify-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Miễn phí</div>
              <div className="text-white/80">100% Free</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">iOS & Android</div>
              <div className="text-white/80">Đa nền tảng</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-white/80">Hỗ trợ</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-vsm-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-vsm-orange rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 text-white fill-current" />
                </div>
                <span className="text-xl font-bold">VSM</span>
              </div>
              <p className="text-gray-400">
                Nền tảng chạy bộ hàng đầu dành cho sinh viên Việt Nam
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Sản phẩm</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-vsm-orange transition-colors"
                  >
                    Ứng dụng mobile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-vsm-orange transition-colors"
                  >
                    Theo dõi GPS
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-vsm-orange transition-colors"
                  >
                    Cộng đồng
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-vsm-orange transition-colors"
                  >
                    Trung tâm trợ giúp
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-vsm-orange transition-colors"
                  >
                    Liên hệ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-vsm-orange transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Kết nối</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-vsm-orange transition-colors"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-vsm-orange transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-vsm-orange transition-colors"
                  >
                    TikTok
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Vietnam Student Marathon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
