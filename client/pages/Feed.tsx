import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  Clock,
  Zap,
  Flame,
  Trophy,
  Camera,
  Play,
  Pause,
  MoreHorizontal,
  ThumbsUp,
  Star,
  TrendingUp,
  Users,
  Target,
  Award,
  ChevronRight,
  Calendar,
  Route,
} from "lucide-react";

interface Activity {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    university: string;
    isPremium: boolean;
  };
  type: "run" | "achievement" | "event" | "challenge";
  title: string;
  description?: string;
  timestamp: number;
  data: {
    distance?: number;
    duration?: string;
    pace?: string;
    calories?: number;
    elevation?: number;
    route?: string;
    photos?: string[];
    achievement?: string;
    event?: string;
  };
  likes: number;
  comments: number;
  isLiked: boolean;
  location?: string;
  weather?: string;
  kudos: { id: string; name: string; avatar: string }[];
}

interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  endDate: string;
  participants: number;
  prize: string;
  icon: string;
}

export default function Feed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [weeklyChallenge, setWeeklyChallenge] =
    useState<WeeklyChallenge | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    loadActivities();
    loadWeeklyChallenge();
  }, []);

  const loadActivities = () => {
    const mockActivities: Activity[] = [
      {
        id: "1",
        user: {
          id: "user_1",
          name: "Thành Long Nguyen",
          avatar: "TL",
          university: "Đại học Bách Khoa Hà Nội",
          isPremium: true,
        },
        type: "run",
        title: "Morning Run tại Hồ Gươm",
        description:
          "Buổi sáng tuyệt vời với không khí trong lành! Pace tốt hơn hôm qua 💪",
        timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
        data: {
          distance: 8.2,
          duration: "42:18",
          pace: "5:10",
          calories: 445,
          elevation: 125,
          route: "Hồ Gươm Circuit",
          photos: ["📸", "🌅"],
        },
        likes: 24,
        comments: 8,
        isLiked: false,
        location: "Hà Nội, Việt Nam",
        weather: "Sunny 22°C",
        kudos: [
          { id: "1", name: "Minh Anh", avatar: "MA" },
          { id: "2", name: "Duc Huy", avatar: "DH" },
          { id: "3", name: "Thu Ha", avatar: "TH" },
        ],
      },
      {
        id: "2",
        user: {
          id: "user_2",
          name: "Minh Anh Tran",
          avatar: "MA",
          university: "Đại học Kinh tế Quốc dân",
          isPremium: false,
        },
        type: "achievement",
        title: "Đạt thành tích Personal Best!",
        description:
          "Vừa phá kỷ lục cá nhân 5K với thời gian 23:45! Không thể tin đư���c 🎉",
        timestamp: Date.now() - 6 * 60 * 60 * 1000, // 6 hours ago
        data: {
          distance: 5.0,
          duration: "23:45",
          pace: "4:45",
          achievement: "5K Personal Best",
        },
        likes: 67,
        comments: 15,
        isLiked: true,
        location: "Hà Nội",
        kudos: [],
      },
      {
        id: "3",
        user: {
          id: "user_3",
          name: "Duc Huy Le",
          avatar: "DH",
          university: "Đại học Y Hà Nội",
          isPremium: true,
        },
        type: "run",
        title: "Long Run Preparation",
        description: "Chuẩn bị cho VSM Marathon 2025. Cảm thấy sẵn sàng! 🏃‍♂️",
        timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
        data: {
          distance: 15.5,
          duration: "1:18:32",
          pace: "5:04",
          calories: 892,
          elevation: 340,
          route: "Mỹ Đình - Cầu Nhật Tân",
          photos: ["🌉", "🏃‍♂️"],
        },
        likes: 45,
        comments: 12,
        isLiked: false,
        location: "Hà Nội",
        weather: "Cloudy 19°C",
        kudos: [],
      },
      {
        id: "4",
        user: {
          id: "user_4",
          name: "Thu Ha Nguyen",
          avatar: "TH",
          university: "Đại học Ngoại thương",
          isPremium: false,
        },
        type: "event",
        title: "Đăng ký VSM Night Run HCM",
        description:
          "Không thể bỏ lỡ cơ hội khám phá Sài Gòn về đêm! Ai cùng tham gia không? 🌃",
        timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
        data: {
          event: "VSM Night Run Ho Chi Minh",
        },
        likes: 23,
        comments: 18,
        isLiked: true,
        location: "TP. Hồ Chí Minh",
        kudos: [],
      },
      {
        id: "5",
        user: {
          id: "user_5",
          name: "Hoang Nam Vu",
          avatar: "HN",
          university: "Đại học Công nghệ",
          isPremium: true,
        },
        type: "challenge",
        title: "Hoàn thành Weekly Challenge",
        description: "50km trong tuần! Mục tiêu tiếp theo: 60km 💪",
        timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
        data: {
          distance: 52.3,
          achievement: "Weekly 50K Challenge",
        },
        likes: 38,
        comments: 9,
        isLiked: false,
        kudos: [],
      },
    ];

    setActivities(mockActivities);
  };

  const loadWeeklyChallenge = () => {
    setWeeklyChallenge({
      id: "challenge_1",
      title: "December Running Challenge",
      description: "Chạy tổng cộng 100km trong tháng 12",
      target: 100,
      current: 67.5,
      unit: "km",
      endDate: "2024-12-31",
      participants: 2847,
      prize: "Áo thun VSM Limited Edition",
      icon: "🏆",
    });
  };

  const likeActivity = (activityId: string) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === activityId
          ? {
              ...activity,
              isLiked: !activity.isLiked,
              likes: activity.isLiked ? activity.likes - 1 : activity.likes + 1,
            }
          : activity,
      ),
    );
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "run":
        return MapPin;
      case "achievement":
        return Trophy;
      case "event":
        return Calendar;
      case "challenge":
        return Target;
      default:
        return Play;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "run":
        return "text-blue-600";
      case "achievement":
        return "text-yellow-600";
      case "event":
        return "text-purple-600";
      case "challenge":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} ngày trước`;
    if (hours > 0) return `${hours} giờ trước`;
    return "Vừa xong";
  };

  const filterOptions = [
    { value: "all", label: "Tất cả" },
    { value: "run", label: "Chạy bộ" },
    { value: "achievement", label: "Thành tích" },
    { value: "event", label: "Sự kiện" },
    { value: "challenge", label: "Thử thách" },
  ];

  const filteredActivities = activities.filter(
    (activity) => filter === "all" || activity.type === filter,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-vsm-black flex items-center">
                <TrendingUp className="w-8 h-8 mr-3 text-vsm-orange" />
                Activity Feed
              </h1>
              <p className="text-vsm-gray-medium">
                Theo dõi hoạt động và thành tích của cộng đồng VSM
              </p>
            </div>

            <Button className="bg-vsm-orange hover:bg-vsm-orange-dark text-white">
              <Camera className="w-5 h-5 mr-2" />
              Chia sẻ hoạt động
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-3">
            {/* Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={filter === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(option.value)}
                  className={
                    filter === option.value
                      ? "bg-vsm-orange hover:bg-vsm-orange-dark"
                      : ""
                  }
                >
                  {option.label}
                </Button>
              ))}
            </div>

            {/* Activities */}
            <div className="space-y-6">
              {filteredActivities.map((activity) => {
                const IconComponent = getActivityIcon(activity.type);
                return (
                  <Card
                    key={activity.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-vsm-orange text-white font-semibold">
                              {activity.user.avatar}
                            </AvatarFallback>
                          </Avatar>

                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-vsm-black">
                                {activity.user.name}
                              </h3>
                              {activity.user.isPremium && (
                                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs">
                                  <Star className="w-3 h-3 mr-1" />
                                  Premium
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              {activity.user.university}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <IconComponent
                                className={`w-4 h-4 ${getActivityColor(activity.type)}`}
                              />
                              <span className="text-sm text-gray-600">
                                {formatTimeAgo(activity.timestamp)}
                              </span>
                              {activity.location && (
                                <>
                                  <span className="text-gray-400">•</span>
                                  <span className="text-sm text-gray-600">
                                    {activity.location}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="mb-4">
                        <h4 className="font-semibold text-lg text-vsm-black mb-2">
                          {activity.title}
                        </h4>
                        {activity.description && (
                          <p className="text-gray-600 mb-3">
                            {activity.description}
                          </p>
                        )}
                      </div>

                      {/* Activity Stats */}
                      {activity.type === "run" && activity.data.distance && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-vsm-orange">
                                {activity.data.distance}
                              </div>
                              <div className="text-xs text-gray-500">km</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-vsm-orange">
                                {activity.data.duration}
                              </div>
                              <div className="text-xs text-gray-500">
                                thời gian
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-vsm-orange">
                                {activity.data.pace}
                              </div>
                              <div className="text-xs text-gray-500">pace</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-vsm-orange">
                                {activity.data.calories}
                              </div>
                              <div className="text-xs text-gray-500">calo</div>
                            </div>
                          </div>

                          {activity.data.route && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <div className="flex items-center text-sm text-gray-600">
                                <Route className="w-4 h-4 mr-2 text-vsm-orange" />
                                <span className="font-medium">
                                  {activity.data.route}
                                </span>
                                {activity.weather && (
                                  <>
                                    <span className="mx-2">•</span>
                                    <span>{activity.weather}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Achievement Stats */}
                      {activity.type === "achievement" && (
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 mb-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <Trophy className="w-6 h-6 text-yellow-600" />
                                <span className="font-semibold text-yellow-800">
                                  {activity.data.achievement}
                                </span>
                              </div>
                              {activity.data.distance &&
                                activity.data.duration && (
                                  <div className="text-sm text-gray-600">
                                    {activity.data.distance}km trong{" "}
                                    {activity.data.duration} (pace:{" "}
                                    {activity.data.pace})
                                  </div>
                                )}
                            </div>
                            <div className="text-4xl">🏆</div>
                          </div>
                        </div>
                      )}

                      {/* Photos */}
                      {activity.data.photos &&
                        activity.data.photos.length > 0 && (
                          <div className="flex space-x-2 mb-4">
                            {activity.data.photos.map((photo, index) => (
                              <div
                                key={index}
                                className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-2xl"
                              >
                                {photo}
                              </div>
                            ))}
                          </div>
                        )}

                      {/* Kudos */}
                      {activity.kudos.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center space-x-2">
                            <div className="flex -space-x-2">
                              {activity.kudos.slice(0, 3).map((kudo) => (
                                <Avatar
                                  key={kudo.id}
                                  className="w-6 h-6 border-2 border-white"
                                >
                                  <AvatarFallback className="text-xs bg-vsm-orange text-white">
                                    {kudo.avatar}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              {activity.kudos
                                .slice(0, 2)
                                .map((k) => k.name)
                                .join(", ")}
                              {activity.kudos.length > 2 &&
                                ` và ${activity.kudos.length - 2} người khác`}{" "}
                              đã like
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center space-x-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => likeActivity(activity.id)}
                            className={
                              activity.isLiked
                                ? "text-red-500 hover:text-red-600"
                                : "text-gray-500 hover:text-red-500"
                            }
                          >
                            <Heart
                              className={`w-4 h-4 mr-1 ${activity.isLiked ? "fill-current" : ""}`}
                            />
                            <span>{activity.likes}</span>
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-vsm-orange"
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            <span>{activity.comments}</span>
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-vsm-orange"
                          >
                            <Share2 className="w-4 h-4 mr-1" />
                            Chia sẻ
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-vsm-orange hover:text-vsm-orange-dark"
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          Kudos
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Challenge */}
            {weeklyChallenge && (
              <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
                <CardHeader>
                  <h3 className="font-semibold text-purple-800 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Thử thách tuần này
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{weeklyChallenge.icon}</div>
                    <h4 className="font-semibold text-purple-800">
                      {weeklyChallenge.title}
                    </h4>
                    <p className="text-sm text-purple-600 mt-1">
                      {weeklyChallenge.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Tiến độ</span>
                      <span className="font-semibold">
                        {weeklyChallenge.current}/{weeklyChallenge.target}{" "}
                        {weeklyChallenge.unit}
                      </span>
                    </div>

                    <div className="w-full bg-purple-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full"
                        style={{
                          width: `${(weeklyChallenge.current / weeklyChallenge.target) * 100}%`,
                        }}
                      ></div>
                    </div>

                    <div className="text-center">
                      <div className="text-xs text-purple-600">
                        {weeklyChallenge.participants.toLocaleString()} người
                        tham gia
                      </div>
                      <div className="text-xs text-purple-600 mt-1">
                        Phần thưởng: {weeklyChallenge.prize}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-vsm-black">
                  Thống kê của bạn
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-vsm-orange" />
                    <span className="text-sm">Tuần này</span>
                  </div>
                  <span className="font-semibold">23.5 km</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-vsm-orange" />
                    <span className="text-sm">Thời gian</span>
                  </div>
                  <span className="font-semibold">2h 15m</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-vsm-orange" />
                    <span className="text-sm">Pace TB</span>
                  </div>
                  <span className="font-semibold">5:45/km</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-vsm-orange" />
                    <span className="text-sm">Thành tích</span>
                  </div>
                  <span className="font-semibold">12</span>
                </div>
              </CardContent>
            </Card>

            {/* Trending */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-vsm-black flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-vsm-orange" />
                  Trending
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">#VSMMarathon2025</div>
                    <div className="text-xs text-gray-500">2.5k hoạt động</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">#NightRunHCM</div>
                    <div className="text-xs text-gray-500">890 hoạt động</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">#StudentRunner</div>
                    <div className="text-xs text-gray-500">1.2k hoạt động</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
