import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Trophy, 
  Crown, 
  Medal, 
  Star, 
  Flag, 
  MapPin, 
  Clock, 
  Zap, 
  TrendingUp,
  Users,
  Target,
  Route,
  Calendar,
  ChevronRight,
  Play,
  Award,
  Timer,
  Mountain,
  Activity,
  Flame,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react";

interface Segment {
  id: string;
  name: string;
  description: string;
  distance: number;
  elevation: number;
  location: string;
  difficulty: "easy" | "medium" | "hard" | "extreme";
  category: "flat" | "hilly" | "sprint" | "endurance";
  attempts: number;
  personalBest?: {
    time: string;
    rank: number;
    date: string;
  };
  kom: {
    time: string;
    athlete: string;
    date: string;
  };
  qom: {
    time: string;
    athlete: string;
    date: string;
  };
  recentActivity: number;
}

interface LeaderboardEntry {
  rank: number;
  athlete: {
    id: string;
    name: string;
    avatar: string;
    university: string;
    isPremium: boolean;
  };
  time: string;
  pace: string;
  date: string;
  isPersonalRecord: boolean;
  change: "up" | "down" | "same" | "new";
}

export default function Segments() {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("popular");
  const { toast } = useToast();

  useEffect(() => {
    loadSegments();
  }, []);

  useEffect(() => {
    if (selectedSegment) {
      loadLeaderboard(selectedSegment.id);
    }
  }, [selectedSegment]);

  const loadSegments = () => {
    const mockSegments: Segment[] = [
      {
        id: "hoan-kiem-lake",
        name: "Hồ Gươm Full Circuit",
        description: "Vòng quanh Hồ Hoàn Kiếm - segment kinh điển của Hà Nội",
        distance: 1.8,
        elevation: 5,
        location: "Hà Nội, Việt Nam",
        difficulty: "easy",
        category: "flat",
        attempts: 15420,
        personalBest: {
          time: "06:45",
          rank: 127,
          date: "2024-12-10"
        },
        kom: {
          time: "05:23",
          athlete: "Duc Minh Tran",
          date: "2024-11-15"
        },
        qom: {
          time: "06:12",
          athlete: "Thu Ha Le",
          date: "2024-12-01"
        },
        recentActivity: 234
      },
      {
        id: "west-lake-half",
        name: "Tây Hồ Half Loop",
        description: "Nửa vòng Hồ Tây từ Tràng Tiền đến Xuân Diệu",
        distance: 4.2,
        elevation: 15,
        location: "Hà Nội, Việt Nam",
        difficulty: "medium",
        category: "endurance",
        attempts: 8930,
        personalBest: {
          time: "18:32",
          rank: 89,
          date: "2024-12-08"
        },
        kom: {
          time: "14:45",
          athlete: "Long Nguyen",
          date: "2024-11-28"
        },
        qom: {
          time: "16:23",
          athlete: "Minh Anh Vu",
          date: "2024-12-05"
        },
        recentActivity: 156
      },
      {
        id: "dong-da-hill-climb",
        name: "Đồng Đa Hill Climb",
        description: "Leo dốc thử thách từ phố Trần Quý Cáp lên Đồng Đa",
        distance: 0.8,
        elevation: 45,
        location: "Hà Nội, Việt Nam",
        difficulty: "hard",
        category: "hilly",
        attempts: 3420,
        kom: {
          time: "03:12",
          athlete: "Hoang Nam Vu",
          date: "2024-12-03"
        },
        qom: {
          time: "03:45",
          athlete: "Linh Chi Dao",
          date: "2024-11-20"
        },
        recentActivity: 67
      },
      {
        id: "bach-khoa-campus-sprint",
        name: "Bách Khoa Campus Sprint",
        description: "Sprint từ cổng chính đến thư viện Tạ Quang Bửu",
        distance: 0.4,
        elevation: 8,
        location: "Đại học Bách Khoa Hà Nội",
        difficulty: "medium",
        category: "sprint",
        attempts: 2890,
        personalBest: {
          time: "01:23",
          rank: 45,
          date: "2024-12-12"
        },
        kom: {
          time: "01:08",
          athlete: "Thành Long Nguyen",
          date: "2024-12-12"
        },
        qom: {
          time: "01:18",
          athlete: "Mai Linh Tran",
          date: "2024-12-11"
        },
        recentActivity: 89
      },
      {
        id: "long-bien-bridge",
        name: "Cầu Long Biên Challenge",
        description: "Thử thách qua cầu Long Biên lịch sử - gió mạnh và view tuyệt đẹp",
        distance: 2.4,
        elevation: 35,
        location: "Hà Nội, Việt Nam",
        difficulty: "extreme",
        category: "endurance",
        attempts: 1250,
        kom: {
          time: "08:45",
          athlete: "Duc Huy Le",
          date: "2024-12-06"
        },
        qom: {
          time: "09:32",
          athlete: "Thu Huong Ngo",
          date: "2024-12-08"
        },
        recentActivity: 23
      }
    ];

    setSegments(mockSegments);
    setSelectedSegment(mockSegments[0]); // Default to first segment
  };

  const loadLeaderboard = (segmentId: string) => {
    const mockLeaderboard: LeaderboardEntry[] = [
      {
        rank: 1,
        athlete: {
          id: "athlete_1",
          name: "Duc Minh Tran",
          avatar: "DM",
          university: "Đại học Thể thao Hà Nội",
          isPremium: true
        },
        time: "05:23",
        pace: "2:58",
        date: "2024-11-15",
        isPersonalRecord: true,
        change: "same"
      },
      {
        rank: 2,
        athlete: {
          id: "athlete_2",
          name: "Hoang Minh Le",
          avatar: "HM",
          university: "Đại học Bách Khoa Hà Nội",
          isPremium: false
        },
        time: "05:31",
        pace: "3:02",
        date: "2024-12-01",
        isPersonalRecord: false,
        change: "up"
      },
      {
        rank: 3,
        athlete: {
          id: "athlete_3",
          name: "Van Duc Pham",
          avatar: "VD",
          university: "Đại học Kinh tế Quốc dân",
          isPremium: true
        },
        time: "05:38",
        pace: "3:05",
        date: "2024-11-28",
        isPersonalRecord: true,
        change: "down"
      },
      {
        rank: 4,
        athlete: {
          id: "athlete_4",
          name: "Thu Ha Le",
          avatar: "TH",
          university: "Đại học Y Hà Nội",
          isPremium: false
        },
        time: "05:45",
        pace: "3:09",
        date: "2024-12-08",
        isPersonalRecord: false,
        change: "up"
      },
      {
        rank: 5,
        athlete: {
          id: "athlete_5",
          name: "Minh Quan Vu",
          avatar: "MQ",
          university: "Đại học Ngoại thương",
          isPremium: true
        },
        time: "05:52",
        pace: "3:12",
        date: "2024-12-10",
        isPersonalRecord: true,
        change: "new"
      }
    ];

    setLeaderboard(mockLeaderboard);
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: "bg-green-100 text-green-700",
      medium: "bg-yellow-100 text-yellow-700",
      hard: "bg-orange-100 text-orange-700",
      extreme: "bg-red-100 text-red-700"
    };
    return colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  const getDifficultyLabel = (difficulty: string) => {
    const labels = {
      easy: "Dễ",
      medium: "Trung bình",
      hard: "Khó",
      extreme: "Cực khó"
    };
    return labels[difficulty as keyof typeof labels] || difficulty;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "flat": return Route;
      case "hilly": return Mountain;
      case "sprint": return Zap;
      case "endurance": return Activity;
      default: return Target;
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      flat: "Phẳng",
      hilly: "Đồi núi",
      sprint: "Tốc độ",
      endurance: "Sức bền"
    };
    return labels[category as keyof typeof labels] || category;
  };

  const getChangeIcon = (change: string) => {
    switch (change) {
      case "up": return <ArrowUp className="w-4 h-4 text-green-600" />;
      case "down": return <ArrowDown className="w-4 h-4 text-red-600" />;
      case "new": return <Star className="w-4 h-4 text-yellow-600" />;
      default: return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const filterOptions = [
    { value: "all", label: "Tất cả" },
    { value: "flat", label: "Phẳng" },
    { value: "hilly", label: "Đồi núi" },
    { value: "sprint", label: "Tốc độ" },
    { value: "endurance", label: "Sức bền" }
  ];

  const filteredSegments = segments.filter(segment => 
    filter === "all" || segment.category === filter
  );

  const attemptSegment = (segmentId: string) => {
    toast({
      title: "Segment được đánh dấu! 🎯",
      description: "Segment sẽ được theo dõi trong buổi chạy tiếp theo của bạn"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-vsm-black flex items-center">
                <Flag className="w-8 h-8 mr-3 text-vsm-orange" />
                VSM Segments
              </h1>
              <p className="text-vsm-gray-medium">
                Thử thách bản thân với các segment nổi tiếng nhất Việt Nam
              </p>
            </div>
            
            <Button className="bg-vsm-orange hover:bg-vsm-orange-dark text-white">
              <Target className="w-5 h-5 mr-2" />
              Tạo segment mới
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3">
            <TabsTrigger value="popular">Phổ biến</TabsTrigger>
            <TabsTrigger value="personal">Cá nhân</TabsTrigger>
            <TabsTrigger value="nearby">Gần bạn</TabsTrigger>
          </TabsList>

          <TabsContent value="popular" className="space-y-6">
            {/* Filter */}
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={filter === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(option.value)}
                  className={filter === option.value ? "bg-vsm-orange hover:bg-vsm-orange-dark" : ""}
                >
                  {option.label}
                </Button>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Segments List */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {filteredSegments.map((segment) => {
                    const CategoryIcon = getCategoryIcon(segment.category);
                    return (
                      <Card 
                        key={segment.id} 
                        className={`cursor-pointer transition-all hover:shadow-lg ${
                          selectedSegment?.id === segment.id ? 'ring-2 ring-vsm-orange' : ''
                        }`}
                        onClick={() => setSelectedSegment(segment)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-xl font-bold text-vsm-black">{segment.name}</h3>
                                <Badge className={getDifficultyColor(segment.difficulty)}>
                                  {getDifficultyLabel(segment.difficulty)}
                                </Badge>
                                <Badge variant="outline" className="flex items-center space-x-1">
                                  <CategoryIcon className="w-3 h-3" />
                                  <span>{getCategoryLabel(segment.category)}</span>
                                </Badge>
                              </div>
                              
                              <p className="text-gray-600 mb-3">{segment.description}</p>
                              
                              <div className="flex items-center space-x-6 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <Route className="w-4 h-4 text-vsm-orange" />
                                  <span>{segment.distance} km</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Mountain className="w-4 h-4 text-vsm-orange" />
                                  <span>{segment.elevation}m</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-4 h-4 text-vsm-orange" />
                                  <span>{segment.location}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="w-4 h-4 text-vsm-orange" />
                                  <span>{segment.attempts.toLocaleString()} lượt thử</span>
                                </div>
                              </div>

                              {segment.personalBest && (
                                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="text-sm text-blue-600 font-medium">Kỷ lục cá nhân</div>
                                      <div className="text-lg font-bold text-blue-800">{segment.personalBest.time}</div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-sm text-blue-600">Hạng {segment.personalBest.rank}</div>
                                      <div className="text-xs text-gray-500">{segment.personalBest.date}</div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <Button 
                              onClick={(e) => {
                                e.stopPropagation();
                                attemptSegment(segment.id);
                              }}
                              className="bg-vsm-orange hover:bg-vsm-orange-dark text-white"
                            >
                              <Play className="w-4 h-4 mr-1" />
                              Thử ngay
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <Crown className="w-4 h-4 text-yellow-600" />
                                <span className="text-sm font-medium text-gray-700">KOM</span>
                              </div>
                              <div className="text-lg font-bold text-yellow-600">{segment.kom.time}</div>
                              <div className="text-xs text-gray-500">{segment.kom.athlete}</div>
                            </div>
                            
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <Crown className="w-4 h-4 text-pink-600" />
                                <span className="text-sm font-medium text-gray-700">QOM</span>
                              </div>
                              <div className="text-lg font-bold text-pink-600">{segment.qom.time}</div>
                              <div className="text-xs text-gray-500">{segment.qom.athlete}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Leaderboard */}
              <div>
                {selectedSegment && (
                  <Card className="sticky top-6">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Trophy className="w-5 h-5 mr-2 text-vsm-orange" />
                        Bảng xếp hạng
                      </CardTitle>
                      <p className="text-sm text-gray-600">{selectedSegment.name}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {leaderboard.map((entry) => (
                          <div 
                            key={entry.rank} 
                            className={`flex items-center space-x-3 p-3 rounded-lg ${
                              entry.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' : 'bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                entry.rank === 1 ? 'bg-yellow-500 text-white' :
                                entry.rank === 2 ? 'bg-gray-400 text-white' :
                                entry.rank === 3 ? 'bg-amber-600 text-white' :
                                'bg-gray-200 text-gray-700'
                              }`}>
                                {entry.rank}
                              </div>
                              {getChangeIcon(entry.change)}
                            </div>
                            
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs bg-vsm-orange text-white">
                                {entry.athlete.avatar}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-1">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {entry.athlete.name}
                                </p>
                                {entry.athlete.isPremium && (
                                  <Star className="w-3 h-3 text-yellow-500" />
                                )}
                                {entry.isPersonalRecord && (
                                  <Badge className="bg-green-100 text-green-700 text-xs">PR</Badge>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 truncate">{entry.athlete.university}</p>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-sm font-bold text-vsm-black">{entry.time}</div>
                              <div className="text-xs text-gray-500">{entry.pace}/km</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button className="w-full mt-4" variant="outline">
                        <ChevronRight className="w-4 h-4 mr-1" />
                        Xem toàn bộ
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardContent className="p-12 text-center">
                <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Chưa có segment cá nhân</h3>
                <p className="text-gray-500 mb-6">
                  Bắt đầu chạy để khám phá các segment và xây dựng kỷ lục cá nhân của bạn!
                </p>
                <Button className="bg-vsm-orange hover:bg-vsm-orange-dark text-white">
                  <Play className="w-4 h-4 mr-2" />
                  Bắt đầu chạy ngay
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nearby" className="space-y-6">
            <Card>
              <CardContent className="p-12 text-center">
                <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Đang tìm segment gần bạn</h3>
                <p className="text-gray-500 mb-6">
                  Cho phép truy cập vị trí để tìm các segment thú vị quanh khu vực của bạn
                </p>
                <Button className="bg-vsm-orange hover:bg-vsm-orange-dark text-white">
                  <Target className="w-4 h-4 mr-2" />
                  Cho phép truy cập vị trí
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
