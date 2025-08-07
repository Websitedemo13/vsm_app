import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  Users,
  Headphones,
  Globe,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    priority: "normal",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Gửi thành công! 📧",
        description: "Chúng tôi sẽ phản hồi bạn trong vòng 24 giờ.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        priority: "normal",
      });
    } catch (error) {
      toast({
        title: "Lỗi gửi tin nhắn",
        description: "Vui lòng thử lại sau",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Trò chuyện trực tiếp với đội hỗ trợ",
      value: "Luôn online",
      action: "Bắt đầu chat",
      color: "bg-green-100 text-green-700",
      available: true,
    },
    {
      icon: Phone,
      title: "Hotline",
      description: "Gọi điện trực tiếp 24/7",
      value: "1900 VSM (876)",
      action: "Gọi ngay",
      color: "bg-blue-100 text-blue-700",
      available: true,
    },
    {
      icon: Mail,
      title: "Email",
      description: "Gửi email chi tiết",
      value: "support@vsm.vn",
      action: "Gửi email",
      color: "bg-purple-100 text-purple-700",
      available: true,
    },
    {
      icon: MapPin,
      title: "Văn phòng",
      description: "Ghé thăm văn phòng chúng tôi",
      value: "Hà Nội & TP.HCM",
      action: "Xem địa chỉ",
      color: "bg-orange-100 text-orange-700",
      available: true,
    },
  ];

  const offices = [
    {
      city: "Hà Nội",
      address: "Tầng 12, Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội",
      phone: "(024) 3962 0xxx",
      email: "hanoi@vsm.vn",
      hours: "T2-T6: 8:00-18:00, T7: 8:00-12:00",
    },
    {
      city: "TP. Hồ Chí Minh",
      address: "Tầng 8, Tòa nhà Bitexco, 2 Hải Triều, Quận 1, TP.HCM",
      phone: "(028) 3914 0xxx",
      email: "hcm@vsm.vn",
      hours: "T2-T6: 8:00-18:00, T7: 8:00-12:00",
    },
  ];

  const socialLinks = [
    { icon: Facebook, name: "Facebook", url: "#", followers: "125K" },
    { icon: Instagram, name: "Instagram", url: "#", followers: "89K" },
    { icon: Youtube, name: "YouTube", url: "#", followers: "67K" },
    { icon: Twitter, name: "Twitter", url: "#", followers: "45K" },
  ];

  const supportStats = [
    { label: "Phản hồi trung bình", value: "< 2 phút", icon: Clock },
    { label: "Độ hài lòng", value: "99.2%", icon: CheckCircle },
    { label: "Hỗ trợ 24/7", value: "365 ngày", icon: Headphones },
    { label: "Ngôn ngữ", value: "Tiếng Việt", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-vsm-orange to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <Mail className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Liên hệ với chúng tôi
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Đội ngũ VSM luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ qua bất kỳ kênh
              nào bạn muốn!
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {supportStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <IconComponent className="w-8 h-8 mx-auto mb-2 opacity-80" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm opacity-80">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 -mt-20 relative z-10">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${method.color}`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {method.description}
                  </p>
                  <p className="font-medium text-vsm-orange mb-4">
                    {method.value}
                  </p>
                  <Button className="w-full bg-vsm-orange hover:bg-vsm-orange-dark text-white">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="w-5 h-5 mr-2 text-vsm-orange" />
                Gửi tin nhắn
              </CardTitle>
              <p className="text-gray-600">
                Điền thông tin dưới đây và chúng tôi sẽ phản hồi trong vòng 24
                giờ
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Họ và tên *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nguyễn Văn A"
                      required
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                      required
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Số điện thoại
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0xxx xxx xxx"
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Mức độ ưu tiên
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full h-12 px-3 border border-gray-300 rounded-md focus:ring-vsm-orange focus:border-vsm-orange"
                    >
                      <option value="low">Thấp</option>
                      <option value="normal">Bình thường</option>
                      <option value="high">Cao</option>
                      <option value="urgent">Khẩn cấp</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Tiêu đề *
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Vấn đề về..."
                    required
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Nội dung tin nhắn *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Mô tả chi tiết vấn đề bạn gặp phải..."
                    required
                    rows={6}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-vsm-orange focus:border-vsm-orange resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-vsm-orange hover:bg-vsm-orange-dark text-white text-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Đang gửi...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>Gửi tin nhắn</span>
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Office Locations & Social */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-vsm-orange" />
                  Văn phòng VSM
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {offices.map((office, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-vsm-orange pl-6"
                  >
                    <h3 className="font-semibold text-lg text-vsm-black mb-2">
                      VSM {office.city}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                        <span className="text-gray-600">{office.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{office.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{office.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{office.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-vsm-orange" />
                  Kết nối với VSM
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Theo dõi VSM trên các mạng xã hội để cập nhật tin tức mới nhất
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        className="flex items-center space-x-3 p-3 border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <IconComponent className="w-6 h-6 text-vsm-orange" />
                        <div>
                          <div className="font-medium text-gray-800">
                            {social.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {social.followers} followers
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Preview */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Có thể bạn đang tìm kiếm?
              </h3>
              <p className="text-gray-600 mb-6">
                Nhiều câu hỏi đã được trả lời trong trung tâm trợ giúp của chúng
                tôi
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Xem câu hỏi thường gặp
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
