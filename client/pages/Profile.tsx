import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  MapPin,
  Calendar,
  Trophy,
  Users,
  Settings,
  LogOut,
  Timer,
  Target,
  TrendingUp,
  Award,
  Crown,
  Gift,
  BookOpen,
  Zap,
  Lock,
  Check,
  Star,
  Ticket,
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  premiumExpiry?: number;
  totalDistance: number;
  totalRuns: number;
  joinedDate: number;
}

interface TrainingPlan {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  weeks: number;
  isPremium: boolean;
}

interface Voucher {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minimumAmount?: number;
  expiryDate: number;
  category?: string;
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [trainingPlans, setTrainingPlans] = useState<TrainingPlan[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [runHistory, setRunHistory] = useState<any[]>([]);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchUserProfile();
    fetchTrainingPlans();
    fetchVouchers();
    fetchRunHistory();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      const response = await fetch(`${apiUrl}/api/user/user_1`);

      if (!response.ok) {
        // Use mock user data if backend not available
        setUser({
          id: "user_1",
          name: "Nguyễn Văn A",
          email: "user@vsm.vn",
          university: "Đại học Kinh tế TP.HCM",
          studentId: "1234567",
          isPremium: false,
          joinDate: Date.now() - 86400000 * 30
        });
        return;
      }

      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      // Use mock user data on error
      setUser({
        id: "user_1",
        name: "Nguyễn Văn A",
        email: "user@vsm.vn",
        university: "Đại học Kinh tế TP.HCM",
        studentId: "1234567",
        isPremium: false,
        joinDate: Date.now() - 86400000 * 30
      });
    }
  };

  const fetchTrainingPlans = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      const response = await fetch(`${apiUrl}/api/training-plans/user_1`);

      if (!response.ok) {
        setTrainingPlans([]);
        return;
      }

      const data = await response.json();
      setTrainingPlans(data.plans || []);
    } catch (error) {
      setTrainingPlans([]);
    }
  };

  const fetchVouchers = async () => {
    try {
      const response = await fetch("/api/vouchers/user_1");
      const data = await response.json();
      setVouchers(data.vouchers);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    }
  };

  const fetchRunHistory = async () => {
    try {
      const response = await fetch("/api/run/history/user_1");
      const data = await response.json();
      setRunHistory(data.sessions || []);
    } catch (error) {
      console.error("Error fetching run history:", error);
    }
  };

  const upgradeToPremium = async () => {
    setIsUpgrading(true);
    try {
      const response = await fetch("/api/user/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "user_1" }),
      });

      const data = await response.json();
      setUser(data.user);
      setVouchers(data.vouchers);

      // Refresh training plans to show newly available ones
      fetchTrainingPlans();

      toast({
        title: "🎉 Chúc mừng!",
        description:
          "Bạn đã unlock thành công tài khoản Premium! Nhận ngay 2 voucher khuyến mãi.",
      });
    } catch (error) {
      toast({
        title: "Lỗi upgrade",
        description: "Không thể nâng cấp tài khoản. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsUpgrading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "Advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatVoucherValue = (voucher: Voucher) => {
    if (voucher.discountType === "percentage") {
      return `${voucher.discountValue}%`;
    } else {
      return `${voucher.discountValue.toLocaleString()}đ`;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vsm-orange mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  const userStats = {
    totalDistance: user.totalDistance.toString(),
    totalTime: "42h 18m",
    averagePace: "5:45",
    totalRuns: user.totalRuns,
    achievements: 12,
    rank: user.isPremium ? "Premium Runner" : "Standard Runner",
  };

  const achievements = [
    {
      id: 1,
      title: "First Run",
      description: "Hoàn thành buổi chạy đầu tiên",
      icon: "🏃‍♂️",
      earned: true,
      date: "2024-10-15",
    },
    {
      id: 2,
      title: "Speed Demon",
      description: "Đạt pace dưới 5:00/km",
      icon: "⚡",
      earned: true,
      date: "2024-11-22",
    },
    {
      id: 3,
      title: "Marathon Warrior",
      description: "Chạy tổng cộng 100km",
      icon: "🏆",
      earned: true,
      date: "2024-12-01",
    },
    {
      id: 4,
      title: "Consistency King",
      description: "Chạy 7 ngày liên tiếp",
      icon: "📅",
      earned: false,
      date: null,
    },
  ];

  const joinedGroups = [
    {
      id: 1,
      name: "VSM Hà Nội",
      members: 1240,
      avatar: "🏃‍♂️",
      role: "Thành viên",
    },
    {
      id: 2,
      name: "Sinh viên Bách Khoa",
      members: 580,
      avatar: "🎓",
      role: "Admin",
    },
    {
      id: 3,
      name: "Early Birds Runners",
      members: 320,
      avatar: "🌅",
      role: "Thành viên",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="" />
              <AvatarFallback className="text-2xl bg-vsm-orange text-white">
                TL
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-vsm-black">
                    {user.name}
                  </h1>
                  <p className="text-vsm-gray-medium flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    Hà Nội, Việt Nam
                  </p>
                  <p className="text-vsm-gray-medium flex items-center mt-1">
                    <User className="w-4 h-4 mr-1" />
                    Đại học Bách Khoa Hà Nội
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      user.isPremium
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }
                  >
                    {user.isPremium ? (
                      <>
                        <Crown className="w-4 h-4 mr-1" />
                        {userStats.rank}
                      </>
                    ) : (
                      <>
                        <Trophy className="w-4 h-4 mr-1" />
                        {userStats.rank}
                      </>
                    )}
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-700">
                    Tham gia từ{" "}
                    {new Date(user.joinedDate).toLocaleDateString("vi-VN", {
                      month: "short",
                      year: "numeric",
                    })}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Cài đặt
              </Button>
              <Button
                variant="outline"
                className="text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <MapPin className="w-6 h-6 text-vsm-orange mx-auto mb-2" />
              <div className="text-2xl font-bold text-vsm-black">
                {userStats.totalDistance}
              </div>
              <div className="text-sm text-gray-500">km</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Timer className="w-6 h-6 text-vsm-orange mx-auto mb-2" />
              <div className="text-2xl font-bold text-vsm-black">
                {userStats.totalTime}
              </div>
              <div className="text-sm text-gray-500">thời gian</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 text-vsm-orange mx-auto mb-2" />
              <div className="text-2xl font-bold text-vsm-black">
                {userStats.averagePace}
              </div>
              <div className="text-sm text-gray-500">pace TB</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 text-vsm-orange mx-auto mb-2" />
              <div className="text-2xl font-bold text-vsm-black">
                {userStats.totalRuns}
              </div>
              <div className="text-sm text-gray-500">buổi chạy</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Award className="w-6 h-6 text-vsm-orange mx-auto mb-2" />
              <div className="text-2xl font-bold text-vsm-black">
                {userStats.achievements}
              </div>
              <div className="text-sm text-gray-500">thành tích</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 text-vsm-orange mx-auto mb-2" />
              <div className="text-2xl font-bold text-vsm-black">3</div>
              <div className="text-sm text-gray-500">nhóm</div>
            </CardContent>
          </Card>
        </div>

        {/* Premium Upgrade Section */}
        {!user.isPremium && (
          <Card className="mb-8 border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardContent className="p-8">
              <div className="text-center">
                <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-vsm-black mb-2">
                  Unlock Tài Khoản Premium
                </h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Nâng cấp lên Premium để nhận các giáo án chạy bộ chuyên
                  nghiệp, voucher độc quyền, và nhiều tính năng cao cấp khác từ
                  VSM.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <BookOpen className="w-8 h-8 text-vsm-orange mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">
                      Giáo án chuyên nghiệp
                    </h3>
                    <p className="text-sm text-gray-600">
                      Các chương trình tập luyện từ HLV chuyên nghiệp
                    </p>
                  </div>
                  <div className="text-center">
                    <Gift className="w-8 h-8 text-vsm-orange mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Voucher độc quyền</h3>
                    <p className="text-sm text-gray-600">
                      Giảm giá đặc biệt cho sản phẩm VSM
                    </p>
                  </div>
                  <div className="text-center">
                    <Zap className="w-8 h-8 text-vsm-orange mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Tính năng cao cấp</h3>
                    <p className="text-sm text-gray-600">
                      Phân tích nâng cao và báo cáo chi tiết
                    </p>
                  </div>
                </div>

                <Button
                  onClick={upgradeToPremium}
                  disabled={isUpgrading}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white px-8 py-3 text-lg"
                >
                  {isUpgrading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <Crown className="w-5 h-5 mr-2" />
                      Unlock Premium Ngay
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <Tabs defaultValue="runs" className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-5">
            <TabsTrigger value="runs">Lịch sử</TabsTrigger>
            <TabsTrigger value="training">Giáo án</TabsTrigger>
            <TabsTrigger value="vouchers">Voucher</TabsTrigger>
            <TabsTrigger value="achievements">Thành tích</TabsTrigger>
            <TabsTrigger value="groups">Nhóm</TabsTrigger>
          </TabsList>

          <TabsContent value="runs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lịch sử chạy bộ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {runHistory.map((run, index) => (
                    <div
                      key={run.id || index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-vsm-orange rounded-lg flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-vsm-black">
                            {run.distance} km
                          </div>
                          <div className="text-sm text-gray-500">
                            GPS Tracking
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(run.date).toLocaleDateString("vi-VN")}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold">{run.duration}</div>
                        <div className="text-sm text-gray-500">
                          {run.pace}/km
                        </div>
                        <div className="text-xs text-gray-400">
                          {run.calories} calo
                        </div>
                      </div>
                    </div>
                  ))}

                  {runHistory.length === 0 && (
                    <div className="text-center py-8">
                      <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">
                        Chưa có hoạt động chạy bộ nào
                      </p>
                    </div>
                  )}
                </div>

                {runHistory.length > 0 && (
                  <div className="mt-6 text-center">
                    <Button variant="outline" className="w-full md:w-auto">
                      Xem thêm
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Giáo án tập luyện
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {trainingPlans.map((plan) => (
                    <Card
                      key={plan.id}
                      className={`relative ${plan.isPremium && !user.isPremium ? "opacity-60" : ""}`}
                    >
                      <CardContent className="p-6">
                        {plan.isPremium && !user.isPremium && (
                          <div className="absolute top-4 right-4">
                            <Lock className="w-5 h-5 text-gray-400" />
                          </div>
                        )}

                        <div className="flex items-start justify-between mb-4">
                          <Badge
                            className={getDifficultyColor(plan.difficulty)}
                          >
                            {plan.difficulty}
                          </Badge>
                          {plan.isPremium && (
                            <Badge className="bg-yellow-100 text-yellow-700">
                              <Crown className="w-3 h-3 mr-1" />
                              Premium
                            </Badge>
                          )}
                        </div>

                        <h3 className="text-xl font-bold text-vsm-black mb-2">
                          {plan.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{plan.description}</p>

                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-gray-500">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            {plan.duration}
                          </span>
                          <span className="text-sm text-gray-500">
                            {plan.weeks} tuần
                          </span>
                        </div>

                        <Button
                          className={`w-full ${
                            plan.isPremium && !user.isPremium
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-vsm-orange hover:bg-vsm-orange-dark"
                          } text-white`}
                          disabled={plan.isPremium && !user.isPremium}
                        >
                          {plan.isPremium && !user.isPremium ? (
                            <>
                              <Lock className="w-4 h-4 mr-2" />
                              Cần Premium
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Bắt đầu giáo án
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {!user.isPremium && (
                  <div className="text-center mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                    <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Unlock thêm nhiều giáo án chuyên nghiệp
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Nâng cấp lên Premium để truy cập đầy đủ các chương trình
                      tập luyện từ HLV chuyên nghiệp
                    </p>
                    <Button
                      onClick={upgradeToPremium}
                      className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Nâng cấp Premium
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vouchers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Ticket className="w-5 h-5 mr-2" />
                  Voucher của tôi
                </CardTitle>
              </CardHeader>
              <CardContent>
                {vouchers.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {vouchers.map((voucher) => (
                      <Card
                        key={voucher.id}
                        className="border-2 border-dashed border-vsm-orange bg-gradient-to-r from-orange-50 to-yellow-50"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-bold text-vsm-black">
                                {voucher.title}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {voucher.description}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-vsm-orange">
                                {formatVoucherValue(voucher)}
                              </div>
                              <div className="text-xs text-gray-500">
                                Giảm giá
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-gray-200 pt-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">
                                Mã: <strong>{voucher.code}</strong>
                              </span>
                              <span className="text-gray-600">
                                HSD:{" "}
                                {new Date(
                                  voucher.expiryDate,
                                ).toLocaleDateString("vi-VN")}
                              </span>
                            </div>
                            {voucher.minimumAmount && (
                              <p className="text-xs text-gray-500 mt-2">
                                Đơn hàng tối thiểu:{" "}
                                {voucher.minimumAmount.toLocaleString()}đ
                              </p>
                            )}
                          </div>

                          <Button className="w-full mt-4 bg-vsm-orange hover:bg-vsm-orange-dark text-white">
                            <Gift className="w-4 h-4 mr-2" />
                            Sử dụng ngay
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Ticket className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">
                      Bạn chưa có voucher nào
                    </p>
                    {!user.isPremium && (
                      <Button
                        onClick={upgradeToPremium}
                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white"
                      >
                        <Crown className="w-4 h-4 mr-2" />
                        Unlock Premium để nhận voucher
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thành tích đã đạt được</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border-2 ${
                        achievement.earned
                          ? "border-vsm-orange bg-vsm-orange/5"
                          : "border-gray-200 bg-gray-50 opacity-50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div>
                          <h3 className="font-semibold text-vsm-black">
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {achievement.description}
                          </p>
                          {achievement.earned && achievement.date && (
                            <p className="text-xs text-vsm-orange mt-1">
                              Đạt được:{" "}
                              {new Date(achievement.date).toLocaleDateString(
                                "vi-VN",
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="groups" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nhóm đã tham gia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {joinedGroups.map((group) => (
                    <div
                      key={group.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-vsm-orange to-vsm-orange-dark rounded-lg flex items-center justify-center text-2xl">
                          {group.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-vsm-black">
                            {group.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {group.members.toLocaleString()} thành viên
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Badge
                          variant={
                            group.role === "Admin" ? "default" : "secondary"
                          }
                        >
                          {group.role}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Xem nhóm
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Button className="bg-vsm-orange hover:bg-vsm-orange-dark text-white">
                    <Users className="w-4 h-4 mr-2" />
                    Tìm nhóm mới
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
