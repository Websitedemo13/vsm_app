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
  User,
  GraduationCap,
  Phone,
  Calendar,
  CheckCircle,
  ArrowRight,
  Crown,
  Shield,
  Heart,
} from "lucide-react";

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    university: "",
    studentId: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    agreeMarketing: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPremiumOffer, setShowPremiumOffer] = useState(false);
  const { toast } = useToast();

  const universities = [
    "Đại học Bách Khoa Hà Nội",
    "Đại học Quốc gia Hà Nội",
    "Đại học Kinh tế Quốc dân",
    "Đại học Ngoại thương",
    "Đại học Y Hà Nội",
    "Đại học Sư phạm Hà Nội",
    "Đại học Bách Khoa TP.HCM",
    "Đại học Quốc gia TP.HCM",
    "Đại học Kinh tế TP.HCM",
    "Đại học Khoa học Tự nhiên",
    "Đại học Khoa học Xã hội và Nhân văn",
    "Đại học Công nghệ",
    "Đại học Giao thông vận tải",
    "Đại học Nông nghiệp Hà Nội",
    "Khác",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateStep1 = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: "Thông tin chưa đầy đủ",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email không hợp lệ",
        description: "Vui lòng nhập email đúng định dạng",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    if (!formData.university || !formData.dateOfBirth) {
      toast({
        title: "Thông tin chưa đầy đủ",
        description: "Vui lòng chọn trường đại học và ngày sinh",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.password || !formData.confirmPassword) {
      toast({
        title: "Mật khẩu chưa được nhập",
        description: "Vui lòng nhập mật khẩu và xác nhận mật khẩu",
        variant: "destructive",
      });
      return false;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Mật khẩu quá ngắn",
        description: "Mật khẩu phải có ít nhất 6 ký tự",
        variant: "destructive",
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Mật khẩu không khớp",
        description: "Mật khẩu xác nhận không giống mật khẩu đã nhập",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.agreeTerms) {
      toast({
        title: "Chưa đồng ý điều khoản",
        description: "Vui lòng đồng ý với điều khoản sử dụng",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep3()) return;

    setIsLoading(true);

    try {
      // Mock registration
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate registration success
      const userData = {
        id: "user_" + Date.now(),
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        university: formData.university,
        studentId: formData.studentId,
        dateOfBirth: formData.dateOfBirth,
        isPremium: false,
        joinedDate: Date.now(),
      };

      localStorage.setItem("vsm_user", JSON.stringify(userData));

      toast({
        title: "Đăng ký thành công! 🎉",
        description: "Chào mừng bạn đến với cộng đồng VSM!",
      });

      // Show premium offer
      setShowPremiumOffer(true);
    } catch (error) {
      toast({
        title: "Lỗi đăng ký",
        description: "Có lỗi xảy ra, vui lòng thử lại",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePremiumUpgrade = () => {
    const userData = JSON.parse(localStorage.getItem("vsm_user") || "{}");
    userData.isPremium = true;
    userData.premiumExpiry = Date.now() + 365 * 24 * 60 * 60 * 1000;
    localStorage.setItem("vsm_user", JSON.stringify(userData));

    toast({
      title: "Chúc mừng! 👑",
      description: "Bạn đã nâng cấp lên Premium thành công!",
    });

    window.location.href = "/profile";
  };

  const handleSkipPremium = () => {
    window.location.href = "/profile";
  };

  const steps = [
    {
      number: 1,
      title: "Thông tin cơ bản",
      description: "Họ tên, email, số điện thoại",
    },
    {
      number: 2,
      title: "Thông tin sinh viên",
      description: "Trường đại học, ngày sinh",
    },
    { number: 3, title: "Bảo mật", description: "Mật khẩu và xác nhận" },
  ];

  if (showPremiumOffer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 flex items-center justify-center py-12 px-4">
        <Card className="max-w-lg w-full shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              🎉 Chúc mừng!
            </CardTitle>
            <p className="text-gray-600 text-lg">
              Bạn đã tham gia cộng đồng VSM thành công!
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                🚀 Ưu đãi đặc biệt cho thành viên mới!
              </h3>
              <div className="text-3xl font-bold text-vsm-orange mb-1">
                299,000đ
              </div>
              <div className="text-sm text-gray-500 line-through mb-2">
                499,000đ
              </div>
              <Badge className="bg-red-100 text-red-700">
                Giảm 40% - Chỉ hôm nay!
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Giáo án tập luyện chuyên nghiệp</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Phân tích dữ liệu nâng cao</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Voucher cửa hàng độc quyền</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Hỗ trợ ưu tiên 24/7</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handlePremiumUpgrade}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white h-12 text-lg"
              >
                <Crown className="w-5 h-5 mr-2" />
                Nâng cấp Premium ngay - 299,000đ
              </Button>

              <Button
                onClick={handleSkipPremium}
                variant="outline"
                className="w-full"
              >
                Sử dụng bản miễn phí
              </Button>
            </div>

            <div className="text-center text-xs text-gray-500 space-y-1">
              <p>⏰ Ưu đãi có hiệu lực trong 24 giờ</p>
              <p>💳 Thanh toán an toàn • 🔄 Hoàn tiền 30 ngày</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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

          <h2 className="text-3xl font-bold text-vsm-black">
            Tham gia cộng đồng
          </h2>
          <p className="mt-2 text-gray-600">
            Kết nối với hàng nghìn sinh viên đam mê chạy bộ
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.number
                    ? "bg-vsm-orange text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {currentStep > step.number ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 h-0.5 ml-2 ${
                    currentStep > step.number ? "bg-vsm-orange" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl text-center text-vsm-black">
              {steps[currentStep - 1].title}
            </CardTitle>
            <p className="text-sm text-gray-600 text-center">
              {steps[currentStep - 1].description}
            </p>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={
                currentStep === 3
                  ? handleRegister
                  : (e) => {
                      e.preventDefault();
                      handleNext();
                    }
              }
            >
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Họ và tên *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Nguyễn Văn A"
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Email sinh viên *
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
                      Số điện thoại *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="0xxx xxx xxx"
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Student Info */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Trường đại học *
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        name="university"
                        value={formData.university}
                        onChange={handleInputChange}
                        className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-vsm-orange focus:border-vsm-orange"
                        required
                      >
                        <option value="">Chọn trường đại học</option>
                        {universities.map((uni) => (
                          <option key={uni} value={uni}>
                            {uni}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Mã số sinh viên
                    </label>
                    <Input
                      type="text"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleInputChange}
                      placeholder="20210001"
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Ngày sinh *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Security */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Mật khẩu *
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
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Xác nhận mật khẩu *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-vsm-orange border-gray-300 rounded focus:ring-vsm-orange mt-0.5"
                        required
                      />
                      <span className="text-sm text-gray-600">
                        Tôi đồng ý với{" "}
                        <Link
                          to="/terms"
                          className="text-vsm-orange hover:underline"
                        >
                          Điều khoản sử dụng
                        </Link>{" "}
                        và{" "}
                        <Link
                          to="/privacy"
                          className="text-vsm-orange hover:underline"
                        >
                          Chính sách bảo mật
                        </Link>
                      </span>
                    </label>

                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="agreeMarketing"
                        checked={formData.agreeMarketing}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-vsm-orange border-gray-300 rounded focus:ring-vsm-orange mt-0.5"
                      />
                      <span className="text-sm text-gray-600">
                        Tôi muốn nhận thông tin về sự kiện và ưu đãi từ VSM
                      </span>
                    </label>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex-1 h-12"
                  >
                    Quay lại
                  </Button>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`${currentStep === 1 ? "w-full" : "flex-1"} h-12 bg-vsm-orange hover:bg-vsm-orange-dark text-white text-lg font-medium`}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Đang xử lý...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>
                        {currentStep === 3 ? "Hoàn thành đăng ký" : "Tiếp tục"}
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </Button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="text-vsm-orange hover:text-vsm-orange-dark font-medium"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Security Info */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="font-medium text-green-800">
                  Bảo mật thông tin
                </h3>
                <p className="text-sm text-green-600">
                  Thông tin của bạn được mã hóa và bảo vệ an toàn 100%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
