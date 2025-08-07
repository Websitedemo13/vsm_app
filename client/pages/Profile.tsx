import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Award
} from "lucide-react";

export default function Profile() {
  const userStats = {
    totalDistance: "284.5",
    totalTime: "42h 18m",
    averagePace: "5:45",
    totalRuns: 47,
    achievements: 12,
    rank: "Gold Runner"
  };

  const recentRuns = [
    {
      id: 1,
      date: "2024-12-10",
      distance: "5.2 km",
      time: "28:15",
      pace: "5:25/km",
      calories: 280,
      route: "Công viên Tào Đàn"
    },
    {
      id: 2,
      date: "2024-12-08", 
      distance: "3.8 km",
      time: "22:45",
      pace: "5:59/km",
      calories: 205,
      route: "Hồ Gươm"
    },
    {
      id: 3,
      date: "2024-12-06",
      distance: "7.1 km",
      time: "42:18", 
      pace: "5:57/km",
      calories: 385,
      route: "Công viên Thống Nhất"
    },
    {
      id: 4,
      date: "2024-12-04",
      distance: "4.5 km",
      time: "26:32",
      pace: "5:54/km",
      calories: 245,
      route: "Đại học Bách Khoa"
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "First Run",
      description: "Hoàn thành buổi chạy đầu tiên",
      icon: "🏃‍♂️",
      earned: true,
      date: "2024-10-15"
    },
    {
      id: 2,
      title: "Speed Demon",
      description: "Đạt pace dưới 5:00/km",
      icon: "⚡",
      earned: true,
      date: "2024-11-22"
    },
    {
      id: 3,
      title: "Marathon Warrior",
      description: "Chạy tổng cộng 100km",
      icon: "🏆",
      earned: true,
      date: "2024-12-01"
    },
    {
      id: 4,
      title: "Consistency King",
      description: "Chạy 7 ngày liên tiếp",
      icon: "📅",
      earned: false,
      date: null
    }
  ];

  const joinedGroups = [
    {
      id: 1,
      name: "VSM Hà Nội",
      members: 1240,
      avatar: "🏃‍♂️",
      role: "Thành viên"
    },
    {
      id: 2,
      name: "Sinh viên Bách Khoa",
      members: 580,
      avatar: "🎓",
      role: "Admin"
    },
    {
      id: 3,
      name: "Early Birds Runners",
      members: 320,
      avatar: "🌅",
      role: "Thành viên"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="" />
              <AvatarFallback className="text-2xl bg-vsm-orange text-white">TL</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-vsm-black">Thành Long Nguyen</h1>
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
                  <Badge className="bg-yellow-100 text-yellow-700">
                    <Trophy className="w-4 h-4 mr-1" />
                    {userStats.rank}
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-700">
                    Tham gia từ 10/2024
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Cài đặt
              </Button>
              <Button variant="outline" className="text-red-600 hover:text-red-700">
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
              <div className="text-2xl font-bold text-vsm-black">{userStats.totalDistance}</div>
              <div className="text-sm text-gray-500">km</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Timer className="w-6 h-6 text-vsm-orange mx-auto mb-2" />
              <div className="text-2xl font-bold text-vsm-black">{userStats.totalTime}</div>
              <div className="text-sm text-gray-500">thời gian</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 text-vsm-orange mx-auto mb-2" />
              <div className="text-2xl font-bold text-vsm-black">{userStats.averagePace}</div>
              <div className="text-sm text-gray-500">pace TB</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 text-vsm-orange mx-auto mb-2" />
              <div className="text-2xl font-bold text-vsm-black">{userStats.totalRuns}</div>
              <div className="text-sm text-gray-500">buổi chạy</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="w-6 h-6 text-vsm-orange mx-auto mb-2" />
              <div className="text-2xl font-bold text-vsm-black">{userStats.achievements}</div>
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

        {/* Main Content */}
        <Tabs defaultValue="runs" className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3">
            <TabsTrigger value="runs">Lịch sử chạy</TabsTrigger>
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
                  {recentRuns.map((run) => (
                    <div key={run.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-vsm-orange rounded-lg flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-vsm-black">{run.distance}</div>
                          <div className="text-sm text-gray-500">{run.route}</div>
                          <div className="text-xs text-gray-400">
                            {new Date(run.date).toLocaleDateString('vi-VN')}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold">{run.time}</div>
                        <div className="text-sm text-gray-500">{run.pace}</div>
                        <div className="text-xs text-gray-400">{run.calories} calo</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline" className="w-full md:w-auto">
                    Xem thêm
                  </Button>
                </div>
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
                    <div key={achievement.id} className={`p-4 rounded-lg border-2 ${
                      achievement.earned 
                        ? 'border-vsm-orange bg-vsm-orange/5' 
                        : 'border-gray-200 bg-gray-50 opacity-50'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div>
                          <h3 className="font-semibold text-vsm-black">{achievement.title}</h3>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                          {achievement.earned && achievement.date && (
                            <p className="text-xs text-vsm-orange mt-1">
                              Đạt được: {new Date(achievement.date).toLocaleDateString('vi-VN')}
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
                    <div key={group.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-vsm-orange to-vsm-orange-dark rounded-lg flex items-center justify-center text-2xl">
                          {group.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-vsm-black">{group.name}</div>
                          <div className="text-sm text-gray-500">
                            {group.members.toLocaleString()} thành viên
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Badge variant={group.role === "Admin" ? "default" : "secondary"}>
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
