import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Play, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  CheckCircle,
  Crown,
  Star,
  Users,
  Activity,
  Trophy,
  Zap
} from "lucide-react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate login success
      localStorage.setItem('vsm_user', JSON.stringify({
        id: 'user_1',
        name: 'Thành Long Nguyen',
        email: formData.email,
        isPremium: false,
        joinedDate: Date.now()
      }));

      toast({
        title: "Đăng nhập thành công! 🎉",
        description: "Chào mừng bạn trở lại VSM!"
      });

      // Redirect to profile or home
      window.location.href = "/profile";
    } catch (error) {
      toast({
        title: "Lỗi đăng nhập",
        description: "Email hoặc mật khẩu không chính xác",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePremiumUpgrade = () => {
    // Mock premium upgrade
    localStorage.setItem('vsm_user', JSON.stringify({
      id: 'user_1',
      name: 'Thành Long Nguyen',
      email: formData.email,
      isPremium: true,
      premiumExpiry: Date.now() + (365 * 24 * 60 * 60 * 1000),
      joinedDate: Date.now()
    }));

    setShowPremiumModal(false);
    toast({
      title: "Chúc mừng! 👑",
      description: "Bạn đã nâng cấp lên Premium thành công!"
    });

    window.location.href = "/profile";
  };

  const premiumFeatures = [
    { icon: Crown, title: "Giáo án chuyên nghiệp", description: "Từ các HLV hàng đầu" },
    { icon: Activity, title: "Phân tích nâng cao", description: "VO2 Max, Training Load" },
    { icon: Trophy, title: "Thử thách độc quyền", description: "Segments premium" },
    { icon: Zap, title: "Ưu tiên hỗ trợ", description: "Hỗ trợ 24/7" },
    { icon: Star, title: "Badge đặc biệt", description: "Hiển thị Premium" },
    { icon: Users, title: "Nhóm riêng tư", description: "Kết nối Premium users" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-vsm-orange/10 via-white to-orange-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="w-12 h-12 bg-vsm-orange rounded-xl flex items-center justify-center">
              <Play className="w-7 h-7 text-white fill-current" />
            </div>
            <span className="text-2xl font-bold text-vsm-black">VSM</span>
          </Link>
          
          <h2 className="text-3xl font-bold text-vsm-black">Chào mừng trở lại</h2>
          <p className="mt-2 text-gray-600">
            Đăng nhập để tiếp tục hành trình chạy bộ của bạn
          </p>
        </div>

        {/* Login Form */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl text-center text-vsm-black">Đăng nhập</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="student@university.edu.vn"
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="pl-10 pr-10 h-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-vsm-orange border-gray-300 rounded focus:ring-vsm-orange"
                  />
                  <span className="ml-2 text-sm text-gray-600">Ghi nhớ đăng nhập</span>
                </label>
                
                <Link to="/forgot-password" className="text-sm text-vsm-orange hover:text-vsm-orange-dark">
                  Quên mật khẩu?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-vsm-orange hover:bg-vsm-orange-dark text-white text-lg font-medium"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Đang đăng nhập...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Đăng nhập</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Hoặc</span>
                </div>
              </div>

              <Button
                onClick={() => setShowPremiumModal(true)}
                className="w-full mt-4 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white h-12"
              >
                <Crown className="w-5 h-5 mr-2" />
                Đăng ký Premium - 299,000đ
              </Button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <Link to="/register" className="text-vsm-orange hover:text-vsm-orange-dark font-medium">
                Đăng ký ngay
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-center text-gray-800 mb-4">
              ✨ Tính năng độc quyền VSM
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>GPS tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Social features</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Event access</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Store vouchers</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                VSM Premium
              </CardTitle>
              <p className="text-gray-600">Unlock toàn bộ trải nghiệm VSM</p>
              
              <div className="mt-4">
                <div className="text-4xl font-bold text-vsm-orange">299,000đ</div>
                <div className="text-sm text-gray-500">một lần / trọn đời</div>
                <Badge className="mt-2 bg-green-100 text-green-700">
                  Tiết kiệm 60% so với gói tháng
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                {premiumFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t pt-6 space-y-3">
                <Button
                  onClick={handlePremiumUpgrade}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white h-12 text-lg"
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Nâng cấp Premium ngay
                </Button>
                
                <Button
                  onClick={() => setShowPremiumModal(false)}
                  variant="outline"
                  className="w-full"
                >
                  Để sau
                </Button>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  💳 Thanh toán an toàn • 🔄 Hoàn tiền 30 ngày • 📞 Hỗ trợ 24/7
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
