import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  MapPin, 
  Calendar, 
  Trophy, 
  Star,
  Heart,
  MessageCircle,
  UserPlus,
  Search,
  Filter,
  TrendingUp,
  Award,
  Target,
  Clock,
  Globe,
  GraduationCap,
  Play,
  Zap,
  Crown
} from "lucide-react";

interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  avatar: string;
  category: "university" | "location" | "interest" | "level";
  isJoined: boolean;
  isPrivate: boolean;
  recentActivity: string;
  tags: string[];
}

interface TopRunner {
  id: string;
  name: string;
  avatar: string;
  university: string;
  totalDistance: number;
  totalRuns: number;
  averagePace: string;
  rank: number;
  isPremium: boolean;
  badge: string;
}

export default function Community() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const communityGroups: CommunityGroup[] = [
    {
      id: "bk-runners",
      name: "Bách Khoa Runners",
      description: "Cộng đồng chạy bộ sinh viên Đại học Bách Khoa Hà Nội. Tham gia để kết nối với bạn bè cùng trường và tham gia các hoạt động chạy bộ hàng tuần.",
      members: 2847,
      avatar: "🎓",
      category: "university",
      isJoined: true,
      isPrivate: false,
      recentActivity: "2 giờ trước",
      tags: ["Bách Khoa", "Hà Nội", "Kỹ thuật"]
    },
    {
      id: "hcm-runners",
      name: "Saigon Student Runners",
      description: "Nhóm dành cho sinh viên các trường đại học tại TP.HCM. Chạy bộ khám phá Sài Gòn và tham gia các sự kiện lớn.",
      members: 4521,
      avatar: "🌃",
      category: "location",
      isJoined: false,
      isPrivate: false,
      recentActivity: "1 giờ trước",
      tags: ["TP.HCM", "Sài Gòn", "Sinh viên"]
    },
    {
      id: "beginners",
      name: "VSM Beginners Club",
      description: "Dành cho những người mới bắt đầu chạy bộ. Hỗ trợ, động viên và hướng dẫn từ cộng đồng thân thiện.",
      members: 8934,
      avatar: "🌱",
      category: "level",
      isJoined: false,
      isPrivate: false,
      recentActivity: "30 phút trước",
      tags: ["Người mới", "Hướng dẫn", "Hỗ trợ"]
    },
    {
      id: "marathon-prep",
      name: "Marathon Preparation",
      description: "Nhóm chuẩn bị cho VSM Marathon 2025. Chia sẻ kinh nghiệm, kế hoạch tập luyện và động viên lẫn nhau.",
      members: 1256,
      avatar: "🏃‍♂️",
      category: "interest",
      isJoined: true,
      isPrivate: false,
      recentActivity: "15 phút trước",
      tags: ["Marathon", "Tập luyện", "42K"]
    },
    {
      id: "early-birds",
      name: "Early Birds Running",
      description: "Dành cho những người thích chạy bộ vào buổi sáng sớm. Thức dậy cùng nhau và bắt đầu ngày mới với năng lượng tích cực!",
      members: 672,
      avatar: "🌅",
      category: "interest",
      isJoined: false,
      isPrivate: false,
      recentActivity: "4 giờ trước",
      tags: ["Sáng sớm", "5AM Club", "Năng lượng"]
    },
    {
      id: "elite-runners",
      name: "Elite VSM Runners",
      description: "Nhóm riêng cho những runner có thành tích xuất sắc. Yêu cầu pace dưới 4:30/km để tham gia.",
      members: 89,
      avatar: "⚡",
      category: "level",
      isJoined: false,
      isPrivate: true,
      recentActivity: "6 giờ trước",
      tags: ["Elite", "Sub 4:30", "Chuyên nghiệp"]
    }
  ];

  const topRunners: TopRunner[] = [
    {
      id: "1",
      name: "Duc Minh Tran",
      avatar: "DM",
      university: "ĐH Thể thao Hà Nội",
      totalDistance: 1247.5,
      totalRuns: 156,
      averagePace: "4:12",
      rank: 1,
      isPremium: true,
      badge: "Marathon King"
    },
    {
      id: "2",
      name: "Thu Ha Nguyen",
      avatar: "TH",
      university: "ĐH Y Hà Nội",
      totalDistance: 1156.8,
      totalRuns: 143,
      averagePace: "4:28",
      rank: 2,
      isPremium: true,
      badge: "Speed Queen"
    },
    {
      id: "3",
      name: "Long Vu Hoang",
      avatar: "LV",
      university: "ĐH Bách Khoa Hà Nội",
      totalDistance: 1089.2,
      totalRuns: 134,
      averagePace: "4:35",
      rank: 3,
      isPremium: false,
      badge: "Consistency Master"
    },
    {
      id: "4",
      name: "Minh Anh Le",
      avatar: "MA",
      university: "ĐH Kinh tế Quốc dân",
      totalDistance: 987.6,
      totalRuns: 128,
      averagePace: "4:42",
      rank: 4,
      isPremium: true,
      badge: "Distance Champion"
    },
    {
      id: "5",
      name: "Duc Huy Pham",
      avatar: "DH",
      university: "ĐH Ngoại thương",
      totalDistance: 934.1,
      totalRuns: 121,
      averagePace: "4:56",
      rank: 5,
      isPremium: false,
      badge: "Rising Star"
    }
  ];

  const categories = [
    { id: "all", label: "Tất cả", icon: Users },
    { id: "university", label: "Trường ĐH", icon: GraduationCap },
    { id: "location", label: "Địa phương", icon: MapPin },
    { id: "interest", label: "Sở thích", icon: Heart },
    { id: "level", label: "Trình độ", icon: Target }
  ];

  const filteredGroups = communityGroups.filter(group => {
    const matchesCategory = selectedCategory === "all" || group.category === selectedCategory;
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const joinGroup = (groupId: string) => {
    // Mock join group functionality
    console.log(`Joining group: ${groupId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <Users className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cộng đồng VSM
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Kết nối với hàng nghìn sinh viên đam mê chạy bộ trên toàn quốc
            </p>
            
            {/* Community Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">25,847</div>
                <div className="text-sm opacity-80">Thành viên</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">156</div>
                <div className="text-sm opacity-80">Nhóm hoạt động</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">63</div>
                <div className="text-sm opacity-80">Tỉnh thành</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">1,247</div>
                <div className="text-sm opacity-80">Sự kiện/tháng</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Search and Filters */}
            <Card className="mb-8 -mt-20 relative z-10 shadow-xl">
              <CardHeader>
                <CardTitle>Tìm kiếm nhóm</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm nhóm theo tên, mô tả..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 h-12 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category.id)}
                          className={selectedCategory === category.id ? "bg-purple-600 hover:bg-purple-700" : ""}
                        >
                          <IconComponent className="w-4 h-4 mr-1" />
                          {category.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Groups List */}
            <div className="space-y-6">
              {filteredGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                        {group.avatar}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-1">{group.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{group.members.toLocaleString()} thành viên</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>Hoạt động {group.recentActivity}</span>
                              </div>
                              {group.isPrivate && (
                                <Badge variant="outline" className="border-yellow-300 text-yellow-700">
                                  <Crown className="w-3 h-3 mr-1" />
                                  Riêng tư
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <Button
                            onClick={() => joinGroup(group.id)}
                            disabled={group.isJoined}
                            className={group.isJoined 
                              ? "bg-green-100 text-green-700 hover:bg-green-100" 
                              : "bg-purple-600 hover:bg-purple-700 text-white"
                            }
                          >
                            {group.isJoined ? (
                              <>
                                <Users className="w-4 h-4 mr-1" />
                                Đã tham gia
                              </>
                            ) : (
                              <>
                                <UserPlus className="w-4 h-4 mr-1" />
                                Tham gia
                              </>
                            )}
                          </Button>
                        </div>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {group.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {group.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Runners */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                  Top Runners tháng này
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topRunners.map((runner) => (
                  <div key={runner.id} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      runner.rank === 1 ? 'bg-yellow-500 text-white' :
                      runner.rank === 2 ? 'bg-gray-400 text-white' :
                      runner.rank === 3 ? 'bg-amber-600 text-white' :
                      'bg-gray-200 text-gray-700'
                    }`}>
                      {runner.rank}
                    </div>
                    
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-purple-100 text-purple-700 font-semibold">
                        {runner.avatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1">
                        <p className="font-medium text-gray-800 truncate">{runner.name}</p>
                        {runner.isPremium && (
                          <Crown className="w-3 h-3 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{runner.university}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <span>{runner.totalDistance.toLocaleString()}km</span>
                        <span>•</span>
                        <span>{runner.averagePace}/km</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-4">
                  Xem bảng xếp hạng đầy đủ
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-purple-500" />
                  Thống kê cộng đồng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Hoạt động hôm nay</span>
                  <span className="font-semibold text-purple-600">2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Km đã chạy tuần này</span>
                  <span className="font-semibold text-purple-600">45,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Thành viên mới</span>
                  <span className="font-semibold text-purple-600">+156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sự kiện sắp tới</span>
                  <span className="font-semibold text-purple-600">12</span>
                </div>
              </CardContent>
            </Card>

            {/* Create Group CTA */}
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-purple-800 mb-2">Tạo nhóm riêng</h3>
                <p className="text-sm text-purple-600 mb-4">
                  Tạo cộng đồng cho trường hoặc khu vực của bạn
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Tạo nhóm mới
                </Button>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Hashtag phổ biến
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "#VSMMarathon2025",
                    "#BachKhoaRunners", 
                    "#SaigonRunners",
                    "#EarlyBirds",
                    "#MarathonPrep",
                    "#BeginnerFriendly",
                    "#StudentRunners",
                    "#5AMClub"
                  ].map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs hover:bg-purple-50 cursor-pointer">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Join Community CTA */}
        <Card className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
          <CardContent className="p-12 text-center">
            <Users className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">
              Tham gia cộng đồng VSM ngay hôm nay!
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Kết nối với hàng nghìn sinh viên cùng đam mê, chia sẻ kinh nghiệm và cùng nhau tiến bộ trong hành trình chạy bộ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3">
                <UserPlus className="w-5 h-5 mr-2" />
                Đăng ký ngay
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3">
                Tìm hiểu thêm
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
